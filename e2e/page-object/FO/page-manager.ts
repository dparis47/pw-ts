import { Page } from '@playwright/test';
import { AddressesPage } from './addresses-page';
import { HomePage } from './home-page';
import { OrderConfirmationPage } from './order-confirmation-page';
import { PaymentMethodPage } from './payment-method-page';
import { PersonalInformationPage } from './personal-information-page';
import { ProductAddedModalPage } from './product-added-modal-page';
import { ProductModalPage } from './product-modal-page';
import { ShippingMethodPage } from './shipping-method-page';
import { ShoppingCartPage } from './shopping-cart-page';

export class PageManager {
  private readonly homePage: HomePage;
  private readonly productAddedModalPage: ProductAddedModalPage;
  private readonly productModalPage: ProductModalPage;
  private readonly shoppingCartPage: ShoppingCartPage;
  private readonly personalInformationPage: PersonalInformationPage;
  private readonly addressesPage: AddressesPage;
  private readonly shippingMethodPage: ShippingMethodPage;
  private readonly paymentMethodPage: PaymentMethodPage;
  private readonly orderConfirmationPage: OrderConfirmationPage;

  constructor(readonly page: Page) {
    this.homePage = new HomePage(page);
    this.productAddedModalPage = new ProductAddedModalPage(page);
    this.productModalPage = new ProductModalPage(page);
    this.shoppingCartPage = new ShoppingCartPage(page);
    this.personalInformationPage = new PersonalInformationPage(page);
    this.addressesPage = new AddressesPage(page);
    this.shippingMethodPage = new ShippingMethodPage(page);
    this.paymentMethodPage = new PaymentMethodPage(page);
    this.orderConfirmationPage = new OrderConfirmationPage(page);
  }

  fromHomePage(): HomePage {
    return this.homePage;
  }

  fromProductAddedModalPage(): ProductAddedModalPage {
    return this.productAddedModalPage;
  }

  fromProductModalPage(): ProductModalPage {
    return this.productModalPage;
  }

  fromShoppingCartPage(): ShoppingCartPage {
    return this.shoppingCartPage;
  }

  fromPersonalInformationPage(): PersonalInformationPage {
    return this.personalInformationPage;
  }

  fromAddressesPage(): AddressesPage {
    return this.addressesPage;
  }

  fromShippingMethodPage(): ShippingMethodPage {
    return this.shippingMethodPage;
  }

  fromPaymentMethodPage(): PaymentMethodPage {
    return this.paymentMethodPage;
  }

  fromOrderConfirmationPage(): OrderConfirmationPage {
    return this.orderConfirmationPage;
  }
}
