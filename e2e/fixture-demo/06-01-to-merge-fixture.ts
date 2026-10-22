import { test as base } from '@playwright/test';
import LoginPage from '../page-object/BO/login-page';

export type MyFixture = {
  navigateTo: string;
};

export const toMergeFixture1 = base.extend<MyFixture>({
  navigateTo: async ({ page }, use) => {
    await page.goto('localhost:8000/admin-dev');
    const loginPage = new LoginPage(page);
    loginPage.login('admin@prestashop.com', 'prestashop');

    await page.locator('#subtab-AdminCatalog').click();
    await page.locator('#subtab-AdminCategories').click();

    await use('');
  },
});
