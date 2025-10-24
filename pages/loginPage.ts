import { Page, Locator } from '@playwright/test';
import { loginLocators } from '../locators/loginLocators';

export class LoginPage {
  readonly page: Page;
  readonly userEmail: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userEmail = page.locator(loginLocators.userEmailInput);
    this.password = page.locator(loginLocators.userPasswordInput);
    this.loginButton = page.getByRole('button', { name: 'Sign In' });
  }

  async login(userEmail: string, password: string): Promise<void> {
    // Step: Perform login
    await this.userEmail.click();
    await this.userEmail.fill(userEmail);
    await this.password.click();
    await this.password.fill(password);
    await this.loginButton.click();
  }
}
