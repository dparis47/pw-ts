import { expect, test } from '@playwright/test';
import { addProducts } from '../common-test/product';
import { product1, product2 } from '../data/products';
import { user1 } from '../data/users';

//https://forge.prestashop.com/browse/TEST-1314
test('@common-test', async ({ page }) => {
  await test.step('1- Go to FO', async () => {
    await page.goto('localhost:8000');
    //Expected: The page of your shop should be displayed
  });

  //2- Put your mouse over the product "The best is Yet to Come"
  //   Expected: The button "Quickview" should be displayed
  //3- Click on the "Quickview" button
  //   Expected: You should have a modal that show you the product.
  //4- Click on the Upper arrow next to the number of quantity
  //   Expected : The quantity number should be "2"
  //5- Click on Add to cart
  //   Expected: You should have a modal with "Product successfully added to your shopping cart"
  //6- Click outside the modal
  //   Expected: The modal should be hidden
  //7- Put your mouse over the product "The Adventure Begins Framed"
  //   Expected: The button "Quickview" should be displayed
  //8- Click on the "Quickview" button
  //   Expected: You should have a modal that show you the product.
  //9- Click on Add to cart
  //   Expected: You should have a modal with "Product successfully added to your shopping cart"
  await test.step('2- Add "The adventure begins Framed poster" product to cart ', async () => {
    await addProducts(page, [product1, product2]);
  });

  await test.step('10- Click on "Proceed to checkout"', async () => {
    //Expected: You should have your shopping cart displayed with all your product on it
    await page.getByRole('link', { name: 'Proceed to checkout' }).click();
    const cartLocator = page.locator('.cart-item', {
      hasText: product1.name,
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

    await page.locator('#login-form #field-email').fill(user1.email);
    await page.locator('#login-form #field-password').fill(user1.password);

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

    //Product 1
    const rowProduct1 = page.locator('.order-line', {
      has: page.locator('.details', {
        hasText: product1.name,
      }),
    });
    //unit price selector: .qty .text-xs-left
    await expect(
      rowProduct1.locator('.qty').locator('.text-xs-left'),
    ).toHaveText(`${product1.currency}${product1.unit_price.toFixed(2)}`);
    //quantity selector: .qty .text-sm-center
    await expect(
      rowProduct1
        .locator('.qty')
        .locator('.text-sm-center:not(.text-xs-left):not(.text-xs-right)'),
    ).toHaveText(`${product1.quantity}`);
    //total products selector: .qty .text-xs-right
    await expect(
      rowProduct1.locator('.qty').locator('.text-xs-right'),
    ).toHaveText(
      `${product1.currency}${(product1.unit_price * product1.quantity).toFixed(2)}`,
    );

    //Product 2
    const rowProduct2 = page.locator('.order-line', {
      has: page.locator('.details', {
        hasText: product2.name,
      }),
    });
    //unit price selector: .qty .text-xs-left
    await expect(
      rowProduct2.locator('.qty').locator('.text-xs-left'),
    ).toHaveText(`${product2.currency}${product2.unit_price.toFixed(2)}`);
    //quantity selector: .qty .text-sm-center
    await expect(
      rowProduct2
        .locator('.qty')
        .locator('.text-sm-center:not(.text-xs-left):not(.text-xs-right)'),
    ).toHaveText(`${product2.quantity}`);
    //total products selector: .qty .text-xs-right
    await expect(
      rowProduct2.locator('.qty').locator('.text-xs-right'),
    ).toHaveText(
      `${product2.currency}${(product2.unit_price * product2.quantity).toFixed(2)}`,
    );
  });
});
