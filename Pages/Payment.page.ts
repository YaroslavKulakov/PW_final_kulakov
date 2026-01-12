import { expect, type Locator, type Page } from '@playwright/test';
import type { CreditCardData } from '../tests/utils/paymentData';

export class PaymentPage {
  readonly page: Page;

  readonly paymentMethodSelect: Locator;
  readonly cardNumberInput: Locator;
  readonly expirationDateInput: Locator;
  readonly cvvInput: Locator;
  readonly cardHolderNameInput: Locator;
  readonly confirmButton: Locator;
  readonly successAlert: Locator;

  constructor(page: Page) {
    this.page = page;

    // testIdAttribute = "data-test"
    this.paymentMethodSelect = page.getByTestId('payment-method');

    this.cardNumberInput = page.getByTestId('credit_card_number');
    this.expirationDateInput = page.getByTestId('expiration_date');
    this.cvvInput = page.getByTestId('cvv');
    this.cardHolderNameInput = page.getByTestId('card_holder_name');

    // Confirm button
    this.confirmButton = page.getByTestId('finish');

    // Success message
    this.successAlert = page.getByText('Payment was successful');
  }

  async expectOpened(): Promise<void> {
    await expect(this.paymentMethodSelect).toBeVisible();
    await expect(this.confirmButton).toBeVisible();
  }

  async selectCreditCard(): Promise<void> {
    await this.paymentMethodSelect.selectOption({ label: 'Credit Card' });
  }

  async fillCreditCardForm(data: CreditCardData): Promise<void> {
    await this.cardNumberInput.fill(data.cardNumber);
    await this.expirationDateInput.fill(data.expiration);
    await this.cvvInput.fill(data.cvv);
    await this.cardHolderNameInput.fill(data.holder);
  }

  async confirmPayment(): Promise<void> {
    await this.confirmButton.click();
  }

  async payByCreditCard(data: CreditCardData): Promise<void> {
    await this.selectCreditCard();
    await this.fillCreditCardForm(data);
    await this.confirmPayment();
  }

  async expectPaymentSuccess(): Promise<void> {
    await expect(this.successAlert).toBeVisible();
  }
}
