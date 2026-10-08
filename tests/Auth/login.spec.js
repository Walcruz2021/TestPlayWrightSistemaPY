
// Login
// ├── usuario puede iniciar sesión correctamente y ser redirigido a dashboard
// ├── usuario sin empresa puede iniciar sesión correctamente y ser redirigido a addCompany
// ├── usuario no puede iniciar sesión con contraseña incorrecta
// ├── usuario no puede iniciar sesión con email incorrecto
//  empy field such as email or password are tested with Jest

import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';


test('The user with a company can complete the login and is redirected to the dashboard', async ({ page }) => {

  const email = process.env.TEST_EMAIL;
  const password = process.env.TEST_PASSWORD;

  if (!email || !password) {
    throw new Error(
      'TEST_EMAIL and TEST_PASSWORD must be set in the environment variables.'
    );
  }

  const loginPage = new LoginPage(page);

  await loginPage.goto();

  await loginPage.login(email, password);

  await expect(
    page.getByText('Dashboard', { exact: true })
  ).toBeVisible();
});

test('The user without a company can complete the login and is redirected to addCompany', async ({ page }) => {

  const email = process.env.TEST_EMAIL_NO_COMPANY;
  const password = process.env.TEST_PASSWORD_NO_COMPANY;

  if (!email || !password) {
    throw new Error(
      'TEST_EMAIL_NO_COMPANY and TEST_PASSWORD_NO_COMPANY must be set in the environment variables.'
    );
  }

  const loginPage = new LoginPage(page);

  await loginPage.goto();

  await loginPage.login(email, password);

  await expect(page).toHaveURL(/\/addCompany/);
});

test('The user cannot log in with an incorrect password', async ({
  page,
}) => {
  const email = process.env.TEST_EMAIL;
  const loginPage = new LoginPage(page);

  await loginPage.goto();

  await loginPage.login(
    email,
    'contraseñaIncorrecta'
  );

  await expect(
    page.getByText('Dashboard', { exact: true })
  ).not.toBeVisible();
});

test('The user cannot log in with an incorrect user', async ({
  page,
}) => {
  const password = process.env.TEST_PASSWORD;
  const loginPage = new LoginPage(page);

  await loginPage.goto();

  await loginPage.login(
    "incorrect user",
    password
  );

  await expect(
    page.getByText('Dashboard', { exact: true })
  ).not.toBeVisible();
});

