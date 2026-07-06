import { ParserService } from './parser.service';
import axios from 'axios';
import * as cheerio from 'cheerio';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Хелпер: генерує HTML-таблицю зі списком шкіл
const buildTableHtml = (rows: { name: string; href: string }[]): string => {
  const trs = rows
    .map((r) => `<tr><td>1</td><td><a href="${r.href}">${r.name}</a></td></tr>`)
    .join('');
  return `<table class="zebra-stripe list">${trs}</table>`;
};

// Хелпер: генерує HTML-профіль школи
const buildProfileHtml = (fields: Record<string, string>): string => {
  const rows = Object.entries(fields)
    .map(([label, value]) => `<tr><th>${label}</th><td>${value}</td></tr>`)
    .join('');
  return `<table>${rows}</table>`;
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('ParserService — parseSchoolData', () => {
  it('повертає address, director, childrenCount за прямим URL', async () => {
    const profileHtml = buildProfileHtml({
      'Поштова адреса': 'вул. Шевченка 1',
      Директор: 'Іваненко Іван',
      'Кількість учнів': '1023',
    });
    mockedAxios.get.mockResolvedValueOnce({ data: profileHtml });

    const service = new ParserService();
    const result = await service.parseSchoolData(
      'Школа №1',
      'https://lv.isuo.org/schools/123',
    );

    expect(result).toEqual({
      address: 'вул. Шевченка 1',
      director: 'Іваненко Іван',
      childrenCount: 1023,
    });
  });

  it('розпізнає альтернативні лейбли (Завідувач, Кількість дітей)', async () => {
    const profileHtml = buildProfileHtml({
      Адреса: 'вул. Лесі 10',
      Завідувач: 'Петренко Оксана',
      'Кількість дітей': '456 дітей',
    });
    mockedAxios.get.mockResolvedValueOnce({ data: profileHtml });

    const service = new ParserService();
    const result = await service.parseSchoolData(
      'Садочок №2',
      'https://lv.isuo.org/k/1',
    );

    expect(result?.director).toBe('Петренко Оксана');
    expect(result?.childrenCount).toBe(456);
  });

  it('повертає 0 для childrenCount якщо число не розпізнано', async () => {
    const profileHtml = buildProfileHtml({
      Директор: 'Без дітей',
    });
    mockedAxios.get.mockResolvedValueOnce({ data: profileHtml });

    const service = new ParserService();
    const result = await service.parseSchoolData(
      'Тест',
      'https://lv.isuo.org/x/1',
    );

    expect(result?.childrenCount).toBe(0);
  });

  it('повертає null при мережевій помилці', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Network Error'));

    const service = new ParserService();
    const result = await service.parseSchoolData(
      'Школа',
      'https://lv.isuo.org/x/1',
    );

    expect(result).toBeNull();
  });

  it('шукає школу у списку якщо URL не вказано', async () => {
    const listHtml = buildTableHtml([
      { name: 'Загальноосвітня школа №42', href: '/schools/42' },
    ]);
    const profileHtml = buildProfileHtml({ Директор: 'Тест' });

    mockedAxios.get
      .mockResolvedValueOnce({ data: listHtml }) // список
      .mockResolvedValueOnce({ data: profileHtml }); // профіль

    const service = new ParserService();
    const result = await service.parseSchoolData('школа №42');

    expect(mockedAxios.get).toHaveBeenCalledTimes(2);
    expect(result?.director).toBe('Тест');
  });

  it('повертає null якщо школу не знайдено у списку', async () => {
    const listHtml = buildTableHtml([
      { name: 'Інша школа', href: '/schools/99' },
    ]);
    mockedAxios.get
      .mockResolvedValueOnce({ data: listHtml })
      .mockResolvedValueOnce({ data: listHtml }); // page 2

    const service = new ParserService();
    const result = await service.parseSchoolData('Неіснуюча школа');

    expect(result).toBeNull();
  });
});

