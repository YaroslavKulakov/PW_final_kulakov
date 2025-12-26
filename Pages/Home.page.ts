import { Page, Locator, expect } from '@playwright/test';
import { HeaderFragment } from './header.fragment';
import { parsePrice } from '../tests/utils/price';

export class HomePage {
  readonly page: Page;
  readonly header: HeaderFragment;

  // Locators
  readonly sortDropdown: Locator;
  readonly productNames: Locator;
  readonly productPrices: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = new HeaderFragment(page);

    this.sortDropdown = page.locator('[data-test="sort"]');
    this.productNames = page.locator('[data-test="product-name"]');
    this.productPrices = page.locator('[data-test="product-price"]');
  }

  async goto() {
    await this.page.goto('/');
  }

  async selectSortOption(option: string) {
    await this.sortDropdown.selectOption({ label: option });
  }

  async getProductNames(): Promise<string[]> {
    await expect(this.productNames.first()).toBeVisible();
    return await this.productNames.allTextContents();
  }

 async getProductPrices(): Promise<number[]> {
  await expect(this.productPrices.first()).toBeVisible();

  const raw = await this.productPrices.allTextContents();

  return raw
    .map(parsePrice)
    .filter(n => Number.isFinite(n));
}

  //  фільтрація категорії
  async filterByCategory(categoryLabel: string) {
    const checkbox = this.page.getByLabel(categoryLabel);
    await checkbox.check();

    // мінімальний стабільний wait: список продуктів має бути видимий
    await expect(this.productNames.first()).toBeVisible();
  }

  //  Перевірка що всі назви містять текст
  async expectAllProductNamesContain(text: string) {
    // 1) перевірка, що фільтр реально застосувався
    await expect(this.productNames.filter({ hasText: text }).first()).toBeVisible();

    // 2) всі елементи містять text
    const names = await this.productNames.allTextContents();
    for (const name of names) {
      expect(name).toContain(text);
    }
  }
}
