
import { test, expect } from "@playwright/test";
import { loginUser } from "../helpers/auth.js";
import { FormsTurnPage } from "../pages/FormsTurnPage.js";

test("The button is enabled when all required fields are filled", async ({
  page,
}) => {
  const turnPage = new FormsTurnPage(page);

  await loginUser(page);
  await turnPage.openModal();

  await expect(turnPage.modal).toBeVisible();
  await expect(turnPage.addTurnButton).toBeDisabled();

  await turnPage.timeInput.fill("10:00");

  await expect(turnPage.addTurnButton).toBeEnabled();
});

test("The form informs about required fields", async ({ page }) => {
  const turnPage = new FormsTurnPage(page);

  await loginUser(page);
  await turnPage.openModal();

  await expect(turnPage.requiredFieldsMessage).toBeVisible();

  await expect(
    page.getByText("(*) Fecha Turno", { exact: true })
  ).toBeVisible();

  await expect(
    page.getByText("(*) Horario Turno", { exact: true })
  ).toBeVisible();


});


test("The system does not allow users to create an appointment with a past date.", async ({ page }) => {
  const turnPage = new FormsTurnPage(page);

  await loginUser(page);
  await turnPage.openModal();

  // Generar la fecha de ayer en horario local.
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const year = yesterday.getFullYear();
  const month = String(yesterday.getMonth() + 1).padStart(2, "0");
  const day = String(yesterday.getDate()).padStart(2, "0");

  const dateString = `${year}-${month}-${day}`;

  const uniqueNote = `Prueba E2E ${Date.now()}`;

  await turnPage.dateInput.fill(dateString);
  await turnPage.timeInput.fill("10:00");
  await turnPage.notesInput.fill(uniqueNote);

  // Verificar que el botón esté habilitado porque hay fecha y hora.
  await expect(turnPage.addTurnButton).toBeEnabled();

  await turnPage.addTurnButton.click();

  // Verificar que la aplicación rechace la fecha pasada.
  await expect(
    page.getByText("Fecha Incorrecta", { exact: true })
  ).toBeVisible();
});


test("The modal is reset after creating a new appointment.", async ({ page }) => {
  const turnPage = new FormsTurnPage(page);

  await loginUser(page);
  await turnPage.openModal();

  const uniqueNote = `Prueba E2E ${Date.now()}`;

  // Completar los campos del turno.
    // Generar la fecha de ayer en horario local.
  const yesterday = new Date();


  const year = yesterday.getFullYear();
  const month = String(yesterday.getMonth() + 1).padStart(2, "0");
  const day = String(yesterday.getDate()).padStart(2, "0");

  const dateString = `${year}-${month}-${day}`;

  await turnPage.dateInput.fill(dateString);
  await turnPage.timeInput.fill("10:00");
  await turnPage.notesInput.fill(uniqueNote);

  await expect(turnPage.addTurnButton).toBeEnabled();

  // Crear el turno.
  await turnPage.addTurnButton.click();

  // Confirmar el mensaje de éxito.
  await expect(
    page.getByText("¡Turno creado correctamente!", { exact: true })
  ).toBeVisible();

  await page.getByRole("button", { name: "Aceptar", exact: true }).click();

  // Volver a abrir el modal.
  await turnPage.openModal();

  // Comprobar que los campos estén reiniciados.
  // await expect(turnPage.dateInput).toHaveValue(dateString);

  await expect(turnPage.timeInput).toHaveValue("");
  await expect(turnPage.notesInput).toHaveValue("");

  // Comprobar que los selectores vuelvan a sus placeholders.
  await expect(
    page.getByText("Seleccione Cliente", { exact: true })
  ).toBeVisible();

  await expect(
    page.getByText("Seleccione Mascota", { exact: true })
  ).toBeVisible();
});
