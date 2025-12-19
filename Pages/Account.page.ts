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
    const userElement = this.page.locator('[data-test="nav-menu"]');
  await expect(userElement).toContainText(name);

  }
}