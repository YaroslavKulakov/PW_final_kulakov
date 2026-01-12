import { expect, type Locator, type Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;

  // ===== Main controls =====
  readonly quantityInput: Locator;
  readonly continueShoppingButton: Locator;
  readonly proceedToCheckoutButton: Locator;

  // ===== Item data =====
  readonly productTitle: Locator;
  readonly productPrice: Locator;
  readonly cartTotal: Locator;

  constructor(page: Page) {
    this.page = page;

    // Controls
    this.quantityInput = page.getByTestId('product-quantity');
    this.continueShoppingButton = page.getByTestId('continue-shopping');
    this.proceedToCheckoutButton = page.getByTestId('proceed-1');

    // Data
    this.productTitle = page.getByTestId('product-title');
    this.productPrice = page.getByTestId('product-price');
    this.cartTotal = page.getByTestId('cart-total');
  }

  // ===== Assertions =====

  async expectOpened(): Promise<void> {
    await expect(this.page).toHaveURL(/\/checkout/);
    await expect(this.quantityInput).toBeVisible();
    await expect(this.proceedToCheckoutButton).toBeVisible();
  }

  // ===== Getters =====

  async getItemName(): Promise<string> {
    return (await this.productTitle.innerText()).trim();
  }

  async getItemPriceText(): Promise<string> {
    return (await this.productPrice.innerText()).trim();
  }

  async getSummaryTotalText(): Promise<string> {
    return (await this.cartTotal.innerText()).trim();
  }


  async getItemTotalText(): Promise<string> {
    return this.getSummaryTotalText();
  }

  // ===== Actions =====

  async proceedToCheckout(): Promise<void> {
    await this.proceedToCheckoutButton.click();
  }

  async continueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }

  async getQuantity(): Promise<number> {
    return Number(await this.quantityInput.inputValue());
  }

  async setQuantity(value: number): Promise<void> {
    await this.quantityInput.fill(String(value));
  }
}
