import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';

const CITY_CONFIG: Record<string, { schools: string; kindergartens: string; domain: string }> = {
  'Львів':             { domain: 'https://lv.isuo.org', schools: 'https://lv.isuo.org/authorities/schools-list/id/681',          kindergartens: 'https://lv.isuo.org/koatuu/preschools-list/id/4610100000' },
  'Івано-Франківськ': { domain: 'https://if.isuo.org', schools: 'https://if.isuo.org/koatuu/schools-list/id/2610100000',         kindergartens: 'https://if.isuo.org/koatuu/preschools-list/id/2610100000' },
  'Чернівці':         { domain: 'https://cv.isuo.org', schools: 'https://cv.isuo.org/koatuu/schools-list/id/7310100000',         kindergartens: 'https://cv.isuo.org/koatuu/preschools-list/id/7310100000' },
  'Тернопіль':        { domain: 'https://te.isuo.org', schools: 'https://te.isuo.org/koatuu/schools-list/id/6110100000',         kindergartens: 'https://te.isuo.org/koatuu/preschools-list/id/6110100000' },
  'Ужгород':          { domain: 'https://zk.isuo.org', schools: 'https://zk.isuo.org/koatuu/schools-list/id/2110100000',        kindergartens: 'https://zk.isuo.org/koatuu/preschools-list/id/2110100000' },
};

@Injectable()
export class ParserService {
  async parseSchoolData(schoolName: string, schoolUrl?: string, type?: string) {
    try {
      let url = schoolUrl;
      if (!url) {
        const urls = type === 'Садочок'
          ? ['https://lv.isuo.org/koatuu/preschools-list/id/4610100000', 'https://lv.isuo.org/koatuu/preschools-list/id/4610100000/page/2']
          : ['https://lv.isuo.org/authorities/schools-list/id/681', 'https://lv.isuo.org/authorities/schools-list/id/681/page/2'];
        const normalizedSearch = schoolName.toLowerCase().replace(/\s+/g, ' ').trim();
        for (const searchUrl of urls) {
          const listResponse = await axios.get(searchUrl);
          const $list = cheerio.load(listResponse.data);
          $list('table.zebra-stripe.list tr').each((_, row) => {
            const name = $list(row).find('td:nth-child(2) a').text().replace(/\s+/g, ' ').trim().toLowerCase();
            if (name.includes(normalizedSearch)) {
              const href = $list(row).find('td:nth-child(2) a').attr('href');
              if (href) { url = `https://lv.isuo.org${href}`; return false; }
            }
          });
          if (url) break;
        }
      }
      if (!url) { console.log(`Заклад не знайдено: ${schoolName}`); return null; }
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);
      const getField = (labels: string[]): string => {
        let result = '';
        for (const label of labels) {
          const th = $('th').filter((_, el) => $(el).text().trim().includes(label)).first();
          if (th.length) { result = th.next('td').text().trim(); break; }
        }
        return result;
      };
      const address = getField(['Поштова адреса', 'Адреса']);
      const director = getField(['Директор', 'Завідувач', 'Керівник']);
      const studentsRaw = getField(['Кількість учнів', 'Кількість дітей', 'Кількість вихованців']);
      const childrenCount = parseInt(studentsRaw.replace(/[^\d]/g, ''), 10) || 0;
      return { address, director, childrenCount };
    } catch (error) {
      console.error('Помилка парсингу закладу:', error);
      return null;
    }
  }

  async searchSchools(query: string, type?: string): Promise<{ name: string; url: string }[]> {
    try {
      const urls = type === 'Садочок'
        ? ['https://lv.isuo.org/koatuu/preschools-list/id/4610100000', 'https://lv.isuo.org/koatuu/preschools-list/id/4610100000/page/2']
        : ['https://lv.isuo.org/authorities/schools-list/id/681', 'https://lv.isuo.org/authorities/schools-list/id/681/page/2'];
      const results: { name: string; url: string }[] = [];
      const normalizedQuery = query.toLowerCase().replace(/\s+/g, ' ').trim();
      const isNumericQuery = /^\d+$/.test(normalizedQuery);
      const numericRegex = isNumericQuery ? new RegExp(`(?<!\d)${normalizedQuery}(?!\d)`) : null;
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
            if (isNumericQuery && numericRegex) { matches = numericRegex.test(lowerName); }
            else { matches = lowerName.includes(normalizedQuery); }
            if (matches) results.push({ name, url: `https://lv.isuo.org${href}` });
          }
        });
      }
      return results.slice(0, 10);
    } catch (error) {
      console.error('Помилка пошуку закладів:', error);
      return [];
    }
  }

  // Отримати всі школи/садочки конкретного міста з isuo.org
  async getAllSchoolsForCity(cityName: string, type: 'Школа' | 'Садочок' = 'Школа'): Promise<{ name: string; url: string }[]> {
    const config = CITY_CONFIG[cityName];
    if (!config) {
      console.log(`Місто "${cityName}" не підтримується для імпорту`);
      return [];
    }

    const baseUrl = type === 'Садочок' ? config.kindergartens : config.schools;
    const domain = config.domain;
    const results: { name: string; url: string }[] = [];

    for (let page = 1; page <= 20; page++) {
      const url = page === 1 ? baseUrl : `${baseUrl}/page/${page}`;
      try {
        const response = await axios.get(url, { timeout: 15000 });
        const $ = cheerio.load(response.data);
        let found = 0;
        $('table.zebra-stripe.list tr').each((_, row) => {
          const name = $(row).find('td:nth-child(2) a').text().replace(/\s+/g, ' ').trim();
          const href = $(row).find('td:nth-child(2) a').attr('href');
          // Пропускаємо записи "Fullname" — це тестові дані isuo
          if (name && href && name !== 'Fullname') {
            results.push({ name, url: `${domain}${href}` });
            found++;
          }
        });
        if (found === 0) break;
      } catch {
        break;
      }
    }

    return results;
  }

  getSupportedCities(): string[] {
    return Object.keys(CITY_CONFIG);
  }
}
