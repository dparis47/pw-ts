import { expect, Locator, Page } from '@playwright/test';
import { Product } from '../../type/product';

export class HomePage {
  page: Page;
  productLocator: (productName: string) => Locator;
  quickViewLocator: (productName: string) => Locator;

  constructor(page: Page) {
    this.page = page;
    this.productLocator = (productName): Locator =>
      page.locator('article', { has: page.getByText(`${productName}`) });
    this.quickViewLocator = (productName): Locator =>
      this.productLocator(productName).getByText('Quick view', {
        exact: false,
      });
  }

  /**
   *
   * @param product
   */
  async openProductModal(product: Product) {
    await this.productLocator(product.croppedName).hover();
    await expect(
      this.productLocator(product.croppedName).getByText('Quick view', {
        exact: false,
      }),
    ).toBeEnabled();
    await this.quickViewLocator(product.croppedName).click();
  }
}
