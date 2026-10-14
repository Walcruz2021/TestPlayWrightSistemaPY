import { test, expect } from "@playwright/test";
import { FormsAddPetPage } from "../pages/FormsAddPet";
import { loginUser } from "../helpers/auth.js";

test("The button is enabled when all required fields are filled", async ({
  page,
}) => {
  const petPage = new FormsAddPetPage(page);

  await loginUser(page);
  await petPage.openModal();

  await expect(petPage.modal).toBeVisible();
  await expect(petPage.addDogButton).toBeDisabled();

  await petPage.selectFirstClient();
  await petPage.selectSize("mediano");
  await petPage.fillDogName("Firulais");

  await expect(petPage.addDogButton).toBeEnabled();
});

test("The button is disabled if the name contains only spaces", async ({
  page,
}) => {
  const petPage = new FormsAddPetPage(page);

  await loginUser(page);
  await petPage.openModal();

  await petPage.selectFirstClient();
  await petPage.selectSize("mediano");
  await petPage.fillDogName("   ");

  await expect(petPage.addDogButton).toBeDisabled();
});

test("The form informs about required fields", async ({ page }) => {
  const petPage = new FormsAddPetPage(page);

  await loginUser(page);
  await petPage.openModal();

  await expect(petPage.requiredFieldsMessage).toBeVisible();

  await expect(
    page.getByText("(*) Seleccione Cliente", { exact: true })
  ).toBeVisible();

  await expect(
    page.getByText("(*) Seleccione Tamaño", { exact: true })
  ).toBeVisible();

  await expect(
    page.getByText("(*) Nombre Mascota", { exact: true })
  ).toBeVisible();
});


test("The user can add a new pet", async ({ page }) => {
  const petPage = new FormsAddPetPage(page);

  await loginUser(page);
  await petPage.openModal();

  const nameDog = `Firulais ${Date.now()}`;

  await petPage.selectFirstClient();
  await petPage.selectSize("mediano");
  await petPage.fillDogName(nameDog);

  await petPage.addDogButton.click();

  // Verificar success message
  await expect(
    page.getByText("¡Mascota Agregada!")
  ).toBeVisible();

});