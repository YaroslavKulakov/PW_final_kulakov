import { Page, Locator } from '@playwright/test';
import { HeaderFragment } from './header.fragment';

export class LoginPage {
  page: Page;
  header: HeaderFragment;

  emailField: Locator;
  passwordField: Locator;
  submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = new HeaderFragment(page);

    this.emailField = page.locator('[data-test="email"]');
    this.passwordField = page.locator('[data-test="password"]');
    this.submitButton = page.locator('[data-test="login-submit"]');
  }

  async performLogin(email: string, password: string) {
    await this.emailField.fill(email);
    await this.passwordField.fill(password);
    await this.submitButton.click();
  }
}
