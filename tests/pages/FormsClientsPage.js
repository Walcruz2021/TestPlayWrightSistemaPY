
export class FormsClientsPage {
  constructor(page) {
    this.page = page;

    // Campos del modal
    this.nameInput = page.getByPlaceholder("Pepe Argento");
    this.phoneInput = page.getByPlaceholder("3876153799");
    this.addressInput = page.getByPlaceholder("Dean Funes 1235");

    this.notesInput = page.locator(
      'textarea[name="notesCli"]'
    );

    this.emailInput = page.locator(
      'input[name="email"]'
    );

    // Botón para agregar el cliente
    this.addClientButton = page.getByRole("button", {
      name: /^Agregar /,
    });

    // Botones de SweetAlert2
    this.confirmButton = page.getByRole("button", {
      name: "Aceptar",
    });

    // Mensajes
    this.requiredFieldsMessage = page.getByText(
      "(*) Valores Obligatorios"
    );
  }

  // Completar los campos del formulario
  async fillClientForm({
    name,
    phone,
    address,
    notesCli = "",
    email = "",
  }) {
    await this.nameInput.fill(name);
    await this.phoneInput.fill(phone);
    await this.addressInput.fill(address);
    await this.notesInput.fill(notesCli);
    await this.emailInput.fill(email);
  }

  // Agregar un cliente
  async submitClient() {
    await this.addClientButton.click();
  }

  // Confirmar el mensaje de éxito
  async confirmSuccess() {
    await this.confirmButton.click();
  }

  // Verificar si el botón está habilitado
  async isAddClientButtonEnabled() {
    return await this.addClientButton.isEnabled();
  }

  // Verificar si el botón está deshabilitado
  async isAddClientButtonDisabled() {
    return await this.addClientButton.isDisabled();
  }

  // Obtener el título del modal
  async getModalTitle() {
    return await this.page.locator(".modal-title").innerText();
  }

  // Verificar si el modal está visible
  async isModalVisible() {
    return await this.page.locator(".modal.show").isVisible();
  }
}
