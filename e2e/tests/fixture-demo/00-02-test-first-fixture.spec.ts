import { test } from '@playwright/test';
import { CategoriesPage } from '../../page-object/BO/categories-page';
import LoginPage from '../../page-object/BO/login-page';

test.describe('todo tests', () => {
  let categoryPage: CategoriesPage;

  test.beforeEach(async ({ page }) => {
    await page.goto('localhost:8000/admin-dev');
    const loginPage = new LoginPage(page);
    loginPage.login('admin@prestasho.com', 'prestashop');

    categoryPage = new CategoriesPage(page);
    categoryPage.goToCAtegoriesPage();
  });

  test.afterEach(async () => {
    //do something
  });

  test('should ...', async () => {
    categoryPage.isPageLoaded();
    // ...
  });
});
