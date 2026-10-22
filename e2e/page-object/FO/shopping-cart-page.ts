import { expect, Page } from '@playwright/test';
import { Product } from '../../type/product';

export class ShoppingCartPage {
  constructor(readonly page: Page) {}

  async checkShoppingCartProduct(product: Product) {
    await expect(
      this.page.getByRole('heading', { name: 'Shopping Cart' }),
    ).toBeVisible();

    const cartLocator = this.page.locator('.cart-item', {
      hasText: product.name,
    });
    //const cartLocator= page.locator(".cart-item").filter({hasText:"The best is yet to come' Framed poster"});
    await expect(
      cartLocator.locator('.js-cart-line-product-quantity'),
    ).toHaveValue(product.quantity.toString(), { timeout: 2_000 });

    /** TODO check other fields */
  }

  async proceedToCheckout() {
    await this.page
      .getByRole('link', { exact: false, name: 'Proceed to checkout' })
      .click();
  }
}
