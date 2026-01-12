import { test, expect } from './fixtures';

test('Logged-in user can checkout with credit card', async ({ loggedInApp }) => {
  // 1) Home: get first product name + price, open product card
  await loggedInApp.homePage.goto();

  const firstNameEl = loggedInApp.page.getByTestId('product-name').first();
  const firstPriceEl = loggedInApp.page.getByTestId('product-price').first();

  await expect(firstNameEl).toBeVisible();

  const name = (await firstNameEl.innerText()).trim();
  const price = (await firstPriceEl.innerText()).trim();


  // open PDP by clicking the first product name/title
  await firstNameEl.click();

  // 2) Product page: add to cart
  await loggedInApp.productPage.expectOpened();
  await loggedInApp.productPage.addToCart();

  // 3) Open cart (/checkout)
  await loggedInApp.page.getByTestId('nav-cart').click();
  await loggedInApp.cartPage.expectOpened();

  // 4) Cart assertions
  await expect(loggedInApp.cartPage.productTitle).toHaveText(name);
  await expect(loggedInApp.cartPage.productPrice).toHaveText(price);
  await expect(loggedInApp.cartPage.cartTotal).toHaveText(price);

  // 5) Proceed (Cart → Logged-in screen)
  await loggedInApp.cartPage.proceedToCheckout();

  // 6) Logged-in checkout step
  await expect(loggedInApp.page.getByText(/Hello Jane Doe/i)).toBeVisible();
  await loggedInApp.page.getByTestId('proceed-2').click();

  // 7) Billing Address
  await loggedInApp.billingAddressPage.expectOpened();
  await loggedInApp.billingAddressPage.fillMissingFields();
  await loggedInApp.billingAddressPage.proceed();

  // 8) Payment
  await loggedInApp.paymentPage.expectOpened();
  await loggedInApp.paymentPage.payByCreditCard({
    cardNumber: '1111-1111-1111-1111',
    expiration: loggedInApp.paymentPage.expirationPlus3Months(),
    cvv: '111',
    holder: 'Jane Doe',
  });

  // 9) Success
  await loggedInApp.paymentPage.expectPaymentSuccess();
});