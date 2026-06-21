import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';

@Injectable()
export class ParserService {
  async parseSchoolData(schoolName: string, schoolUrl?: string, type?: string) {
    try {
      let url = schoolUrl;

      // Якщо URL немає, шукаємо заклад вручну
      if (!url) {
        const urls = type === 'Садочок'
          ? [
              'https://lv.isuo.org/koatuu/preschools-list/id/4610100000',
              'https://lv.isuo.org/koatuu/preschools-list/id/4610100000/page/2'
            ]
          : [
              'https://lv.isuo.org/authorities/schools-list/id/681',
              'https://lv.isuo.org/authorities/schools-list/id/681/page/2'
            ];

        const normalizedSearch = schoolName.toLowerCase().replace(/\s+/g, ' ').trim();

        for (const searchUrl of urls) {
          const listResponse = await axios.get(searchUrl);
          const $list = cheerio.load(listResponse.data);

          $list('table.zebra-stripe.list tr').each((_, row) => {
            const name = $list(row).find('td:nth-child(2) a').text().replace(/\s+/g, ' ').trim().toLowerCase();
            if (name.includes(normalizedSearch)) {
              const href = $list(row).find('td:nth-child(2) a').attr('href');
              if (href) {
                url = `https://lv.isuo.org${href}`;
                return false; // зупиняємо each
              }
            }
          });
          if (url) break; // якщо знайшли, зупиняємо цикл сторінок
        }
      }

      if (!url) {
        console.log(`Заклад не знайдено: ${schoolName}`);
        return null;
      }

      const response = await axios.get(url);
      const $ = cheerio.load(response.data);

      // Універсальна функція для пошуку полів за кількома варіантами назви
      const getField = (labels: string[]): string => {
        let result = '';
        for (const label of labels) {
          const th = $('th').filter((_, el) => $(el).text().trim().includes(label)).first();
          if (th.length) {
            result = th.next('td').text().trim();
            break;
          }
        }
        return result;
      };

      const address = getField(['Поштова адреса', 'Адреса']);
      const director = getField(['Директор', 'Завідувач', 'Керівник']);
      const studentsRaw = getField(['Кількість учнів', 'Кількість дітей', 'Кількість вихованців']);

      const childrenCount = parseInt(studentsRaw.replace(/[^\d]/g, ''), 10) || 0;

      return {
        address,
        director,
        childrenCount,
      };
    } catch (error) {
      console.error('Помилка парсингу закладу:', error);
      return null;
    }
  }

  async searchSchools(query: string, type?: string): Promise<{ name: string; url: string }[]> {
    try {
      const urls = type === 'Садочок'
        ? [
            'https://lv.isuo.org/koatuu/preschools-list/id/4610100000',
            'https://lv.isuo.org/koatuu/preschools-list/id/4610100000/page/2'
          ]
        : [
            'https://lv.isuo.org/authorities/schools-list/id/681',
            'https://lv.isuo.org/authorities/schools-list/id/681/page/2'
          ];

      const results: { name: string; url: string }[] = [];
      const normalizedQuery = query.toLowerCase().replace(/\s+/g, ' ').trim();
      
      for (const url of urls) {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        $('table.zebra-stripe.list tr').each((_, row) => {
          const rawName = $(row).find('td:nth-child(2) a').text();
          const name = rawName.replace(/\s+/g, ' ').trim();
          const href = $(row).find('td:nth-child(2) a').attr('href');

          if (name && href && name.toLowerCase().includes(normalizedQuery)) {
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
}
