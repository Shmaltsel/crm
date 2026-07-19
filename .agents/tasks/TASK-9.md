---
id: TASK-9
title: "human-bridge: ask_agent frequency counter"
owner: mimo
status: done
wave: 0
blocked_by: []
criteria:
  - ask_agent рахує виклики на фічу
  - при >2 викликах додає warning у notify
  - tsc + build проходять без помилок
contract_ref: ""
---

# TASK-9: ask_agent frequency monitoring

Додано лічильник ask_agent на фічу в human-bridge. При >2 викликах на фічу → warning у notify().

## Session notes
Зроблено в межах попереднього коміту (автоматично).
