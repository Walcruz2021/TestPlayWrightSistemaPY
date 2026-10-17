export class FormsTurnPage {
  constructor(page) {
    this.page = page;

    this.modal = page.locator(".modal.show");

    this.clientSelect = page.getByTestId("cliente-select");
    this.petSelect = page.getByTestId("mascota-select");

    this.dateInput = page.getByTestId("fecha-turno-input");
    this.timeInput = page.getByTestId("hora-turno-input");
    this.notesInput = page.getByTestId("nota-turno-input");

    this.addTurnButton = page.getByRole("button", {
      name: "Agregar Turno",
      exact:true
      //exact:true permite que playwright busque el botón con el nombre exacto "Agregar Mascota" y no coincida con otros botones que puedan tener nombres similares. Esto es útil para evitar confusiones si hay varios botones en la página con nombres parecidos.
    });

        // Mensaje de campos obligatorios
    this.requiredFieldsMessage = page.getByText(
      "(*) Valores Obligatorios",
      { exact: true }
    );

  }
  
  async openModal() {
    await this.page.getByRole("button", {
      name: /Turno.*Nuevo turno/i,
    }).click();
  }
}