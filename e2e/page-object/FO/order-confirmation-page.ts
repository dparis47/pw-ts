import { expect, Page } from '@playwright/test';
import { Product } from '../../type/product';
import { BasePage } from './base-page';

export class OrderConfirmationPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /**
   *
   * @param products {Product[]} Ordered products
   */
  async checkOrderConfirmed(products: Product[]) {
    await this.page
      .locator('#order-items')
      .waitFor({ state: 'attached', timeout: 10_000 });

    expect(await this.page.title()).toEqual('Order confirmation');

    for (const product of products) {
      //product row
      const rowProduct = this.page.locator('.order-line', {
        has: this.page.locator('.details', {
          hasText: `${product.name}`,
        }),
      });
      //unit price selector: .qty .text-xs-left
      await expect(
        rowProduct.locator('.qty').locator('.text-xs-left'),
      ).toHaveText(`${product.currency}${product.unit_price.toFixed(2)}`);
      //quantity selector: .qty .text-sm-center
      await expect(
        rowProduct
          .locator('.qty')
          .locator('.text-sm-center:not(.text-xs-left):not(.text-xs-right)'),
      ).toHaveText(`${product.quantity}`);
      //total products selector: .qty .text-xs-right
      await expect(
        rowProduct.locator('.qty').locator('.text-xs-right'),
      ).toHaveText(
        `${product.currency}${(product.quantity * product.unit_price).toFixed(2)}`,
      );
    }
  }
}
