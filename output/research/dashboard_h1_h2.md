## Section: Navigation

Explanation of this section and its purpose.



| Element | Type | ARIA | CSS | XPath | Coordinates |
|------|------|------|------|------|------|
| 'Дашборд' | tab | - | 'a[aria-label="Дашборд"]' | '//*[self::button and @role="tab" and contains(@class,"relative") and contains(@class,"flex") and contains(@class,"items-center") and contains(.,"Огляд")]' | (331, 20) |
| 'Міста' | tab | - | 'a[aria-label="Міста"]' | - | - |
| 'Школи' | tab | - | 'a[aria-label="Школи"]' | - | - |
| 'Садочки' | tab | - | 'a[aria-label="Садчки"]' | - | - |
| 'Фінанси' | tab | - | 'a[aria-label="Фінанси"]' | - | - |
| 'Календар' | tab | - | 'a[aria-label="Календар"]' | - | - |
| 'Працівники' | tab | - | 'a[aria-label="Працівники"]' | - | - |
| 'Більше розділів' | tab | - | 'button[aria-label="Більше розділів"]' | - | - |
## Section: Menu

Explanation of this section and its purpose.

> Container: `.no-scrollbar`

| Element | Type | ARIA | CSS | XPath | Coordinates |
|------|------|------|------|------|------|
| 'Огляд' | tab | - | 'button[aria-label="Огляд"]' | '//*[self::button and @role="tab" and contains(@class,"relative") and contains(@class,"flex") and contains(@class,"items-center") and contains(.,"Звіти")]' | (415, 20) |
| 'Звіти' | tab | - | 'button[aria-label="Звіти"]' | '//*[self::button and @role="tab" and contains(@class,"relative") and contains(@class,"flex") and contains(@class,"items-center") and contains(.,"Рейтинг")]' | (506, 20) |
| 'Рейтинг' | tab | - | 'button[aria-label="Рейтинг"]' | '//*[self::button and @role="tab" and contains(@class,"relative") and contains(@class,"flex") and contains(@class,"items-center") and contains(.,"Аналітика")]' | (612, 20) |
| 'Аналітика' | tab | - | 'button[aria-label="Аналітика"]' | - | - |
## Section: Content

Explanation of this section and its purpose.

> Container: `.swiper-initialized.swiper-horizontal.dashboard-swiper`

| Element | Type | ARIA | CSS | XPath | Coordinates |
|------|------|------|------|------|------|
| 'Доброго вечора, Адміністратор' | - | - | 'h1' | - | - |
| 'п’ятниця, 10 липня' | - | - | 'p' | - | - |
| 'Вибір міста' | combobox | - | 'select[aria-label="Вибір міста"]' | - | (1156, 105) |
| 'Виручка' | - | - | 'span:has-text("Виручка")' | - | - |
| '45 333 грн' | - | - | 'p' | - | - |
| 'Прибуток' | - | - | 'span:has-text("Прибуток")' | - | - |
| '30 166 грн' | - | - | 'p' | - | - |
| 'Активних шкіл' | - | - | 'span:has-text("Активних шкіл")' | - | - |
| '1 853' | - | - | 'p' | - | - |
| 'за 4 подіями' | - | - | 'p' | - | - |
| 'Календар' | link | - | 'button[text="Календар"]' | '//*[self::button and contains(@class,"text-2xs") and contains(@class,"text-brand") and contains(@class,"hover:underline") and contains(.,"Календар")]' | (714, 297) |
| 'Сьогоднішні події' | - | - | 'p:has-text("Сьогоднішні події")' | - | - |
| 'п’ятниця, 10 липня' | - | - | 'p' | - | - |
| 'Сьогодні подій немає' | - | - | 'div:has-text("Сьогодні подій немає")' | - | - |
| 'Усього на сьогодні: 0 подій' | - | - | 'p' | - | - |
| 'Активність команди' | - | - | 'p:has-text("Активність команди")' | - | - |
| 'сьогодні Сьогодні активності ще немає' | - | - | 'p' | - | - |
## Data: Ratings Data

> Container: `.swiper-slide.active`

Suite data, 6 items. List of rating sections for different cities.
## Data: Analytics Data

> Container: `.swiper-slide.active`

Analytics data, 6 items. List of analytics sub-sections.

## Data: Response Cards

> Container: `.mobile-kpi-card`

Response cards, 4 items. Set of KPI cards with data.
## Data: Calendar Summary

> Container: `.mobile-card`

Calendar summary, 2 items. Summary of calendar days and events for today.

---

### Summary of Primary User Actions

1. **Navigating Sections:**
   - User can use the main navigation to switch between dashboard sections such as 'Огляд', 'Звіти', 'Рейтинг', and 'Аналітика'.
   - Within 'Огляд', the user can switch to other views like 'Перевірка звітів' and 'Рейтинг міст'.

2. **Selecting Options:**
   - User can select the 'Вибір міста' dropdown to change the current city.
   - Similar dropdowns allow selecting years ('2022', '2023', etc.) and local filters in different sections.

3. **Viewing Details:**
   - User sees details such as earnings ('45 333 грн') and profits ('30 166 грн') on today’s dashboard page.
   - Scores and rankings of different metrics are displayed in the 'Рейтинг міст' section.

4. **Interacting with Cards:**
   - User can click through cards to view specific details like team activity or events for today.

5. **Running Analyses:**
   - User can see detailed analytics like revenue distributions over time and specific project revenue breakdowns.

6. **Real-Time Notifications:**
   - User can manage notifications by clicking on the 'Сповіщення' button.

This web page focuses on providing an overview of business operations with detailed analytics and real-time notifications, allowing users to navigate, select, and interact with specific data points relevant to their roles within the organization.

# Expandables

| Element | Action |
|---------|--------|
| Дашборд | `I.click('a[aria-label="Дашборд"]')` |
| Огляд | `I.click('button[aria-label="Огляд"]', '.no-scrollbar')` |
| Звіти | `I.click('button[aria-label="Звіти"]', '.no-scrollbar')` |
| Рейтинг | `I.click('button[aria-label="Рейтинг"]', '.no-scrollbar')` |

## Navigation Links

- `I.clickXY(331, 20)` opens /dashboard?tab=overview
- `I.clickXY(415, 20)` opens /dashboard?tab=reports
- `I.clickXY(506, 20)` opens /dashboard?tab=leaderboard
- `I.clickXY(612, 20)` opens /dashboard?tab=analytics