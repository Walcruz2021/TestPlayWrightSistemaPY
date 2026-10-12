
import { LoginPage } from "../pages/LoginPage.js";

export async function loginUser(page) {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login(
    process.env.TEST_EMAIL,
    process.env.TEST_PASSWORD
  );
}
