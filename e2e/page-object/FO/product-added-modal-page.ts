import { expect, Locator, Page } from '@playwright/test';

export class ProductAddedModalPage {
  private readonly headingProduct: Locator;
  private readonly modalContent: Locator;

  constructor(readonly page: Page) {
    this.headingProduct = this.page.getByRole('heading', {
      name: 'Product successfully added to your shopping cart',
    });
    this.modalContent = this.page.locator('.modal-content', {
      has: this.page.getByRole('heading', {
        name: 'Product successfully added to your shopping cart',
      }),
    });
  }

  async checkModalFields() {
    await expect(this.headingProduct).toBeVisible({ timeout: 5_000 });
  }

  /**
   *
   *  Not procedd to checkout: click outside modal
   */
  async clickOutsideModal() {
    await this.page
      .locator('.modal-content', {
        has: this.page.getByText(
          'Product successfully added to your shopping cart',
        ),
      })
      .click({ force: true, position: { x: -20, y: 40 } });
    await expect(this.modalContent).toBeHidden({ timeout: 5_000 });
  }

  async proceedToCheckOut() {
    await this.page.getByRole('link', { name: 'Proceed to checkout' }).click();
  }
}
