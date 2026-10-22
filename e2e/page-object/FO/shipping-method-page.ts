import { Page } from '@playwright/test';
import { BasePage } from './base-page';

export class ShippingMethodPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async continue() {
    await this.page
      .locator('[name="confirmDeliveryOption"]')
      .click({ timeout: 5_000 });
  }
}
