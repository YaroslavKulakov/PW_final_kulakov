import { test, expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';
test.use({ storageState: authFile });

// Сортування продуктів за імʼям (asc & desc)
test.describe('Verify user can perform sorting by name (asc & desc)', () => {
  // Створюю набір параметрів для сортування за імʼям
  const sortOptions = [
    { label: 'Name (A - Z)', direction: 'asc' as const },
    { label: 'Name (Z - A)', direction: 'desc' as const },
  ];

  for (const { label, direction } of sortOptions) {
    test(`Verify user can sort products by ${label}`, async ({ page }) => {
      // 1. Open homepage (через baseURL)
      await page.goto('/');

      // 2. Обрати сортування
      await page.locator('[data-test="sort"]').selectOption({ label });

      const productNameLocator = page.locator('[data-test="product-name"]');

      // 3. Дочекатися, поки хоч один продукт зʼявиться
      await expect(productNameLocator.first()).toBeVisible();

      // 4. Зібрати всі назви
      const productNames = await productNameLocator.allInnerTexts();

      // 5. Побудувати очікуваний відсортований масив
      const expected = [...productNames].sort((a, b) => a.localeCompare(b));
      if (direction === 'desc') {
        expected.reverse();
      }

      // 6. Порівняти фактичний порядок з очікуваним
      expect(productNames).toEqual(expected);
    });
  }
});


// Сортування продуктів за ціною (asc & desc)
test.describe('Verify user can perform sorting by price (asc & desc)', () => {
  // Набір параметрів для сортування за ціною
  const sortOptions = [
    { label: 'Price (Low - High)', direction: 'asc' as const },
    { label: 'Price (High - Low)', direction: 'desc' as const },
  ];

  // Парсинг ціни "$9.17" → 9.17
  const parsePrice = (t: string) => Number(t.replace(/[^0-9.]/g, ''));

  for (const { label, direction } of sortOptions) {
    test(`Verify user can sort products by ${label}`, async ({ page }) => {
      // 1. Open homepage (через baseURL)
      await page.goto('/');

      // 2. Обрати сортування
      await page.locator('[data-test="sort"]').selectOption({ label });

      // 3. Почекати, поки хоч одна ціна зʼявиться
      const priceLocator = page.locator('[data-test="product-price"]');
      await expect(priceLocator.first()).toBeVisible();

      // 4. Зібрати всі ціни
      const priceTexts = await priceLocator.allInnerTexts();
      const prices = priceTexts.map(parsePrice);

      // 5. Побудувати очікуваний відсортований масив
      const expected = [...prices].sort((a, b) => a - b);
      if (direction === 'desc') {
        expected.reverse();
      }

      // 6. Порівняти фактичний порядок з очікуваним
      expect(prices).toEqual(expected);
    });
  }
});
