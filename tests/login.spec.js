import { test, expect } from '@playwright/test';

// test('el usuario puede completar el login', async ({ page }) => {

//   await page.goto('http://localhost:3000/');

//   await page
//     .getByRole('textbox', { name: 'Ingrese su Email' })
//     .fill('walcruz1988.21@gmail.com');

//   await page
//     .getByRole('textbox', { name: 'Ingrese Contraseña' })
//     .fill('111111');

//   await page.locator('button[type="submit"]').click();

//   await expect(
//     page.getByText('Dashboard', { exact: true })
//   ).toBeVisible();
// });