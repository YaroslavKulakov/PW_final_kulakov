import { test, expect } from './fixtures';

test('Verify 20 products are displayed per page by default', { tag: '@smoke' }, async ({ loggedInApp }) => {
  await loggedInApp.homePage.mockProducts(20);
  await loggedInApp.homePage.goToHomePage();

  const products = loggedInApp.homePage.itemCardLocator;

  await expect(
    products,
    'Number of products displayed is incorrect',
  ).toHaveCount(20);
});