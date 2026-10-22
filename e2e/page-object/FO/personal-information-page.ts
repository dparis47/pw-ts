import { Page } from '@playwright/test';
import { User } from '../../type/user';
import { BasePage } from './base-page';

export class PersonalInformationPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async signIn(user: User) {
    await this.page.locator('[href="#checkout-login-form"]').click();

    await this.page.locator('#login-form #field-email').fill(user.email);
    await this.page.locator('#login-form #field-password').fill(user.password);

    await this.page.locator('[data-link-action="sign-in"]').click();
  }
}
