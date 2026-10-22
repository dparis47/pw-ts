import { Page } from '@playwright/test';
import { CategoriesPage } from './categories-page';
import LoginPage from './login-page';

export class PageManager {
  constructor(readonly page: Page) {}

  onLoginPage() {
    return new LoginPage(this.page);
  }

  fromCategoriesPage(): CategoriesPage {
    return new CategoriesPage(this.page);
  }
}
