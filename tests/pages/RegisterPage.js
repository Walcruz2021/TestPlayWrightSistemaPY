export class RegisterPage {
    constructor(page) {
        this.page = page;

        this.nameInput = page.getByRole('textbox', {
            name: '(*) Nombre',
        });

        this.lastNameInput = page.getByRole('textbox', {
            name: '(*) Apellido',
        });

        this.emailInput = page.getByPlaceholder('(*) Ingrese su Email');

        this.passwordInput = page.getByPlaceholder('(*) Password mayor 5 digitos');
        this.confirmPasswordInput = page.getByPlaceholder(
            '(*) Ingrese de nuevo el password'
        );

        this.registerButton = page.locator('button[type="submit"]');
    }

    async goto() {
        await this.page.goto('/register');
    }

    async register(name, lastName, email, password,confirmPassword) {
   
        await this.nameInput.fill(name);
        await this.lastNameInput.fill(lastName);
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.confirmPasswordInput.fill(confirmPassword);
        await this.registerButton.click();
    }
}