import { expect, Page } from '@playwright/test';
import { Product } from '../../type/product';

export class ProductModalPage {
  constructor(readonly page: Page) {
    this.page = page;
  }

  async checkModalFields(product: Product) {
    await expect(
      this.page.getByRole('heading', { name: product.name }),
    ).toBeVisible({ timeout: 2_000 });

    //TODO other fields
  }

  /**
   * Add product to cart
   *
   * @param quantity number of products to add to cart
   */
  async addToCart(product: Product) {
    if (product.quantity > 1) {
      await this.page
        .locator('.touchspin-up')
        .click({ clickCount: product.quantity - 1 });
    }
    await expect(this.page.locator('#quantity_wanted')).toHaveValue(
      product.quantity.toString(),
    );

    await this.page
      .getByRole('button', { exact: false, name: 'Add to cart' })
      .click();
  }
}
