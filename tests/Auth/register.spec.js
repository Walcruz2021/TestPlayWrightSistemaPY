
// Login
// ├── the user can register successfully
// ├── the user cannot register with an existing email
// ├── the user cannot register with an invalid email

import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';
import { LoginPage } from '../pages/LoginPage';


test('The user can complete the register', async ({ page }, testInfo) => {
  const registerPage = new RegisterPage(page);
  const loginPage = new LoginPage(page);

  const email = testInfo.project.use.testEmail;


  //code to log browser console messages, page errors, and HTTP responses
  // page.on('console', msg => {
  //   console.log('BROWSER:', msg.text());
  // });

  // page.on('pageerror', error => {
  //   console.log('PAGE ERROR:', error.message);
  // });

  // page.on('response', response => {
  //   if (response.status() >= 400) {
  //     console.log(
  //       'HTTP ERROR:',
  //       response.status(),
  //       response.url()
  //     );
  //   }
  // });

  await registerPage.goto();

  await registerPage.register(
    'Walter',
    'Cruz',
    email,
    'Test123456',
    'Test123456'
  );

  await expect(
    page.getByText('¡Usuario Creado. Se envió un Link de Verificación!')
  ).toBeVisible();

  await page.getByRole('button', { name: 'Aceptar' }).click();

  await expect(page).toHaveURL(/\/login\/?$/);

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

