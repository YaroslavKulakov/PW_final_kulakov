import type { Page } from '@playwright/test';

import { HomePage } from './Home.page';
import { LoginPage } from './Login.page';
import { AccountPage } from './Account.page';
import { CartPage } from './Cart.page';
import { BillingAddressPage } from './BillingAddress.page';
import { PaymentPage } from './Payment.page';
import { ProductPage } from './Product.page';

export class App {
  readonly page: Page;

  readonly homePage: HomePage;
  readonly loginPage: LoginPage;
  readonly accountPage: AccountPage;

  readonly productPage: ProductPage;
  readonly cartPage: CartPage;
  readonly billingAddressPage: BillingAddressPage;
  readonly paymentPage: PaymentPage;

  constructor(page: Page) {
    this.page = page;

    // Core
    this.homePage = new HomePage(page);
    this.loginPage = new LoginPage(page);
    this.accountPage = new AccountPage(page);

    // Checkout flow
    this.productPage = new ProductPage(page);
    this.cartPage = new CartPage(page);
    this.billingAddressPage = new BillingAddressPage(page);
    this.paymentPage = new PaymentPage(page);
  }
}
