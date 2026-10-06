
// Login
// ├── usuario puede iniciar sesión correctamente
// ├── usuario no puede iniciar sesión con contraseña incorrecta
// ├── usuario no puede iniciar sesión con email incorrecto
//  empy field such as email or password are tested with Jest

import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';


test('The user can complete the login', async ({ page }) => {
  const email = process.env.TEST_EMAIL;
  const password = process.env.TEST_PASSWORD;

  if (!email || !password) {
    throw new Error('TEST_EMAIL and TEST_PASSWORD must be set in the environment variables.');
  }

  const loginPage = new LoginPage(page);

  await loginPage.goto();

  await loginPage.login(
    email,
    password
  );

  await expect(
    page.getByText('Dashboard', { exact: true })
  ).toBeVisible();
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

