
// Login
// ├── the user can register successfully
// ├── the user cannot register with an existing email
// ├── the user cannot register with an invalid email

import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';


test('The user can complete the register', async ({ page }) => {


  const registerPage = new RegisterPage(page);

  await registerPage.goto();

  await registerPage.register(
    'Walter',
    'Cruz',
    'walter.test@example.com',
    'Test123456',
    'Test123456'
  );


});

test('The user cannot register with an existing email', async ({ page }) => {
  const email = process.env.TEST_EMAIL;
  const password = process.env.TEST_PASSWORD;

  const registerPage = new RegisterPage(page);

  await registerPage.goto();

  await registerPage.register(
    'Walter',
    'Cruz',
    email,
    password,
    password
  );

  await expect(
    page.getByText('El Email ya se encuentra Registrado')
  ).toBeVisible();
});


// test('The user cannot log in with an incorrect password', async ({
//   page,
// }) => {
//   const email = process.env.TEST_EMAIL;
//   const loginPage = new LoginPage(page);

//   await loginPage.goto();

//   await loginPage.login(
//     email,
//     'contraseñaIncorrecta'
//   );

//   await expect(
//     page.getByText('Dashboard', { exact: true })
//   ).not.toBeVisible();
// });

// test('The user cannot log in with an incorrect user', async ({
//   page,
// }) => {
//   const password = process.env.TEST_PASSWORD;
//   const loginPage = new LoginPage(page);

//   await loginPage.goto();

//   await loginPage.login(
//     "incorrect user",
//     password
//   );

//   await expect(
//     page.getByText('Dashboard', { exact: true })
//   ).not.toBeVisible();
// });

