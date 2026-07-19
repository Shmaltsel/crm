---
id: TASK-1
title: "Queue tools: build-index.js та lint-queue.js"
owner: mimo
status: done
wave: 0
blocked_by: []
criteria:
  - build-index.js збирає TASK-*.md у .agents/queue.md
  - lint-queue.js перевіряє criteria, blocked_by (цикли + неіснуючі id), owner, status
  - scripts працюють на порожній черзі (0 задач)
  - scripts працюють з YAML-списками у frontmatter
contract_ref: ""
---

# TASK-1: Queue tools

Створено `tools/queue-tools/build-index.js` та `tools/queue-tools/lint-queue.js`.
- build-index: read-only генерація queue.md з TASK-*.md файлів
- lint: перевірка criteria (наявність), blocked_by (цикли + references), owner/status (допустимі значення)
