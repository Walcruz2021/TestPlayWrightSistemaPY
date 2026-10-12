
// export class FormsTurnoPage {
//   constructor(page) {
//     this.page = page;

//     this.clientSelect = page.getByTestId('cliente-select');
//     this.dogSelect = page.getByTestId('mascota-select');

//     this.dateInput = page.getByTestId('fecha-turno-input');
//     this.timeInput = page.getByTestId('hora-turno-input');
//     this.notesInput = page.getByTestId('nota-turno-input');

//     this.submitButton = page.getByTestId('crear-turno-button');
//   }

//   async selectClient(clientName) {
//     await this.clientSelect.click();

//     await this.page
//       .getByRole('option', { name: clientName, exact: true })
//       .click();
//   }

//   async selectDog(dogName) {
//     await this.dogSelect.click();

//     await this.page
//       .getByRole('option', { name: dogName, exact: true })
//       .click();
//   }

//   async fillTurnForm({ date, time, notes }) {
//     await this.dateInput.fill(date);
//     await this.timeInput.fill(time);
//     await this.notesInput.fill(notes);
//   }

//   async submit() {
//     await this.submitButton.click();
//   }
// }