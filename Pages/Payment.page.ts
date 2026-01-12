import { expect, type Locator, type Page } from '@playwright/test';

export type CreditCardData = {
  cardNumber: string;
  expiration: string; // MM/YYYY
  cvv: string;
  holder: string;
};

export class PaymentPage {
  readonly page: Page;

  readonly paymentMethodSelect: Locator;
  readonly cardNumberInput: Locator;
  readonly expirationDateInput: Locator;
  readonly cvvInput: Locator;
  readonly cardHolderNameInput: Locator;
  readonly confirmButton: Locator;


  readonly paymentSuccessAlert: Locator;

  constructor(page: Page) {
    this.page = page;


    this.paymentMethodSelect = page.getByTestId('payment-method');

    this.cardNumberInput = page.getByTestId('credit_card_number');
    this.expirationDateInput = page.getByTestId('expiration_date');
    this.cvvInput = page.getByTestId('cvv');
    this.cardHolderNameInput = page.getByTestId('card_holder_name');

    // Confirm button
    this.confirmButton = page.getByTestId('finish');

    // Green alert text: "Payment was successful"
    this.paymentSuccessAlert = page.getByText(/payment was successful/i);
  }

  async expectOpened(): Promise<void> {
    await expect(this.paymentMethodSelect).toBeVisible();
    await expect(this.confirmButton).toBeVisible();
  }

  async selectCreditCard(): Promise<void> {
    await this.paymentMethodSelect.selectOption({ label: 'Credit Card' });
  }

  async payByCreditCard(data: CreditCardData): Promise<void> {
    await this.selectCreditCard();

    await this.cardNumberInput.fill(data.cardNumber);
    await this.expirationDateInput.fill(data.expiration);
    await this.cvvInput.fill(data.cvv);
    await this.cardHolderNameInput.fill(data.holder);

    await this.confirmButton.click();
  }

  async expectPaymentSuccess(): Promise<void> {
    await expect(this.paymentSuccessAlert).toBeVisible();
  }

  // Helper: +3 months from now, format MM/YYYY (required by UI)
  expirationPlus3Months(): string {
    const d = new Date();
    d.setMonth(d.getMonth() + 3);

    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = String(d.getFullYear());

    return `${mm}/${yyyy}`; // MM/YYYY ✅
  }
}
