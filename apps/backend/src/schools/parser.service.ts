import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';

const CITY_CONFIG: Record<
  string,
  { schools: string; kindergartens: string; domain: string }
> = {
  Львів: {
    domain: 'https://lv.isuo.org',
    schools: 'https://lv.isuo.org/authorities/schools-list/id/681',
    kindergartens: 'https://lv.isuo.org/koatuu/preschools-list/id/4610100000',
  },
  'Івано-Франківськ': {
    domain: 'https://if.isuo.org',
    schools: 'https://if.isuo.org/koatuu/schools-list/id/2610100000',
    kindergartens: 'https://if.isuo.org/koatuu/preschools-list/id/2610100000',
  },
  Чернівці: {
    domain: 'https://cv.isuo.org',
    schools: 'https://cv.isuo.org/koatuu/schools-list/id/7310100000',
    kindergartens: 'https://cv.isuo.org/koatuu/preschools-list/id/7310100000',
  },
  Тернопіль: {
    domain: 'https://te.isuo.org',
    schools: 'https://te.isuo.org/koatuu/schools-list/id/6110100000',
    kindergartens: 'https://te.isuo.org/koatuu/preschools-list/id/6110100000',
  },
  Ужгород: {
    domain: 'https://zk.isuo.org',
    schools: 'https://zk.isuo.org/koatuu/schools-list/id/2110100000',
    kindergartens: 'https://zk.isuo.org/koatuu/preschools-list/id/2110100000',
  },
  Київ: {
    domain: 'https://kyiv.isuo.org',
    schools: 'https://kyiv.isuo.org/koatuu/schools-list/id/8000000000',
    kindergartens: 'https://kyiv.isuo.org/koatuu/preschools-list/id/8000000000',
  },
  Харків: {
    domain: 'https://kh.isuo.org',
    schools: 'https://kh.isuo.org/koatuu/schools-list/id/6310100000',
    kindergartens: 'https://kh.isuo.org/koatuu/preschools-list/id/6310100000',
  },
  Одеса: {
    domain: 'https://od.isuo.org',
    schools: 'https://od.isuo.org/koatuu/schools-list/id/5110100000',
    kindergartens: 'https://od.isuo.org/koatuu/preschools-list/id/5110100000',
  },
  Дніпро: {
    domain: 'https://dp.isuo.org',
    schools: 'https://dp.isuo.org/koatuu/schools-list/id/1210100000',
    kindergartens: 'https://dp.isuo.org/koatuu/preschools-list/id/1210100000',
  },
  Запоріжжя: {
    domain: 'https://zp.isuo.org',
    schools: 'https://zp.isuo.org/koatuu/schools-list/id/2310100000',
    kindergartens: 'https://zp.isuo.org/koatuu/preschools-list/id/2310100000',
  },
  Миколаїв: {
    domain: 'https://mk.isuo.org',
    schools: 'https://mk.isuo.org/koatuu/schools-list/id/4810100000',
    kindergartens: 'https://mk.isuo.org/koatuu/preschools-list/id/4810100000',
  },
  Вінниця: {
    domain: 'https://vn.isuo.org',
    schools: 'https://vn.isuo.org/koatuu/schools-list/id/0510100000',
    kindergartens: 'https://vn.isuo.org/koatuu/preschools-list/id/0510100000',
  },
  Херсон: {
    domain: 'https://ks.isuo.org',
    schools: 'https://ks.isuo.org/koatuu/schools-list/id/6510100000',
    kindergartens: 'https://ks.isuo.org/koatuu/preschools-list/id/6510100000',
  },
  Полтава: {
    domain: 'https://pl.isuo.org',
    schools: 'https://pl.isuo.org/koatuu/schools-list/id/5310100000',
    kindergartens: 'https://pl.isuo.org/koatuu/preschools-list/id/5310100000',
  },
  Чернігів: {
    domain: 'https://cn.isuo.org',
    schools: 'https://cn.isuo.org/koatuu/schools-list/id/7410100000',
    kindergartens: 'https://cn.isuo.org/koatuu/preschools-list/id/7410100000',
  },
  Черкаси: {
    domain: 'https://ck.isuo.org',
    schools: 'https://ck.isuo.org/koatuu/schools-list/id/7110100000',
    kindergartens: 'https://ck.isuo.org/koatuu/preschools-list/id/7110100000',
  },
  Суми: {
    domain: 'https://su.isuo.org',
    schools: 'https://su.isuo.org/koatuu/schools-list/id/5910100000',
    kindergartens: 'https://su.isuo.org/koatuu/preschools-list/id/5910100000',
  },
  Житомир: {
    domain: 'https://zt.isuo.org',
    schools: 'https://zt.isuo.org/koatuu/schools-list/id/1810100000',
    kindergartens: 'https://zt.isuo.org/koatuu/preschools-list/id/1810100000',
  },
  Хмельницький: {
    domain: 'https://km.isuo.org',
    schools: 'https://km.isuo.org/koatuu/schools-list/id/6810100000',
    kindergartens: 'https://km.isuo.org/koatuu/preschools-list/id/6810100000',
  },
  Рівне: {
    domain: 'https://rv.isuo.org',
    schools: 'https://rv.isuo.org/koatuu/schools-list/id/5610100000',
    kindergartens: 'https://rv.isuo.org/koatuu/preschools-list/id/5610100000',
  },
  Кропивницький: {
    domain: 'https://kr.isuo.org',
    schools: 'https://kr.isuo.org/koatuu/schools-list/id/3510100000',
    kindergartens: 'https://kr.isuo.org/koatuu/preschools-list/id/3510100000',
  },
  Луцьк: {
    domain: 'https://vl.isuo.org',
    schools: 'https://vl.isuo.org/koatuu/schools-list/id/0710100000',
    kindergartens: 'https://vl.isuo.org/koatuu/preschools-list/id/0710100000',
  },
};

