
import { test, expect } from "@playwright/test";
import { loginUser } from "../helpers/auth.js";
import { FormsAddServicePage } from "../pages/FormsAddServicePage.js";


test("El usuario puede abrir el modal de venta desde la tabla de turno", async ({ page }) => {
  const addServicePage = new FormsAddServicePage(page);

  await loginUser(page);

  await addServicePage.openModal();

  // Verificar que el modal se haya abierto.
  await expect(
    page.getByRole("dialog")
  ).toBeVisible();
});


// test("No permite abrir el modal de venta sin cliente o mascota", async ({ page }) => {
//   const addServicePage = new FormsAddServicePage(page);

//   await loginUser(page);

//   await expect(
//     page.getByText("Gestión completa de turnos")
//   ).toBeVisible();

//   // Diagnóstico: comprobar si existen los botones.
//   const enabled = page.getByTestId("open_modal_add_service");
//   const disabled = addServicePage.disabledSalesModalButton;

//   console.log("Botones habilitados:", await enabled.count());
//   console.log("Botones deshabilitados:", await disabled.count());

//   // Mostrar el resultado sin hacer fallar todavía el test.
//   expect(
//     (await enabled.count()) + (await disabled.count())
//   ).toBeGreaterThan(0);
// });