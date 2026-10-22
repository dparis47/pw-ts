import { expect, Page } from '@playwright/test';

export class CategoriesPage {
  constructor(readonly page: Page) {
    this.page = page;
  }

  async goToCAtegoriesPage() {
    await this.page.locator('#subtab-AdminCatalog').click();
    await this.page
      .locator('#subtab-AdminCategories')
      .click({ timeout: 5_000 });
  }
  async isPageLoaded() {
    await expect(
      this.page.locator('#page-header-desc-configuration-add'),
    ).toBeEnabled();
  }
}
