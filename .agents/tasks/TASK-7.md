---
id: TASK-7
title: "lint-queue.js size guardrail + build-index checkpoint_at"
owner: mimo
status: done
wave: 0
blocked_by: []
criteria:
  - lint-queue.js виводить WARNING для done-задач >400 рядків або >6 файлів
  - build-index.js відображає checkpoint_at у черзі
contract_ref: ""
---

# TASK-7: Queue tools guardrails

Додано size guardrail у lint-queue.js (>400+ lines / >6 files → WARNING). Оновлено build-index.js для відображення checkpoint_at.

## Session notes
Зроблено в межах попереднього коміту (автоматично).
