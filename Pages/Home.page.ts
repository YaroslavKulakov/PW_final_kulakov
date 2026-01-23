import { expect, type Locator, type Page } from '@playwright/test';
import { HeaderFragment } from './header.fragment';
import { parsePrice } from '../tests/utils/price';

export class HomePage {
  readonly page: Page;
  readonly header: HeaderFragment;

  readonly sortDropdown: Locator;
  readonly productNames: Locator;
  readonly productPrices: Locator;
  readonly itemCardLocator: Locator;

  // first product helpers
  readonly firstProductName: Locator;
  readonly firstProductPrice: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = new HeaderFragment(page);

    this.sortDropdown = page.getByTestId('sort');
    this.productNames = page.getByTestId('product-name');
    this.productPrices = page.getByTestId('product-price');


    this.itemCardLocator = page.locator('a.card');

    // first item
    this.firstProductName = this.productNames.first();
    this.firstProductPrice = this.productPrices.first();
  }


  async goToHomePage(): Promise<void> {
    await this.page.goto('/');
  }


  async mockProducts(productAmount: number): Promise<void> {
    await this.page.route('**/products*', async (route) => {
      // робимо унікальні Mock продукти 
      const products = Array.from({ length: productAmount }, (_, i) => ({
        id: i + 1,
        name: `Mock product ${i + 1}`,
        price: 10 + i,
      }));

      await route.fulfill({
        json: {
          current_page: 1,
          data: products,
          from: 1,
          to: productAmount,
          per_page: productAmount,
          total: productAmount,
          last_page: 1,
        },
      });
    });
  }



  // read first product data
  async getFirstProductName(): Promise<string> {
    await expect(this.firstProductName).toBeVisible();
    return (await this.firstProductName.innerText()).trim();
  }

  async openFirstProduct(): Promise<void> {
    await expect(this.firstProductName).toBeVisible();
    await this.firstProductName.click();
  }

  async getFirstProductPriceText(): Promise<string> {
    const el = this.productPrices.first();
    await expect(el).toBeVisible();
    return (await el.innerText()).trim();
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