@Injectable()
export class ParserService {
  async parseSchoolData(schoolName: string, schoolUrl?: string, type?: string) {
    try {
      let url = schoolUrl;
      if (!url) {
        const urls =
          type === 'Садочок'
            ? [
                'https://lv.isuo.org/koatuu/preschools-list/id/4610100000',
                'https://lv.isuo.org/koatuu/preschools-list/id/4610100000/page/2',
              ]
            : [
                'https://lv.isuo.org/authorities/schools-list/id/681',
                'https://lv.isuo.org/authorities/schools-list/id/681/page/2',
              ];
        const normalizedSearch = schoolName
          .toLowerCase()
          .replace(/\s+/g, ' ')
          .trim();
        for (const searchUrl of urls) {
          const listResponse = await axios.get(searchUrl);
          const $list = cheerio.load(listResponse.data);
          $list('table.zebra-stripe.list tr').each((_, row) => {
            const name = $list(row)
              .find('td:nth-child(2) a')
              .text()
              .replace(/\s+/g, ' ')
              .trim()
              .toLowerCase();
            if (name.includes(normalizedSearch)) {
              const href = $list(row).find('td:nth-child(2) a').attr('href');
              if (href) {
                url = `https://lv.isuo.org${href}`;
                return false;
              }
            }
          });
          if (url) break;
        }
      }
      if (!url) {
        console.log(`Заклад не знайдено: ${schoolName}`);
        return null;
      }
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);
      const getField = (labels: string[]): string => {
        let result = '';
        for (const label of labels) {
          const th = $('th')
            .filter((_, el) => $(el).text().trim().includes(label))
            .first();
          if (th.length) {
            result = th.next('td').text().trim();
            break;
          }
        }
        return result;
      };
      const address = getField(['Поштова адреса', 'Адреса']);
      const director = getField(['Директор', 'Завідувач', 'Керівник']);
      const studentsRaw = getField([
        'Кількість учнів',
        'Кількість дітей',
        'Кількість вихованців',
      ]);
      const childrenCount =
        parseInt(studentsRaw.replace(/[^\d]/g, ''), 10) || 0;
      return { address, director, childrenCount };
    } catch (error) {
      console.error('Помилка парсингу закладу:', error);
      return null;
    }
  }

  async searchSchools(
    query: string,
    type?: string,
  ): Promise<{ name: string; url: string }[]> {
    try {
      const urls =
        type === 'Садочок'
          ? [
              'https://lv.isuo.org/koatuu/preschools-list/id/4610100000',
              'https://lv.isuo.org/koatuu/preschools-list/id/4610100000/page/2',
            ]
          : [
              'https://lv.isuo.org/authorities/schools-list/id/681',
              'https://lv.isuo.org/authorities/schools-list/id/681/page/2',
            ];
      const results: { name: string; url: string }[] = [];
      const normalizedQuery = query.toLowerCase().replace(/\s+/g, ' ').trim();
      const isNumericQuery = /^\d+$/.test(normalizedQuery);
      const numericRegex = isNumericQuery
        ? new RegExp(`(?<!\d)${normalizedQuery}(?!\d)`)
        : null;
      for (const url of urls) {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        $('table.zebra-stripe.list tr').each((_, row) => {
          const rawName = $(row).find('td:nth-child(2) a').text();
          const name = rawName.replace(/\s+/g, ' ').trim();
          const href = $(row).find('td:nth-child(2) a').attr('href');
          if (name && href) {
            const lowerName = name.toLowerCase();
            let matches = false;
            if (isNumericQuery && numericRegex) {
              matches = numericRegex.test(lowerName);
            } else {
              matches = lowerName.includes(normalizedQuery);
            }
            if (matches)
              results.push({ name, url: `https://lv.isuo.org${href}` });
          }
        });
      }
      return results.slice(0, 10);
    } catch (error) {
      console.error('Помилка пошуку закладів:', error);
      return [];
    }
  }

  async getAllSchoolsForCity(
    cityName: string,
    type: 'Школа' | 'Садочок' = 'Школа',
  ): Promise<{ name: string; url: string }[]> {
    const config = CITY_CONFIG[cityName];
    if (!config) {
      console.log(`Місто "${cityName}" не підтримується для імпорту`);
      return [];
    }

    const baseUrl = type === 'Садочок' ? config.kindergartens : config.schools;
    const domain = config.domain;

    const resultsMap = new Map<string, { name: string; url: string }>();

    for (let page = 1; page <= 20; page++) {
      const url = page === 1 ? baseUrl : `${baseUrl}/page/${page}`;
      try {
        const response = await axios.get(url, { timeout: 15000 });
        const $ = cheerio.load(response.data);
        let foundOnPage = 0;

        $('table.zebra-stripe.list tr').each((_, row) => {
          const name = $(row)
            .find('td:nth-child(2) a')
            .text()
            .replace(/\s+/g, ' ')
            .trim();
          const href = $(row).find('td:nth-child(2) a').attr('href');

          if (name && href && name !== 'Fullname') {
            const normalizedKey = name.toLowerCase().replace(/\s+/g, '');

            if (!resultsMap.has(normalizedKey)) {
              resultsMap.set(normalizedKey, { name, url: `${domain}${href}` });
              foundOnPage++;
            }
          }
        });

        if (foundOnPage === 0) break;
      } catch {
        break;
      }
    }

    return Array.from(resultsMap.values());
  }
  getSupportedCities(): string[] {
    return Object.keys(CITY_CONFIG);
  }
}
