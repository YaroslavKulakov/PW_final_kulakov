import { test, expect } from '@playwright/test';


   //Створення Category enums


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


// Тест: Фільтрація продуктів за категорією
test.describe('Verify user can filter products by category', () => {
  test('Verify user can filter products by category: Sander', async ({ page }) => {
    // Open homepage (через baseURL)
    await page.goto('/');

    // вибираємо категорію "Sander" in Power Tools category
    await page.getByLabel(PowerToolsCategory.SANDER).check();

    const productNames = page.locator('[data-test="product-name"]');

    // чекаємо перший продукт з назвою, що містить "Sander", щоб переконатися, що фільтр застосовано
    await expect(productNames.filter({ hasText: 'Sander' }).first()).toBeVisible();

    // Отримуємо всі назви продуктів, що відображаються після фільтрації
    const productNamesText = await productNames.allInnerTexts();

    // Перевіряємо, що всі назви продуктів містять "Sander"
    for (const name of productNamesText) {
      expect(name).toContain('Sander');
    }
  });
});
