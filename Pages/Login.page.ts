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

    this.emailField = page.getByTestId('email');
    this.passwordField = page.getByTestId('password');
    this.submitButton = page.getByTestId('login-submit');
  }

  async performLogin(email: string, password: string) {
    await this.emailField.waitFor({ state: 'visible', timeout: 10000 });
    await this.emailField.fill(email);
    await this.passwordField.waitFor({ state: 'visible', timeout: 10000 });
    await this.passwordField.fill(password);
    await this.submitButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.submitButton.click();
  }
}