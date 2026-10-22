import { test } from '@playwright/test';
import { CategoriesPage } from '../page-object/BO/categories-page';

test('@setup', async ({ page }) => {
  await page.goto('http://localhost:8000/admin-dev/');

  await page.locator('#subtab-AdminCatalog').click();
  await page.locator('#subtab-AdminCategories').click();
  const categoryPage = new CategoriesPage(page);
  categoryPage.isPageLoaded();
});
