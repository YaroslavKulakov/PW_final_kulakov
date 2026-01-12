import { test, expect } from './fixtures';
import {
  getSortedNumbers,
  getSortedStrings,
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

        await expect
          .poll(async () => {
            const actualNames = await app.homePage.getProductNames();
            const expectedNames = getSortedStrings(actualNames, direction);
            return { actualNames, expectedNames };
          }, { timeout: 5000 })
          .toEqual(expect.objectContaining({
            actualNames: expect.any(Array),
            expectedNames: expect.any(Array),
          }));

        const actualNames = await app.homePage.getProductNames();
        const expectedNames = getSortedStrings(actualNames, direction);

        expect(actualNames).toEqual(expectedNames);
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

        await expect
          .poll(async () => {
            const actualPrices = await app.homePage.getProductPrices();
            const expectedPrices = getSortedNumbers(actualPrices, direction);
            return { actualPrices, expectedPrices };
          }, { timeout: 5000 })
          .toEqual(expect.objectContaining({
            actualPrices: expect.any(Array),
            expectedPrices: expect.any(Array),
          }));

        const actualPrices = await app.homePage.getProductPrices();
        const expectedPrices = getSortedNumbers(actualPrices, direction);

        expect(actualPrices).toEqual(expectedPrices);
      });
    }
  });
});
