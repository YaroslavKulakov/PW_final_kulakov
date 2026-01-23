import { test, expect } from './fixtures';
import { Categories } from './utils/categories';

test('Verify user can filter products by category: Sander', async ({ app }) => {
  await app.homePage.goToHomePage();

  const category = Categories.PowerTools.SANDER;
  await app.homePage.filterByCategory(category);

  await app.homePage.expectAllProductNamesContain(category);

  await expect(app.homePage.productNames.first()).toBeVisible();
});
