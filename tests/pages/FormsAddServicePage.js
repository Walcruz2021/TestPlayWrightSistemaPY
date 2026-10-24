export class FormsAddServicePage {
  constructor(page) {
    this.page = page;

    this.openSalesModalButton = page.getByTestId(
      "open_modal_add_service"
    );

    this.disabledSalesModalButton = page.getByTestId(
      "open_modal_add_service_disabled"
    );
  }

  async openModal() {
    await this.openSalesModalButton.click();
  }
}

