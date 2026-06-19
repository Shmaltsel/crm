import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';

@Injectable()
export class ParserService {
  async parseSchoolData(schoolName: string) {
    try {
      const listUrl =
        'https://lv.isuo.org/authorities/schools-list/id/681';

      const listResponse = await axios.get(listUrl);

      const $list = cheerio.load(listResponse.data);

      let schoolUrl = '';

      const normalizedSearch = schoolName
        .toLowerCase()
        .replace(/\s+/g, ' ')
        .trim();

      $list('table.zebra-stripe.list tr').each((_, row) => {
        const name = $list(row)
          .find('td:nth-child(2) a')
          .text()
          .replace(/\s+/g, ' ')
          .trim()
          .toLowerCase();

        if (name.includes(normalizedSearch)) {
          const href = $list(row)
            .find('td:nth-child(2) a')
            .attr('href');

          if (href) {
            schoolUrl = `https://lv.isuo.org${href}`;
            return false;
          }
        }
      });

      if (!schoolUrl) {
        console.log(`Школу не знайдено: ${schoolName}`);
        return null;
      }

      const schoolResponse = await axios.get(schoolUrl);

      const $school = cheerio.load(schoolResponse.data);

      const getField = (label: string): string => {
        const th = $school('th')
          .filter((_, el) =>
            $school(el).text().trim().includes(label),
          )
          .first();

        if (!th.length) {
          return '';
        }

        return th.next('td').text().trim();
      };

      const address =
        getField('Поштова адреса') ||
        getField('Адреса');

      const director =
        getField('Директор');

      const studentsRaw =
        getField('Кількість учнів');

      const childrenCount =
        parseInt(
          studentsRaw.replace(/[^\d]/g, ''),
          10,
        ) || 0;

      return {
        address,
        director,
        childrenCount,
      };
    } catch (error) {
      console.error(
        'Помилка парсингу школи:',
        error,
      );

      return null;
    }
  }
  async searchSchools(query: string): Promise<{ name: string; url: string }[]> {
    try {
      const urls = [
        'https://lv.isuo.org/authorities/schools-list/id/681',
        'https://lv.isuo.org/authorities/schools-list/id/681/page/2',
      ];

      const results: { name: string; url: string }[] = [];
      const normalizedQuery = query.toLowerCase().replace(/\s+/g, ' ').trim();
      console.log("шукаю")
      for (const url of urls) {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        $('table.zebra-stripe.list tr').each((_, row) => {
          const rawName = $(row).find('td:nth-child(2) a').text();
          console.log('RAW NAME:', JSON.stringify(rawName));
          const name = rawName.replace(/\s+/g, ' ').trim(); // нормалізуємо всі пробіли
          const href = $(row).find('td:nth-child(2) a').attr('href');

          if (name && href && name.toLowerCase().includes(normalizedQuery)) {
            results.push({ name, url: `https://lv.isuo.org${href}` });
          }
        });
      }

      return results.slice(0, 10);
    } catch (error) {
      console.error('Помилка пошуку шкіл:', error);
      return [];
    }
  }
}