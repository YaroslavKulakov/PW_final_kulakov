import { expect, type Locator, type Page } from '@playwright/test';

export class ProductPage {
  readonly page: Page;

  readonly productName: Locator;
  readonly productNames: Locator;
  readonly unitPrice: Locator;
  readonly addToCartButton: Locator;
  readonly addToFavoritesButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.productNames = page.getByTestId('product-name');
 
    this.productName = page.getByTestId('product-name');
    this.unitPrice = page.getByTestId('unit-price');

    this.addToCartButton = page.getByTestId('add-to-cart');
    this.addToFavoritesButton = page.getByTestId('add-to-favorites');
  }

  async expectOpened(): Promise<void> {
    await expect(this.page).toHaveURL(/\/product\//);
    await expect(this.productName).toBeVisible();
  }

  async expectName(expected: string): Promise<void> {
    await expect(this.productName).toHaveText(expected);
  }

  async expectPrice(expected: string): Promise<void> {
    await expect(this.unitPrice).toHaveText(expected);
  }

  async addToCart(): Promise<void> {
    await expect(this.addToCartButton).toBeVisible();
    await this.addToCartButton.click();
  }

  async expectButtonsVisible(): Promise<void> {
    await expect(this.addToCartButton).toBeVisible();
    await expect(this.addToFavoritesButton).toBeVisible();
  }
  async expectProductsCount(count: number): Promise<void> {
  await expect(this.productNames).toHaveCount(count);
  }
}
