export class FormsAddPetPage {
  constructor(page) {
    this.page = page;

    // Campos
    this.nameDogInput = page.getByPlaceholder("Nombre de Mascota");
    this.noteDogInput = page.locator('textarea[name="notaP"]');

    // Selects de react-select
    this.clientSelect = page.locator("#cliente-select");
    this.sizeSelect = page.locator("#tam-select");

    // Botones
    this.addDogButton = page.getByRole("button", {
      name: "Agregar Mascota",
      exact:true
      //exact:true permite que playwright busque el botón con el nombre exacto "Agregar Mascota" y no coincida con otros botones que puedan tener nombres similares. Esto es útil para evitar confusiones si hay varios botones en la página con nombres parecidos.
    });

    this.confirmButton = page.getByRole("button", {
      name: "Aceptar",
    });

    // Mensaje de campos obligatorios
    this.requiredFieldsMessage = page.getByText(
      "(*) Valores Obligatorios",
      { exact: true }
    );

    // Modal
    this.modal = page.locator(".modal.show");
  }

  async openModal() {
    await this.page.getByRole("button", {
      name: /Mascota.*Agregar mascota/i,
    }).click();
  }

  async selectFirstClient() {
    await this.clientSelect.click();
    await this.page.getByRole("option").first().click();
  }

  async selectSize(size = "mediano") {
    await this.sizeSelect.click();
    await this.page.getByRole("option", {
      name: size,
      exact: true,
    }).click();
  }

  async fillDogName(name) {
    await this.nameDogInput.fill(name);
  }

  async fillDogNote(note) {
    await this.noteDogInput.fill(note);
  }

  async submitDog() {
    await this.addDogButton.click();
  }

  async confirmSuccess() {
    await this.confirmButton.click();
  }
}