---
url: /login
title: CRM
---
## FLOW: reach /dashboard from /login

* reach /dashboard from /login

```js
I.fillField('#login-email', 'admin@crm.com');
I.fillField('#login-password', '123!PASSWORD!321');
I.click('button[type="submit"]');
```

---

## FLOW: reach /dashboard from /login

* reach /dashboard from /login

```js
I.fillField({ "role": "textbox", "text": "Email" }, 'admin@crm.com');
I.fillField({ "role": "textbox", "text": "Пароль" }, '123!PASSWORD!321');
I.click({ "role": "button", "text": "Увійти" });
```

---


