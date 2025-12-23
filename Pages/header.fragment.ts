import { Page, Locator } from '@playwright/test';

export class HeaderFragment {
  page: Page;

  homeLink: Locator;
  categoriesLink: Locator;
  contactLink: Locator;
  signInLink: Locator;
  languageDropdown: Locator;

  constructor(page: Page) {
    this.page = page;

    this.homeLink = page.locator('[data-test="nav-home"]');
    this.categoriesLink = page.locator('[data-test="nav-categories"]');
    this.contactLink = page.locator('[data-test="nav-contact"]');
    this.signInLink = page.locator('[data-test="nav-sign-in"]');
    this.languageDropdown = page.locator('[data-test="language-select"]');
  }

  async openHome() {
    await this.homeLink.click();
  }

  async openCategories() {
    await this.categoriesLink.click();
  }

  async openContact() {
    await this.contactLink.click();
  }

  async openLogin() {
    await this.signInLink.click();
  }

  async openLanguageMenu() {
    await this.languageDropdown.click();
  }
}

