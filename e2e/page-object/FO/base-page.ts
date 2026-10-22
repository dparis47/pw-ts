import { expect, Page } from '@playwright/test';

export abstract class BasePage {
  constructor(readonly page: Page) {
    this.page = page;
  }

  async checkStepTitle(title: string) {
    await expect(this.page.getByRole('heading', { name: title })).toBeVisible();
  }
}
