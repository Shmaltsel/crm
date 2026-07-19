---
id: TASK-3
title: "human-bridge: /plan обробка, wait_for_goal, ask_agent, batch assign_task"
owner: mimo
status: done
wave: 0
blocked_by: [TASK-1, TASK-2]
criteria:
  - /plan <текст> обробляється як нова ціль
  - /plan при активній черзі питає підтвердження (restart/append/cancel)
  - wait_for_goal() чекає на /plan-повідомлення
  - ask_agent пише в .agents/mailbox/<target>.md і чекає відповіді (10хв таймаут)
  - ask_agent при таймауті ескалує в ask_human
  - assign_task приймає масив task-ids
  - tsc --noEmit проходить без помилок
  - build проходить
contract_ref: ""
---

# TASK-3: human-bridge v2.0

Оновлено `tools/human-bridge/src/index.ts`:
- `/plan` prefix: нова ціль, підтвердження при активній черзі
- `wait_for_goal()`: блокуючий MCP tool для очікування цілі
- `ask_agent(target, question, proposal)`: mailbox-система з таймаутом 10хв + ескалація
- `assign_task`: batch mode (масив task-ids замість одного)

## Session notes
_(порожньо)_
