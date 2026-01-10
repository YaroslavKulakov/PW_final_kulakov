import {Locator, Page } from '@playwright/test';

export class HeaderFragment {
  readonly page: Page;

  readonly homeLink: Locator;
  readonly categoriesLink: Locator;
  readonly contactLink: Locator;
  readonly signInLink: Locator;
  readonly languageDropdown: Locator;

  constructor(page: Page) {
    this.page = page;

    // testIdAttribute = 'data-test'
    this.homeLink = page.getByTestId('nav-home');
    this.categoriesLink = page.getByTestId('nav-categories');
    this.contactLink = page.getByTestId('nav-contact');
    this.signInLink = page.locator('[data-test="nav-sign-in"] a, a[data-test="nav-sign-in"]');
    this.languageDropdown = page.getByTestId('language-select');
  }

private async click(locator: Locator): Promise<void> {
    await locator.click();
  }

  async openHome(): Promise<void> {
    await this.click(this.homeLink);
  }

  async openCategories(): Promise<void> {
    await this.click(this.categoriesLink);
  }

  async openContact(): Promise<void> {
    await this.click(this.contactLink);
  }

  async openLogin(): Promise<void> {
    await this.click(this.signInLink);
  }

  async openLanguageMenu(): Promise<void> {
    await this.click(this.languageDropdown);
  }
}