describe('ParserService — searchSchools', () => {
  it('повертає список шкіл що відповідають запиту', async () => {
    const html = buildTableHtml([
      { name: 'Гімназія №3', href: '/schools/3' },
      { name: 'Ліцей №10', href: '/schools/10' },
    ]);
    mockedAxios.get
      .mockResolvedValueOnce({ data: html })
      .mockResolvedValueOnce({ data: html }); // page 2

    const service = new ParserService();
    const results = await service.searchSchools('гімназія');

    expect(results).toHaveLength(2); // до 10, cheerio знаходить обидва по "гімназія"
  });

  it('числовий запит — шукає за номером школи точно (regex з word boundary)', async () => {
    const html = buildTableHtml([
      { name: 'Школа №5', href: '/schools/5' },
      { name: 'Школа №15', href: '/schools/15' },
      { name: 'Школа №50', href: '/schools/50' },
    ]);
    mockedAxios.get
      .mockResolvedValueOnce({ data: html })
      .mockResolvedValueOnce({ data: '<table></table>' });

    const service = new ParserService();
    const results = await service.searchSchools('5');

    // Має знайти тільки "Школа №5", не "15" чи "50"
    const names = results.map((r) => r.name);
    expect(names).toContain('Школа №5');
    expect(names).not.toContain('Школа №15');
    expect(names).not.toContain('Школа №50');
  });

  it('повертає не більше 10 результатів', async () => {
    const manyRows = Array.from({ length: 20 }, (_, i) => ({
      name: `Тестова школа №${i + 1}`,
      href: `/schools/${i + 1}`,
    }));
    const html = buildTableHtml(manyRows);
    mockedAxios.get
      .mockResolvedValueOnce({ data: html })
      .mockResolvedValueOnce({ data: '<table></table>' });

    const service = new ParserService();
    const results = await service.searchSchools('тестова');

    expect(results.length).toBeLessThanOrEqual(10);
  });

  it('повертає порожній масив при мережевій помилці', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Network Error'));

    const service = new ParserService();
    const results = await service.searchSchools('щось');

    expect(results).toEqual([]);
  });

  it('для type="Садочок" — використовує URL дошкільних закладів', async () => {
    mockedAxios.get.mockResolvedValue({ data: '<table></table>' });

    const service = new ParserService();
    await service.searchSchools('садок', 'Садочок');

    const url = mockedAxios.get.mock.calls[0][0];
    expect(url).toContain('preschools');
  });
});

describe('ParserService — getAllSchoolsForCity', () => {
  it('повертає заклади для підтримуваного міста', async () => {
    const page1 = buildTableHtml([
      { name: 'Школа №1', href: '/schools/1' },
      { name: 'Школа №2', href: '/schools/2' },
    ]);
    const emptyPage = '<table class="zebra-stripe list"></table>';

    mockedAxios.get
      .mockResolvedValueOnce({ data: page1 })
      .mockResolvedValueOnce({ data: emptyPage });

    const service = new ParserService();
    const results = await service.getAllSchoolsForCity('Львів', 'Школа');

    expect(results).toHaveLength(2);
    expect(results[0].name).toBe('Школа №1');
    expect(results[0].url).toContain('lv.isuo.org');
  });

  it('повертає порожній масив для непідтримуваного міста', async () => {
    const service = new ParserService();
    const results = await service.getAllSchoolsForCity('Атлантида');

    expect(results).toEqual([]);
    expect(mockedAxios.get).not.toHaveBeenCalled();
  });

  it('зупиняється якщо сторінка не містить результатів', async () => {
    const page1 = buildTableHtml([{ name: 'Школа №1', href: '/schools/1' }]);
    const emptyPage = '<table class="zebra-stripe list"></table>';

    mockedAxios.get
      .mockResolvedValueOnce({ data: page1 })
      .mockResolvedValueOnce({ data: emptyPage });

    const service = new ParserService();
    const results = await service.getAllSchoolsForCity('Київ');

    expect(results).toHaveLength(1);
    expect(mockedAxios.get).toHaveBeenCalledTimes(2);
  });

  it('дедуплікує однакові заклади (за нормалізованою назвою)', async () => {
    const html = buildTableHtml([
      { name: 'Школа  №1', href: '/schools/1' },
      { name: 'Школа №1', href: '/schools/1b' },
    ]);
    const emptyPage = '<table class="zebra-stripe list"></table>';

    mockedAxios.get
      .mockResolvedValueOnce({ data: html })
      .mockResolvedValueOnce({ data: emptyPage });

    const service = new ParserService();
    const results = await service.getAllSchoolsForCity('Харків');

    expect(results).toHaveLength(1);
  });

  it('зупиняється при мережевій помилці на конкретній сторінці', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('timeout'));

    const service = new ParserService();
    const results = await service.getAllSchoolsForCity('Одеса');

    expect(results).toEqual([]);
  });

  it('для type="Садочок" — використовує URL kindergartens', async () => {
    mockedAxios.get.mockResolvedValue({
      data: '<table class="zebra-stripe list"></table>',
    });

    const service = new ParserService();
    await service.getAllSchoolsForCity('Тернопіль', 'Садочок');

    const url = mockedAxios.get.mock.calls[0][0];
    expect(url).toContain('preschools');
  });
});

describe('ParserService — getSupportedCities', () => {
  it('повертає масив підтримуваних міст', () => {
    const service = new ParserService();
    const cities = service.getSupportedCities();

    expect(cities).toBeInstanceOf(Array);
    expect(cities.length).toBeGreaterThan(0);
    expect(cities).toContain('Львів');
    expect(cities).toContain('Київ');
  });
});
