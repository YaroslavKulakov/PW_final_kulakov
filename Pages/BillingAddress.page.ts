import { Page, Locator, expect } from '@playwright/test';

export class BillingAddressPage {
  readonly page: Page;

  readonly streetInput: Locator;
  readonly cityInput: Locator;
  readonly stateInput: Locator;
  readonly countryInput: Locator;
  readonly postalCodeInput: Locator;
  readonly proceedButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // testIdAttribute = "data-test"
    this.streetInput = page.getByTestId('street');
    this.cityInput = page.getByTestId('city');
    this.stateInput = page.getByTestId('state');
    this.countryInput = page.getByTestId('country');
    this.postalCodeInput = page.getByTestId('postal_code');

    // кнопка Continue / Proceed
    this.proceedButton = page.getByTestId('proceed-3');
  }

  async expectOpened(): Promise<void> {
    await expect(this.streetInput).toBeVisible();
    await expect(this.proceedButton).toBeVisible();
  }

  async fillMissingFields(): Promise<void> {
    // заповнюємо тільки якщо пусті 
    if (await this.streetInput.inputValue() === '') {
      await this.streetInput.fill('Main Street 123');
    }

    if (await this.cityInput.inputValue() === '') {
      await this.cityInput.fill('Kyiv');
    }

    if (await this.stateInput.inputValue() === '') {
      await this.stateInput.fill('Kyiv');
    }

    if (await this.countryInput.inputValue() === '') {
      await this.countryInput.fill('Ukraine');
    }

    if (await this.postalCodeInput.inputValue() === '') {
      await this.postalCodeInput.fill('01001');
    }
  }

  async proceed(): Promise<void> {
    await this.proceedButton.click();
  }
}
