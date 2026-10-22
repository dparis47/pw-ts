import { test } from '@playwright/test';
import { product1, product2 } from '../data/products';
import { user1 } from '../data/users';
import { PaymentMethod } from '../enum/payment-method';
import { AddressesPage } from '../page-object/FO/addresses-page';
import { HomePage } from '../page-object/FO/home-page';
import { OrderConfirmationPage } from '../page-object/FO/order-confirmation-page';
import { PaymentMethodPage } from '../page-object/FO/payment-method-page';
import { PersonalInformationPage } from '../page-object/FO/personal-information-page';
import { ProductAddedModalPage } from '../page-object/FO/product-added-modal-page';
import { ProductModalPage } from '../page-object/FO/product-modal-page';
import { ShippingMethodPage } from '../page-object/FO/shipping-method-page';
import { ShoppingCartPage } from '../page-object/FO/shopping-cart-page';

//https://forge.prestashop.com/browse/TEST-1314
test('@POM', async ({ page }) => {
  await test.step('1- Go to FO', async () => {
    await page.goto('localhost:8000');
  });

  const homePage = new HomePage(page);
  const productAddedModalPage = new ProductAddedModalPage(page);
  const productModalPage = new ProductModalPage(page);
  const shoppingCart = new ShoppingCartPage(page);
  const personalInformation = new PersonalInformationPage(page);
  const addresses = new AddressesPage(page);
  const shippingMethod = new ShippingMethodPage(page);
  const paymentMethod = new PaymentMethodPage(page);
  const orderConfirmation = new OrderConfirmationPage(page);

  await test.step('1- Add "The best is Yet to Come" product to cart', async () => {
    await homePage.openProductModal(product1);
    await productModalPage.checkModalFields(product1);
    await productModalPage.addToCart(product1);
    await productAddedModalPage.checkModalFields();
    await productAddedModalPage.clickOutsideModal();
  });

  await test.step('2- Add "The adventure begins Framed..." product to cart ', async () => {
    await homePage.openProductModal(product2);
    await productModalPage.checkModalFields(product2);
    await productModalPage.addToCart(product2);
    await productAddedModalPage.checkModalFields();
  });

  await test.step('3- Product modal: Proceed to checkout', async () => {
    await productAddedModalPage.proceedToCheckOut();
  });

  await test.step('4- Shopping cart: Proceed to checkout', async () => {
    await shoppingCart.checkShoppingCartProduct(product1);
    await shoppingCart.proceedToCheckout();
  });

  await test.step('5- Place order', async () => {
    // Personal Information
    await personalInformation.checkStepTitle('Personal Information');
    await personalInformation.signIn(user1);

    // Addresses
    await addresses.checkStepTitle('Addresses');
    await addresses.continue();

    // Shipping Method
    await shippingMethod.checkStepTitle('Shipping method');
    await shippingMethod.continue();

    // Payment
    await paymentMethod.checkStepTitle('Payment');
    await paymentMethod.choosePaymentMethodAndPlaceOrder(PaymentMethod.check);
  });

  await test.step('6- Check order confirmation page', async () => {
    await orderConfirmation.checkOrderConfirmed([product1, product2]);
  });
});
