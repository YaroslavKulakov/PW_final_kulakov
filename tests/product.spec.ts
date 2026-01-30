import { test, expect } from './fixtures';

test('@regression Verify user can view product details', async ({ app }) => {
  const productName = 'Combination Pliers';
  const expectedPrice = '14.15';

  await app.homePage.goToHomePage();

  // Open PDP from Home
  await app.homePage.openProductByName(productName);

  await expect(app.productPage.page).toHaveURL(/product/);

  // assertions on ProductPage
  await app.productPage.expectOpened();
  await app.productPage.expectName(productName);
  await app.productPage.expectPrice(expectedPrice);
  await app.productPage.expectButtonsVisible();
});

test('@regression Verify user can add product to cart', async ({ app }) => {
  const productName = 'Slip Joint Pliers';
  const expectedPrice = '9.17';

  await app.homePage.goToHomePage();

  // Open PDP
  await app.homePage.openProductByName(productName);

  // PDP assertions
  await app.productPage.expectOpened();
  await app.productPage.expectName(productName);
  await app.productPage.expectPrice(expectedPrice);

  // Add to cart
  await app.productPage.addToCart();

  // Alert
  const alertMessage = app.page.getByRole('alert');
  await expect(alertMessage).toBeVisible();
  await expect(alertMessage).toHaveText('Product added to shopping cart.');
  await expect(alertMessage).toBeHidden({ timeout: 8000 });

  // Cart quantity in header
  await app.homePage.header.expectCartQuantity('1');

  // Open cart via header
  await app.homePage.header.openCart();

  // Cart page assertions
  await app.cartPage.expectOpened();
  await expect(app.cartPage.quantityInput).toHaveValue('1');
  await expect(app.cartPage.productTitle).toHaveText(productName);
  await expect(app.cartPage.productPrice).toHaveText(`$${expectedPrice}`);

  // Proceed button visible
  await expect(app.cartPage.proceedToCheckoutButton).toBeVisible();
});
