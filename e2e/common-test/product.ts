import { expect, Page } from '@playwright/test';
import { PageManager } from '../page-object/FO/page-manager';
import { Product } from '../type/product';

export const addProductsPOM = async (pm: PageManager, products: Product[]) => {
  let i = 0;
  for (const product of products) {
    await pm.fromHomePage().openProductModal(product);
    await pm.fromProductModalPage().checkModalFields(product);
    await pm.fromProductModalPage().addToCart(product);
    await pm.fromProductAddedModalPage().checkModalFields();

    if (i < products.length - 1) {
      await pm.fromProductAddedModalPage().clickOutsideModal();
    } else {
      await pm.fromProductAddedModalPage().proceedToCheckOut();
    }

    i++;
  }
};

export const addProducts = async (page: Page, products: Product[]) => {
  let i = 0;
  for (const product of products) {
    const productLocator = page.locator('article', {
      has: page.getByText(product.croppedName),
    });

    // Product hover
    await productLocator.hover();
    await expect(
      productLocator.getByText('Quick view', { exact: false }),
    ).toBeEnabled();

    // Click on the "Quickview" button
    await productLocator.getByText('Quick view', { exact: false }).click();
    await expect(
      page.getByRole('heading', { name: product.name }),
    ).toBeVisible();

    // Click on the Upper arrow next to the number of quantity
    if (product.quantity > 1) {
      await page
        .locator('.touchspin-up')
        .click({ clickCount: product.quantity - 1 });
    }
    await expect(page.locator('#quantity_wanted')).toHaveValue(
      product.quantity.toString(),
    );

    // Add to cart
    await page
      .getByRole('button', { exact: false, name: 'Add to cart' })
      .click();
    await expect(
      page.getByRole('heading', {
        name: 'Product successfully added to your shopping cart',
      }),
    ).toBeVisible();

    // Tant que i < products.length (ie ce n'est pas le dernier produuit), on ne click pas sur 'proceed'
    if (i < products.length - 1) {
      await page
        .locator('.modal-content', {
          has: page.getByText(
            'Product successfully added to your shopping cart',
          ),
        })
        .click({ force: true, position: { x: -20, y: 40 } });
      await expect(
        page.locator('.modal-content', {
          has: page.getByRole('heading', {
            name: 'Product successfully added to your shopping cart',
          }),
        }),
      ).toBeHidden({ timeout: 2_000 });
    } else {
      await expect(
        page.getByRole('heading', {
          name: 'Product successfully added to your shopping cart',
        }),
      ).toBeVisible();
    }
    i++;
  }
};
