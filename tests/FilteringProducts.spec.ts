import { test } from '@playwright/test';
import { HomePage } from '../Pages/Home.page';

const authFile = 'playwright/.auth/user.json';
test.use({ storageState: authFile });

// Hand Tools
export enum HandToolsCategory {
  HAMMER = 'Hammer',
  HAND_SAW = 'Hand Saw',
  WRENCH = 'Wrench',
  SCREWDRIVER = 'Screwdriver',
  PLIERS = 'Pliers',
  CHISELS = 'Chisels',
  MEASURES = 'Measures',
}

// Power Tools
export enum PowerToolsCategory {
  GRINDER = 'Grinder',
  SANDER = 'Sander',
  SAW = 'Saw',
  DRILL = 'Drill',
}

// Other
export enum OtherCategory {
  TOOL_BELTS = 'Tool Belts',
  STORAGE_SOLUTIONS = 'Storage Solutions',
  WORKBENCH = 'Workbench',
  SAFETY_GEAR = 'Safety Gear',
  FASTENERS = 'Fasteners',
}

test.describe('Verify user can filter products by category', () => {
  // eslint-disable-next-line playwright/expect-expect
  test('Verify user can filter products by category: Sander', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.goto();
    await homePage.filterByCategory(PowerToolsCategory.SANDER);
    await homePage.expectAllProductNamesContain(PowerToolsCategory.SANDER);
  });
});
