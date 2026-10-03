
// Login
// ├── usuario puede iniciar sesión correctamente
// ├── usuario no puede iniciar sesión con contraseña incorrecta
// ├── usuario no puede iniciar sesión con email incorrecto
// ├── usuario no puede iniciar sesión con campos vacíos
// ├── usuario no puede iniciar sesión con email vacío
// ├── usuario no puede iniciar sesión con contraseña vacía
// └── contraseña se puede mostrar/ocultar
// @ts-check

import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';


test('el usuario puede completar el login', async ({ page }) => {
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

test('el usuario no puede iniciar sesión con una contraseña incorrecta', async ({
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