import { test } from './fixtures';
import { Categories } from './utils/categories';

test.describe('Verify user can filter products by category', () => {
  test('Verify user can filter products by category: Sander', async ({ app }) => {
    await app.homePage.goto();

    const category = Categories.PowerTools.SANDER;

    await app.homePage.filterByCategory(category);

    await app.homePage.expectAllProductNamesContain(category);
  });
});
