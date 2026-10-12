
import { test, expect } from "@playwright/test";
import { FormsClientsPage } from "../pages/FormsClientsPage";
import { LoginPage } from '../pages/LoginPage.js';
import { loginUser } from "../helpers/auth.js";

test("El usuario puede completar el formulario de clientes", async ({
  page,
}) => {
  const clientsPage = new FormsClientsPage(page);

  //1 Login
  await loginUser(page);

  // 2. Open modal client form

  await page.getByRole("button", {
    name: /Cliente.*Nuevo cliente/i,
  }).click();

  const nombre = `Cliente Test ${Date.now()}`;

  // 3. verify that the modal is visible and the name input is present
  await expect(clientsPage.nameInput).toBeVisible();

  // 4. Complete the form with valid data
  await clientsPage.fillClientForm({
    name: nombre,
    phone: "3876153799",
    address: "Dean Funes 1235",
    notesCli: "Cliente creado durante una prueba",
    email: "cliente.prueba@example.com",
  });

  // 5. Verify that the "Agregar" button is enabled
  await expect(clientsPage.addClientButton).toBeEnabled();

  // 6. Create the client
  await clientsPage.submitClient();

  // 7. Verify that the success message is visible
  await expect(
    page.getByText("¡Cliente creado correctamente!")
  ).toBeVisible();

  // 8. Confirm the success message
  await clientsPage.confirmSuccess();

  // Go to the client list.
  await page.getByRole("link", { name: /Clientes.*Ver listado/i }).click();


  // Comprobar que el cliente aparece.
  await expect(page.getByText(nombre, { exact: true })).toBeVisible();

  // 9. Verify that the modal is closed
  await expect(page.locator(".modal.show")).toBeHidden();
});


test("El botón Agregar permanece deshabilitado con espacios vacíos", async ({
  page,
}) => {
  const clientsPage = new FormsClientsPage(page);
  const loginPage = new LoginPage(page);

  // 1. Iniciar sesión
  await loginPage.goto();
  await loginPage.login(
    process.env.TEST_EMAIL,
    process.env.TEST_PASSWORD
  );

  // 2. Abrir el formulario de clientes
  await page.getByRole("button", {
    name: /Cliente.*Nuevo cliente/i,
  }).click();

  // 3. Verificar que el botón esté inicialmente deshabilitado
  await expect(clientsPage.addClientButton).toBeDisabled();

  // 4. Ingresar solamente espacios en los campos obligatorios
  await clientsPage.nameInput.fill("   ");
  await clientsPage.phoneInput.fill("   ");
  await clientsPage.addressInput.fill("   ");

  // 5. Verificar que el botón continúe deshabilitado
  await expect(clientsPage.addClientButton).toBeDisabled();
});
