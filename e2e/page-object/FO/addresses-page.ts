import { Page } from '@playwright/test';
import { BasePage } from './base-page';

export class AddressesPage extends BasePage {
  constructor(readonly page: Page) {
    super(page);
  }

  async continue() {
    await this.page.locator('[name="confirm-addresses"]').click();
  }
}
