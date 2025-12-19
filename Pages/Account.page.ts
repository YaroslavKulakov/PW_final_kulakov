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
    const userElement = this.page.getByRole('button', { name });
    await expect(userElement).toBeVisible();

  }
}