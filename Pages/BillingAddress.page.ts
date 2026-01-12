import { expect, type Locator, type Page } from '@playwright/test';
import { AddressData, defaultAddress } from '../tests/utils/address';

export class BillingAddressPage {
  readonly page: Page;

  readonly street: Locator;
  readonly city: Locator;
  readonly state: Locator;
  readonly country: Locator;
  readonly postalCode: Locator;
  readonly proceedButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.street = page.getByTestId('street');
    this.city = page.getByTestId('city');
    this.state = page.getByTestId('state');
    this.country = page.getByTestId('country');
    this.postalCode = page.getByTestId('postal_code');
    this.proceedButton = page.getByTestId('proceed-3');
  }

  async expectOpened() {
    await expect(this.proceedButton).toBeVisible();
  }

  async fillMissingFields(
    data: AddressData = defaultAddress
  ): Promise<void> {
    await this.street.fill(data.street);
    await this.city.fill(data.city);
    await this.state.fill(data.state);
    await this.country.fill(data.country);
    await this.postalCode.fill(data.postalCode);
  }

  async proceed() {
    await this.proceedButton.click();
  }
}
