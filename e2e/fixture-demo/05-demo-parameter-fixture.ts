import { test as base } from '@playwright/test';
import LoginPage from '../page-object/BO/login-page';
import { PageManager } from '../page-object/BO/page-manager';
import { User } from '../type/user';

export type MyFixture = {
  myUser: User;
  navigateTo: string;
  pageManager: PageManager;
};

export const withParamFixture = base.extend<MyFixture>({
  myUser: { email: '', password: '' },
  navigateTo: async ({ page, myUser }, use) => {
    await page.goto('localhost:8000/admin-dev');
    const loginPage = new LoginPage(page);
    loginPage.login(myUser.email, myUser.password);

    await page.locator('#subtab-AdminCatalog').click();
    await page.locator('#subtab-AdminCategories').click();

    await use('');
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  pageManager: async ({ page, navigateTo }, use) => {
    const pm = new PageManager(page);
    use(pm);
  },
});
