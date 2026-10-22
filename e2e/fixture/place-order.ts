import { test as base } from '@playwright/test';
import { addProductsPOM } from '../common-test/product';
import { PageManager } from '../page-object/FO/page-manager';
import { Product } from '../type/product';

export type MyFixture = {
  products: { arr: Product[] };
  addToCart: string;
  pm: PageManager;
};

export const placeOrder = base.extend<MyFixture>({
  products: { arr: [] },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addToCart: async ({ page, products }, use) => {
    await page.goto('localhost:8000');

    const pm = new PageManager(page);
    console.log(products.arr.length);
    await addProductsPOM(pm, products.arr);
    await pm.fromProductAddedModalPage().proceedToCheckOut();
    await use('');
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  pm: async ({ page, addToCart }, use) => {
    const pm = new PageManager(page);
    await use(pm);
  },
});
