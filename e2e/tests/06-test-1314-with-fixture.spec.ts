import { test } from '@playwright/test';
import { product1, product2 } from '../data/products';
import { user1 } from '../data/users';
import { PaymentMethod } from '../enum/payment-method';
import { placeOrder } from '../fixture/place-order';

//https://forge.prestashop.com/browse/TEST-1314
placeOrder.use({ products: { arr: [product1, product2] } });
placeOrder('@Fixture', async ({ pm }) => {
  await test.step('1- Place order', async () => {
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

  await test.step('2- Check order confirmation page', async () => {
    await pm
      .fromOrderConfirmationPage()
      .checkOrderConfirmed([product1, product2]);
  });
});
