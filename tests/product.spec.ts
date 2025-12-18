import { test, expect } from '@playwright/test';
import { HomePage } from '../Pages/Home.page';

test('Verify user can view product details', async ({ page }) => {
    const homePage = new HomePage(page);

    // Open homepage: https://practicesoftwaretesting.com .
    await homePage.goto();

    // Click on the product "Combination Pliers".
    await page.locator('[data-test="product-name"]:text("Combination Pliers")').click();

    // Verify URL contains https://practicesoftwaretesting.com/product
    await expect(page).toHaveURL(/https:\/\/practicesoftwaretesting\.com\/product/);

    // Verify product name is "Combination Pliers".
    await expect(page.locator('[data-test="product-name"]')).toHaveText('Combination Pliers');

    // Verify product price is 14.15.
    await expect(page.locator('[data-test="unit-price"]')).toHaveText('14.15');

    // Verify "Add to Cart" button is visible.
    await expect(page.locator('[data-test="add-to-cart"]')).toBeVisible();

    // Verify "Add to Favorites" button is visible.
    await expect(page.locator('[data-test="add-to-favorites"]')).toBeVisible();
});