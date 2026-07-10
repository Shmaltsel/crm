<!-- suite -->
# Dashboard Overview Testing

### Prerequisite

* URL: https://app.svitlo-znan.app/dashboard

<!-- test
priority: important
-->
# Switching Between Dashboard Overview Panels

## Requirements
https://app.svitlo-znan.app/dashboard

## Steps
* Click 'Огляд' tab
* Click 'Звіти' tab
* Click 'Рейтинг' tab
* Click 'Аналітика' tab

## Expected
* Dashboard switches to 'Огляд' panel
* Dashboard switches to 'Звіти' panel
* Dashboard switches to 'Рейтинг' panel
* Dashboard switches to 'Аналітика' panel

<!-- test
priority: important
-->
# Changing Active City and Verifying Changes

## Requirements
https://app.svitlo-znan.app/dashboard

## Steps
* Click 'Вибір міста' dropdown
* Select 'Kyiv' from dropdown
* Click 'Вибір міста' dropdown again
* Verify 'Kyiv' is selected

## Expected
* Dropdown menu opens
* Kyiv city is selected
* Dropdown closes and displays 'Kyiv' city
* Active city on dashboard updates to Kyiv

<!-- test
priority: important
-->
# Filtering and Verifying Active School Count

## Requirements
https://app.svitlo-znan.app/dashboard

## Steps
* Click 'Школи' tab
* Expand 'Активних шкіл' sub-section
* Click 'Вибір міста' dropdown in 'Активних шкіл' section
* Select 'Kyiv' from dropdown
* Verify '1 853' is displayed next to 'Активних шкіл'

## Expected
* Schools tab opens
* Active schools section is expanded
* Dropdown menu opens
* Kyiv city is selected from dropdown
* Count of active schools updates to 1 853

