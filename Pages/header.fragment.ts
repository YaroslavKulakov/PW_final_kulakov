import { Locator, Page, expect } from '@playwright/test';

export class HeaderFragment {
  readonly page: Page;

  readonly homeLink: Locator;
  readonly categoriesLink: Locator;
  readonly contactLink: Locator;
  readonly signInLink: Locator;
  readonly languageDropdown: Locator;

  readonly cartLink: Locator;
  readonly cartQuantity: Locator;

  constructor(page: Page) {
    this.page = page;

    // testIdAttribute = 'data-test'
    this.homeLink = page.getByTestId('nav-home');
    this.categoriesLink = page.getByTestId('nav-categories');
    this.contactLink = page.getByTestId('nav-contact');

  
    this.signInLink = page.locator('[data-test="nav-sign-in"] a, a[data-test="nav-sign-in"]');

    this.languageDropdown = page.getByTestId('language-select');

    this.cartLink = page.getByTestId('nav-cart');
    this.cartQuantity = page.getByTestId('cart-quantity');
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

  async openCart(): Promise<void> {
    await this.click(this.cartLink);
  }

  async expectCartQuantity(expected: string): Promise<void> {
    await expect(this.cartQuantity).toHaveText(expected);
  }
}
