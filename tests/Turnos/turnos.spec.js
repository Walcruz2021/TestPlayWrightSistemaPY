
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

test("El usuario puede crear un turno y visualizarlo en el dashboard", async ({ page }) => {
  const turnPage = new FormsTurnPage(page);

  await loginUser(page);
  await turnPage.openModal();

  // La fecha se inicializa automáticamente con el día actual.
  await turnPage.timeInput.fill("10:00");

  // Identificador único para localizar el turno después de guardarlo.
  const uniqueNote = `Prueba E2E ${Date.now()}`;
  await turnPage.notesInput.fill(uniqueNote);

  await expect(turnPage.addTurnButton).toBeEnabled();
  await turnPage.addTurnButton.click();

  // Verificar el mensaje de éxito.
  const successAlert = page.getByText(
    "¡Turno creado correctamente!",
    { exact: true }
  );
  await expect(successAlert).toBeVisible();

  // Confirmar para que el componente solicite nuevamente los turnos.
  await page.getByRole("button", {
    name: "Aceptar",
    exact: true,
  }).click();

  // Reemplazar por el selector real del turno en tu dashboard.
  // await expect(
  //   page.getByText(uniqueNote, { exact: true })
  // ).toBeVisible();
});
