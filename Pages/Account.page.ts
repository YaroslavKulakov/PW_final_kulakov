import { Page, Locator, expect } from '@playwright/test';
import { HeaderFragment } from './header.fragment';

export class AccountPage {
  page: Page;
  header: HeaderFragment;

  usernameLabel: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = new HeaderFragment(page);

    this.usernameLabel = page.locator('[data-test="nav-menu"]');
  }

  async expectUserLoggedIn(name: string) {
    await expect(this.usernameLabel).toHaveText(name);
  }
}
