import { test, expect } from './fixtures';
import {
  getSortedNumbers,
  getSortedStrings,
  isSortedNumbers,
  isSortedStrings,
  type SortDirection,
} from './utils/sort';

test.describe('Sorting products', () => {
  test.describe('Verify user can perform sorting by name (asc & desc)', () => {
    const sortOptions: ReadonlyArray<{ label: string; direction: SortDirection }> = [
      { label: 'Name (A - Z)', direction: 'asc' },
      { label: 'Name (Z - A)', direction: 'desc' },
    ];

    for (const { label, direction } of sortOptions) {
      test(`Verify user can sort products by ${label}`, async ({ app }) => {
        await app.homePage.goto();
        await app.homePage.selectSortOption(label);

        // Wait until names are sorted as expected
        await expect
          .poll(async () => {
            const names = await app.homePage.getProductNames();
            return isSortedStrings(names, direction);
          }, { timeout: 5000 })
          .toBe(true);

        const actualNames = await app.homePage.getProductNames();
        const expectedNames = getSortedStrings(actualNames, direction);

        const normalizedActual = actualNames
          .map(s => s.replace(/\s+/g, ' ').trim())
          .filter(Boolean);

        expect(normalizedActual).toEqual(expectedNames);
      });
    }
  });

  test.describe('Verify user can perform sorting by price (asc & desc)', () => {
    const sortOptions: ReadonlyArray<{ label: string; direction: SortDirection }> = [
      { label: 'Price (Low - High)', direction: 'asc' },
      { label: 'Price (High - Low)', direction: 'desc' },
    ];

    for (const { label, direction } of sortOptions) {
      test(`Verify user can sort products by ${label}`, async ({ app }) => {
        await app.homePage.goto();
        await app.homePage.selectSortOption(label);

        // Wait until prices are sorted as expected
        await expect
          .poll(async () => {
            const prices = await app.homePage.getProductPrices();
            return isSortedNumbers(prices, direction);
          }, { timeout: 5000 })
          .toBe(true);

        const actualPrices = await app.homePage.getProductPrices();
        const expectedPrices = getSortedNumbers(actualPrices, direction);

        expect(actualPrices).toEqual(expectedPrices);
      });
    }
  });
});
