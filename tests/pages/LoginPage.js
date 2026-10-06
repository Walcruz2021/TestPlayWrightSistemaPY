export class LoginPage {
  constructor(page) {
    this.page = page;

    this.emailInput = page.getByRole('textbox', {
      name: 'Ingrese su Email',
    });

    this.passwordInput = page.getByRole('textbox', {
      name: 'Ingrese Contraseña',
    });

    this.loginButton = page.locator('button[type="submit"]');
  }

  async goto() {
    await this.page.goto('/', {
      waitUntil: 'domcontentloaded',//continue when main HTMl/DOM already loaded 
      timeout: 60000 //allow 60 seconds for the page to load
    });
  }

  async login(email, password) {

    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}