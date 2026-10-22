import { expect, test } from '@playwright/test';

//https://forge.prestashop.com/browse/TEST-1314
test('@locator-in-test', async ({ page }) => {
  await test.step('1- Go to FO', async () => {
    await page.goto('localhost:8000');
    //Expected: The page of your shop should be displayed
  });

  const productLocator = page.locator('article', {
    has: page.getByText("The best is yet to come'..."),
  });
  //START HOME PAGE: click product
  await test.step('2- Put your mouse over the product "The best is Yet to Come"', async () => {
    //Expected: The button "Quickview" should be displayed

    await productLocator.hover();

    const quickView = productLocator.getByText('Quick view', { exact: false });
    quickView.waitFor({ state: 'visible', timeout: 3_000 });
    await expect(
      productLocator.getByText('Quick view', { exact: false }),
    ).toBeEnabled();
  });

  await test.step('3- Click on the "Quickview" button', async () => {
    //Expected: You should have a modal that show you the product.

    await productLocator.getByText('Quick view', { exact: false }).click();
    await expect(
      page.getByRole('heading', {
        name: "The best is yet to come' Framed poster",
      }),
    ).toBeVisible();
  });
  // END HOME PAGE

  // START PRODUCT MODAL: feature ? oui => fonction dans le page objet qui correspond
  await test.step('4- Click on the Upper arrow next to the number of quantity', async () => {
    //Expected : The quantity number should be "2"

    await page.locator('.touchspin-up').click();
    await expect(page.locator('#quantity_wanted')).toHaveValue('2');
  });

  await test.step('5- Click on Add to cart', async () => {
    //Expected: You should have a modal with "Product successfully added to your shopping cart"

    await page
      .getByRole('button', { exact: false, name: 'Add to cart' })
      .click();
    await expect(
      page.getByRole('heading', {
        name: 'Product successfully added to your shopping cart',
      }),
    ).toBeVisible();
  });
  // END PRODUCT MODAL

  await test.step('6- Click outside the modal', async () => {
    //Expected: The modal should be hidden

    await page
      .locator('.modal-content', {
        has: page.getByText('Product successfully added to your shopping cart'),
      })
      .click({ force: true, position: { x: -20, y: 40 } });
    await expect(
      page.locator('.modal-content', {
        has: page.getByRole('heading', {
          name: 'Product successfully added to your shopping cart',
        }),
      }),
    ).toBeHidden({ timeout: 2_000 });
  });

  const productLocator2 = page.locator('article', {
    has: page.getByText('The adventure begins Framed...'),
  });

  await test.step('7- Put your mouse over the product "The Adventure Begins Framed"', async () => {
    //Expected: The button "Quickview" should be displayed

    await productLocator2.hover();
    await expect(
      productLocator2.getByText('Quick view', { exact: false }),
    ).toBeEnabled();
  });

  await test.step('8- Click on the "Quickview" button', async () => {
    //Expected: You should have a modal that show you the product.
    await productLocator2.getByText('Quick view', { exact: false }).click();
    await expect(
      page.getByRole('heading', { name: 'The adventure begins Framed poster' }),
    ).toBeVisible();
  });

  await test.step('9- Click on Add to cart', async () => {
    //Expected: You should have a modal with "Product successfully added to your shopping cart"
    await page
      .getByRole('button', { exact: false, name: 'Add to cart' })
      .click();
    await expect(
      page.getByRole('heading', {
        name: 'Product successfully added to your shopping cart',
      }),
    ).toBeVisible();
  });

  await test.step('10- Click on "Proceed to checkout"', async () => {
    //Expected: You should have your shopping cart displayed with all your product on it
    await page.getByRole('link', { name: 'Proceed to checkout' }).click();
    const cartLocator = page.locator('.cart-item', {
      hasText: "The best is yet to come' Framed poster",
    });
    //const cartLocator= page.locator(".cart-item").filter({hasText:"The best is yet to come' Framed poster"});
    await expect(
      cartLocator.locator('.js-cart-line-product-quantity'),
    ).toHaveValue('2', { timeout: 2_000 });
    await expect(
      page.getByRole('heading', { name: 'Shopping Cart' }),
    ).toBeVisible();
  });

  await test.step('11- Click on "Proceed to checkout"', async () => {
    //Expected: You should be on "Personal information" Tab
    await page
      .getByRole('link', { exact: false, name: 'Proceed to checkout' })
      .click();
    await expect(
      page.getByRole('heading', { name: 'Personal information' }),
    ).toBeVisible();
  });

  await test.step('12- Sign in', async () => {
    // Step:Click on Sign in
    // Set up your Email and Passwor
    // Click on "continue"

    //Expected: You should be redirect to Addresses tab

    await page.locator('[href*="#checkout-login-form"]').click();

    await page.locator('#login-form #field-email').fill('pub@prestashop.com');
    await page.locator('#login-form #field-password').fill('123456789');

    await page.locator('[data-link-action="sign-in"]').click();

    await expect(
      page.getByRole('heading', { name: 'Addresses' }),
    ).toBeVisible();
  });

  await test.step('13- Click on "Continue"', async () => {
    //Expected: You should be redirect to "Shipping method" tab

    await page.locator('[name="confirm-addresses"]').click();

    await expect(
      page.getByRole('heading', { name: 'Shipping method' }),
    ).toBeVisible();
  });

  await test.step('14- Click on "Continue"', async () => {
    //Expected: You should be redirect to "Payment" tab

    await page
      .locator('[name="confirmDeliveryOption"]')
      .click({ timeout: 5_000 });

    await expect(page.getByRole('heading', { name: 'Payment' })).toBeVisible();
  });

  const placeOrderButton = page.getByRole('button', { name: 'Place Order' });

  await test.step('15- Pay by Check', async () => {
    //Step: Click on "Pay by Check"
    // Click on the checkbox "I agree to the terms of service [...]"

    //Expected:  The detail about the adress and the payee should be displayed
    // The box should be checked and the button "Place Order" should be enabled
    await expect(placeOrderButton).not.toBeEnabled();
    await expect(placeOrderButton).toBeVisible();

    const paymentMethodRadio = page
      .getByRole('radio')
      .and(page.locator('[data-module-name="ps_checkpayment"]'));
    await paymentMethodRadio.check();
    await expect(paymentMethodRadio).toBeChecked();

    const paymentOptionLocator = page.locator('.payment-option', {
      has: paymentMethodRadio,
    });
    const paymentAdditionalInfoLocator = page
      .locator('div', { has: paymentOptionLocator })
      .locator('.additional-information');
    await expect(
      paymentAdditionalInfoLocator.locator('p', {
        hasText: 'Please send us your check including the following details:',
      }),
    ).toBeVisible();

    //    const termsConditions = page.locator('#conditions_to_approve[terms-and-conditions]');
    //     const termsConditions = page.getByRole('checkbox').filter({has: page.locator('[id="conditions_to_approve[terms-and-conditions]"]')});
    const termsConditions = page
      .locator('#conditions-to-approve')
      .getByRole('checkbox');
    await termsConditions.check();
    await expect(termsConditions).toBeChecked();

    await expect(placeOrderButton).toBeEnabled();
    await expect(placeOrderButton).toBeVisible();
  });

  await test.step('16- Click on "Place Order"', async () => {
    //Expected: You should have a new page displayed named "Order confirmation" with :

    // "Order Items" with the different product image under, their name and their Combination
    // The "Unit Price" where is the price of the product, it should be "£34,80"
    // The "Quantity" where is the number of product, for the first one, it should be "2" and the second, "1"
    // The "Total Products" where is the multiplication of the Unit price and the quantity, it should be "£69,60" for the first one and "£34,80" for the second one
    await placeOrderButton.click({ timeout: 5_000 });

    await page
      .locator('#order-items')
      .waitFor({ state: 'attached', timeout: 10_000 });

    expect(await page.title()).toEqual('Order confirmation');

    //Product 'The best is yet to come' Framed poster' (quantity=2)
    const rowProduct1 = page.locator('.order-line', {
      has: page.locator('.details', {
        hasText: "The best is yet to come' Framed poster",
      }),
    });
    //unit price selector: .qty .text-xs-left
    await expect(
      rowProduct1.locator('.qty').locator('.text-xs-left'),
    ).toHaveText('€29.00');
    //quantity selector: .qty .text-sm-center
    await expect(
      rowProduct1
        .locator('.qty')
        .locator('.text-sm-center:not(.text-xs-left):not(.text-xs-right)'),
    ).toHaveText('2');
    //total products selector: .qty .text-xs-right
    await expect(
      rowProduct1.locator('.qty').locator('.text-xs-right'),
    ).toHaveText('€58.00');

    //Product 'The adventure begins Framed poster' (quantity=1)
    const rowProduct2 = page.locator('.order-line', {
      has: page.locator('.details', {
        hasText: 'The adventure begins Framed poster',
      }),
    });
    //unit price selector: .qty .text-xs-left
    await expect(
      rowProduct2.locator('.qty').locator('.text-xs-left'),
    ).toHaveText('€29.00');
    //quantity selector: .qty .text-sm-center
    await expect(
      rowProduct2
        .locator('.qty')
        .locator('.text-sm-center:not(.text-xs-left):not(.text-xs-right)'),
    ).toHaveText('1');
    //total products selector: .qty .text-xs-right
    await expect(
      rowProduct2.locator('.qty').locator('.text-xs-right'),
    ).toHaveText('€29.00');
  });
});
