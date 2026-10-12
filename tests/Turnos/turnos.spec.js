
// import { test, expect } from '@playwright/test';
// import { LoginPage } from '../pages/LoginPage.js';
// import { FormsTurnoPage } from '../pages/FormsTurnoPage.js';

// test.describe('Formulario de turnos', () => {
//   test('muestra un error si faltan datos obligatorios', async ({ page }) => {
//     const loginPage = new LoginPage(page);
//     const turnoPage = new FormsTurnoPage(page);

//     // 1. Abrir la aplicación e iniciar sesión.
//     await loginPage.goto();

//     await loginPage.login(
//       process.env.TEST_EMAIL,
//       process.env.TEST_PASSWORD
//     );

//     // 2. Aquí debemos navegar hasta el formulario de turnos.
//     // Falta definir la ruta y los pasos necesarios en tu aplicación.

//     console.log('URL actual:', page.url());

//     // 3. Intentar enviar el formulario vacío.
//     await turnoPage.submit();

//     // 4. Verificar la validación.
//     await expect(
//       page.getByText('Faltan Datos por Completar')
//     ).toBeVisible();
//   });
// });