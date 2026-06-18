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
}