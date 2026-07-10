## Main Section

Explanation of this section and its purpose.

> Container: `.swiper-wrapper`
> **Focused**

| Element | Type | ARIA | CSS | XPath | Coordinates |
|------|------|------|------|------|------|
| 'Огляд' | tab | - | '.swiper-slide-active button[aria-label="Огляд"]' | - | - |
| 'Звіти' | tab | - | '.swiper-slide button[aria-label="Звіти"]' | - | - |
| 'Рейтинг' | tab | - | '.swiper-slide button[aria-label="Рейтинг"]' | - | - |
| 'Аналітика' | tab | - | '.swiper-slide button[aria-label="Аналітика"]' | - | - |
| 'Виручка' | heading | - | 'div:has-text("Виручка")' | - | - |
| 'Прибуток' | heading | - | 'div:has-text("Прибуток")' | - | - |
| 'Активних шкіл' | heading | { role: 'heading', text: 'Активnih шkл' } | 'div:has-text("Активnih шkл")' | - | - |
| 'Дохід' | heading | - | 'div:has-text("Дохід")' | - | - |
| 'Прибуток' | heading | - | 'div:has-text("Прибуток")' | - | - |
| 'Витрати на ЗП' | heading | - | 'div:has-text("Витрати на ЗП")' | - | - |
| 'Календар' | link | - | '[aria-label="Календар"]' | '//*[self::button and contains(@class,"text-2xs") and contains(@class,"text-brand") and contains(@class,"hover:underline") and contains(.,"Календар")]' | (721, 297) |
## Navigation Section

Explanation of this section and its purpose.



| Element | Type | ARIA | CSS |
|------|------|------|------|
| 'Дашборд' | link | { role: 'link', text: 'Дашборд' } | '[aria-label="Дашборд"]' |
| 'Школи' | link | { role: 'link', text: 'Школи' } | '[aria-label="Школи"]' |
| 'Календар' | link | { role: 'link', text: 'Календар' } | '[aria-label="Календар"]' |
| 'Більше розділів' | link | { role: 'link', text: 'Більше' } | '[aria-label="Більше"]' |
## Data Section

## Data: Activities List

> Container: `.mobile-card`

Today's activities sheet is dynamic and not static, hence it is grouped as a data section.

Activity items, 2 items. Contains today's activities summary.

## Data Section

## Data: Analytical Data

> Container: `.swiper-slide-active .swiper-slide-content`

Analytical data table, 3 tables. Contains detailed analytical information like top 10 managers and projects.

## Detail Section

## Overview Tab

Explanation of this section and its purpose.



| Element | Type | ARIA | CSS |
|------|------|------|------|
| 'Overview Information' | heading | { role: 'heading', text: 'Доброго вечора, Адміністратор' } | 'h1' |
| 'Today's Date' | heading | { role: 'heading', text: 'п’ятниця, 10 липня' } | 'p' |
## Data Section

## Data: City Selection

> Container: `.city-selection`

City options, 4 options. City selection dropdown contains various city options.

## Section Summary

The main dashboard page contains several sections, primarily a main section with four tabs for Overview, Reports, Rating, and Analysis. Navigation options are available via a mobile-only navigation tab, and there are dynamic data sections for today’s activities and analytical data. The layout of the page is split into a tabbed view for different reports, with related details displayed next to the tabs.

# Expandables

| Element | Action |
|---------|--------|
| Огляд | `I.click('.swiper-slide-active button[aria-label="Огляд"]', '.swiper-wrapper')` |
| Звіти | `I.click('.swiper-slide button[aria-label="Звіти"]', '.swiper-wrapper')` |
| Рейтинг | `I.click('.swiper-slide button[aria-label="Рейтинг"]', '.swiper-wrapper')` |
| Аналітика | `I.click('.swiper-slide button[aria-label="Аналітика"]', '.swiper-wrapper')` |