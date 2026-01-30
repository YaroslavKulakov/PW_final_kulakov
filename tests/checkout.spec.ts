import { test, expect } from './fixtures';
import { dummyPaymentCardData } from './utils/paymentData';

test('@smoke Logged-in user can checkout with credit card', async ({ loggedInApp }) => {
  await loggedInApp.homePage.goToHomePage();

  const name = await loggedInApp.homePage.getFirstProductName();
  const price = await loggedInApp.homePage.getFirstProductPriceText();

  await loggedInApp.homePage.openFirstProduct();

  await loggedInApp.productPage.expectOpened();
  await loggedInApp.productPage.addToCart();

  await loggedInApp.homePage.header.openCart();
  await loggedInApp.cartPage.expectOpened();

  await expect(loggedInApp.cartPage.productTitle).toHaveText(name);
  await expect(loggedInApp.cartPage.productPrice).toHaveText(price);
  await expect(loggedInApp.cartPage.cartTotal).toHaveText(price);

  await loggedInApp.cartPage.proceedToCheckout();

  await expect(loggedInApp.page.getByText(/Hello Jane Doe/i)).toBeVisible();
  await loggedInApp.page.getByTestId('proceed-2').click();

  await loggedInApp.billingAddressPage.expectOpened();
  await loggedInApp.billingAddressPage.fillMissingFields();
  await loggedInApp.billingAddressPage.proceed();

  await loggedInApp.paymentPage.expectOpened();
  await loggedInApp.paymentPage.payByCreditCard(dummyPaymentCardData);

  await loggedInApp.paymentPage.expectPaymentSuccess();
});
