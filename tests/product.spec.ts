import { test, expect } from '@playwright/test';
import { HomePage } from '../Pages/Home.page';

const authFile = 'playwright/.auth/user.json';
test.use({ storageState: authFile });

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


test('Verify user can add product to cart', async ({ page }) => {
    const productName = 'Slip Joint Pliers';
    const homePage = new HomePage(page);
    // 1. Open homepage
    await homePage.goto();

    // 2. Click on the product "Slip Joint Pliers"
    await page.locator('[data-test="product-name"]').filter({ hasText: productName }).click();

    // 2.1 Verify URL contains https://practicesoftwaretesting.com/product.
    await expect(page).toHaveURL(/\/product/);

    // 2.2 Product name is "Slip Joint Pliers"
    await expect(page.locator('[data-test="product-name"]')).toHaveText(
        productName
    );

    // 2.3 Product price is 9.17
    await expect(page.locator('[data-test="unit-price"]')).toHaveText('9.17');

    // 3. Click "Add to Cart" button
    await page.locator('[data-test="add-to-cart"]').click();

    // 3.1 Verify alert message is visible.
    const alertMessage = page.getByRole('alert');
    await expect(alertMessage).toBeVisible();

    // 3.2 Verify alert message text is "Product added to shopping cart".
    await expect(alertMessage).toHaveText('Product added to shopping cart.');

    // 3.3 Verify alert disappears in 8 seconds.
    await expect(alertMessage).toBeHidden({ timeout: 8000 });

    // 3.4 Verify cart icon in navigation shows quantity = 1.
    await expect(page.locator('[data-test="cart-quantity"]')).toHaveText('1');

    // 4. Click on the cart icon in the navigation.
    await page.locator('[data-test="nav-cart"]').click();

    // 4.1 Verify URL is https://practicesoftwaretesting.com/checkout.
    await expect(page).toHaveURL('https://practicesoftwaretesting.com/checkout');

    // 4.2 Verify the number of products in the cart table equals 1.
    await expect(page.locator('[data-test="product-quantity"]')).toHaveValue('1');

    // 4.3 Verify product title in the cart is "Slip Joint Pliers".
    await expect(page.locator('[data-test="product-title"]')).toHaveText(productName);

    // 4.4 Verify "Proceed to Checkout" button is visible.
    await expect(page.getByRole('button', { name: 'Proceed to checkout' })).toBeVisible();
});