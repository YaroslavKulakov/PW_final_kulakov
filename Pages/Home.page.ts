import { expect, type Locator, type Page } from '@playwright/test';
import { HeaderFragment } from './header.fragment';
import { parsePrice } from '../tests/utils/price';

export class HomePage {
  readonly page: Page;
  readonly header: HeaderFragment;

  readonly sortDropdown: Locator;
  readonly productNames: Locator;
  readonly productPrices: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = new HeaderFragment(page);

    this.sortDropdown = page.getByTestId('sort');
    this.productNames = page.getByTestId('product-name');
    this.productPrices = page.getByTestId('product-price');
  }

  async goto() {
    await this.page.goto('/');
  }

  async openProductByName(name: string): Promise<void> {
    const product = this.page.getByTestId('product-name').filter({ hasText: name }).first();
    await expect(product).toBeVisible();
    await product.click();
  }


  async selectSortOption(option: string) {
    await this.sortDropdown.selectOption({ label: option });
  }

  async getProductNames(): Promise<string[]> {
    await expect(this.productNames.first()).toBeVisible();
    return await this.productNames.allTextContents();
  }

  async getProductPrices(): Promise<number[]> {
    const pricesText = await this.page.getByTestId('unit-price').allTextContents();
    return pricesText.map(parsePrice);
  }

  async filterByCategory(categoryLabel: string) {
    const checkbox = this.page.getByLabel(categoryLabel);
    await checkbox.check();
    await expect(this.productNames.first()).toBeVisible();
  }

  async expectAllProductNamesContain(text: string) {
    await expect(this.productNames.filter({ hasText: text }).first()).toBeVisible();
    const names = await this.productNames.allTextContents();
    for (const name of names) {
      expect(name).toContain(text);
    }
  }
}
