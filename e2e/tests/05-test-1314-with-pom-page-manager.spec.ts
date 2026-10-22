import { test } from '@playwright/test';
import { product1, product2 } from '../data/products';
import { user1 } from '../data/users';
import { PaymentMethod } from '../enum/payment-method';
import { PageManager } from '../page-object/FO/page-manager';

//https://forge.prestashop.com/browse/TEST-1314
test('@PM', async ({ page }) => {
  await test.step('1- Go to FO', async () => {
    await page.goto('localhost:8000');
    //Expected: The page of your shop should be displayed
  });
  const pm = new PageManager(page);

  await test.step('1- Add "The best is Yet to Come" product to cart', async () => {
    await pm.fromHomePage().openProductModal(product1);
    await pm.fromProductModalPage().checkModalFields(product1);
    await pm.fromProductModalPage().addToCart(product1);
    await pm.fromProductAddedModalPage().checkModalFields();
    await pm.fromProductAddedModalPage().clickOutsideModal();
  });

  await test.step('2- Add "The adventure begins Framed..." product to cart ', async () => {
    await pm.fromHomePage().openProductModal(product2);
    await pm.fromProductModalPage().checkModalFields(product2);
    await pm.fromProductModalPage().addToCart(product2);
    await pm.fromProductAddedModalPage().checkModalFields();
  });

  await test.step('3- Product modal: Proceed to checkout', async () => {
    await pm.fromProductAddedModalPage().proceedToCheckOut();
  });

  await test.step('4- Shopping cart: Proceed to checkout', async () => {
    await pm.fromShoppingCartPage().checkShoppingCartProduct(product1);
    await pm.fromShoppingCartPage().proceedToCheckout();
  });

  await test.step('5- Place order', async () => {
    // Personal Information
    await pm
      .fromPersonalInformationPage()
      .checkStepTitle('Personal Information');
    await pm.fromPersonalInformationPage().signIn(user1);

    // Addresses
    await pm.fromAddressesPage().checkStepTitle('Addresses');
    await pm.fromAddressesPage().continue();

    // Shipping Method
    await pm.fromShippingMethodPage().checkStepTitle('Shipping method');
    await pm.fromShippingMethodPage().continue();

    // Payment
    await pm.fromPaymentMethodPage().checkStepTitle('Payment');
    await pm
      .fromPaymentMethodPage()
      .choosePaymentMethodAndPlaceOrder(PaymentMethod.check);
  });

  await test.step('6- Check order confirmation page', async () => {
    await pm
      .fromOrderConfirmationPage()
      .checkOrderConfirmed([product1, product2]);
  });
});
