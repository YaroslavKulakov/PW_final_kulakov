import { Page, expect } from '@playwright/test';
import { HeaderFragment } from './header.fragment';

export class AccountPage {
  page: Page;
  header: HeaderFragment;

  constructor(page: Page) {
    this.page = page;
    this.header = new HeaderFragment(page);
  }

  async expectUserLoggedIn(name: string) {
    // Find the user menu / button by accessible role + name (e.g. "Jane Doe")
    const user = this.page.getByRole('button', { name });

    // Wait for it to be visible (give more time on CI to avoid flakiness)
    await expect(user).toBeVisible({ timeout: 60_000 });

    // Optionally also assert the visible text contains the name
    await expect(user).toHaveText(name, { timeout: 5_000 });
  }
}