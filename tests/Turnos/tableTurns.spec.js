import { test, expect } from "@playwright/test"
import { loginUser } from "../helpers/auth.js";

// This test should work only the company is type "veterinary"

test("The table should render 6 rows(MASCOTA,CLIENTE,FECHA,HORA,OPCIONES,AVISO)", async ({ page }) => {
    await loginUser(page);

    // verify the section Turns are visible.
    await expect(
        page.getByText("Gestión completa de turnos")
    ).toBeVisible();

    // Verifi that all headers are visible.
    await expect(page.getByTestId("col-mascota")).toBeVisible();
    await expect(page.getByTestId("col-cliente")).toBeVisible();
    await expect(page.getByTestId("col-fecha")).toBeVisible();
    await expect(page.getByTestId("col-hora")).toBeVisible();
    await expect(page.getByTestId("col-opciones")).toBeVisible();
    await expect(page.getByTestId("col-aviso")).toBeVisible();

})

test("The table should display the correct number of rows (addEntry, deleteTurn,addSale,Edit )", async ({ page }) => {
  await loginUser(page);

  const row = page.getByTestId("fila-turno").first();

  await expect(row).toBeVisible();

  // Ventas: puede estar habilitado o deshabilitado.
  const salesEnabled = row.getByTestId("open_modal_add_service");
  const salesDisabled = row.getByTestId("open_modal_add_service_disabled");

  await expect(
    salesEnabled.or(salesDisabled)
  ).toBeVisible();

  // Editar y eliminar.
  await expect(row.getByTestId("btn-editar")).toBeVisible();
  await expect(row.getByTestId("btn-eliminar")).toBeVisible();

  // Ficha: solo si la categoría y el turno cumplen las condiciones.
  await expect(row.getByTestId("btn-ficha")).toBeVisible();
});