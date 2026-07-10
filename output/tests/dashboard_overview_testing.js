import step, { Section } from 'codeceptjs/steps';

Feature('Dashboard Overview Testing')

Before(({ I }) => {
  I.amOnPage('https://app.svitlo-znan.app/dashboard');
});

Scenario.todo('Switching Between Dashboard Overview Panels', ({ I }) => {
  // Click 'Огляд' tab
  // Click 'Звіти' tab
  // Click 'Рейтинг' tab
  // Click 'Аналітика' tab
});

Scenario.todo('Changing Active City and Verifying Changes', ({ I }) => {
  // Click 'Вибір міста' dropdown
  // Select 'Kyiv' from dropdown
  // Click 'Вибір міста' dropdown again
  // Verify 'Kyiv' is selected
});

Scenario.todo('Filtering and Verifying Active School Count', ({ I }) => {
  // Click 'Школи' tab
  // Expand 'Активних шкіл' sub-section
  // Click 'Вибір міста' dropdown in 'Активних шкіл' section
  // Select 'Kyiv' from dropdown
  // Verify '1 853' is displayed next to 'Активних шкіл'
});
