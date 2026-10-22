import { test as setup } from '@playwright/test';
import LoginPage from '../page-object/BO/login-page';

const authFile = '.login/login.json';

setup('@login setup login', async ({ page }) => {
  await page.goto('http://localhost:8000/admin-dev/');
  const loginPage = new LoginPage(page);
  loginPage.login('demo@prestashop.com', 'prestashop');

  console.log('#####', authFile);
  await page.context().storageState({ path: authFile });
});
