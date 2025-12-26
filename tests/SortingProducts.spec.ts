import { test, expect } from '@playwright/test';
import { HomePage } from '../Pages/Home.page';
import { getSortedNumbers, getSortedStrings, type SortDirection } from './utils/sort';

const authFile = 'playwright/.auth/user.json';
test.use({ storageState: authFile });

test.describe('Sorting products', () => {
  test.describe('Verify user can perform sorting by name (asc & desc)', () => {
    const sortOptions: ReadonlyArray<{ label: string; direction: SortDirection }> = [
      { label: 'Name (A - Z)', direction: 'asc' },
      { label: 'Name (Z - A)', direction: 'desc' },
    ];

    for (const { label, direction } of sortOptions) {
      test(`Verify user can sort products by ${label}`, async ({ page }) => {
        const homePage = new HomePage(page);

        await homePage.goto();
        await homePage.selectSortOption(label);

        const actualNames = await homePage.getProductNames();
        const expectedNames = getSortedStrings(actualNames, direction);

        // також нормалізуємо actual, бо expected вже нормалізований
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
      test(`Verify user can sort products by ${label}`, async ({ page }) => {
        const homePage = new HomePage(page);

        await homePage.goto();
        await homePage.selectSortOption(label);

        const actualPrices = await homePage.getProductPrices();

        const expectedPrices = getSortedNumbers(actualPrices, direction);

        expect(actualPrices).toEqual(expectedPrices);
      });
    }
  });
});
