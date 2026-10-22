import { expect, Locator, Page } from '@playwright/test';
import { PaymentMethod } from '../../enum/payment-method';
import { BasePage } from './base-page';

export class PaymentMethodPage extends BasePage {
  private placeOrderButton: Locator;
  private paymentMethodRadio: (paymentMethod: PaymentMethod) => Locator;
  private paymentOptionLocator: (paymentMethod: PaymentMethod) => Locator;
  private paymentAdditionalInfoLocator: (
    paymentMethod: PaymentMethod,
  ) => Locator;
  private paymentAdditionalInfoLocatorParagraph: (
    paymentMethod: PaymentMethod,
  ) => Locator;
  private termsConditions: Locator;
  constructor(page: Page) {
    super(page);
    this.placeOrderButton = this.page.getByRole('button', {
      name: 'Place Order',
    });
    this.paymentMethodRadio = (paymentMethod: PaymentMethod): Locator =>
      this.page
        .getByRole('radio')
        .and(page.locator(`[data-module-name="${paymentMethod}"]`));
    this.paymentOptionLocator = (paymentMethod: PaymentMethod): Locator =>
      this.page.locator('.payment-option', {
        has: this.paymentMethodRadio(paymentMethod),
      });
    this.paymentAdditionalInfoLocator = (
      paymentMethod: PaymentMethod,
    ): Locator =>
      this.page
        .locator('div', { has: this.paymentOptionLocator(paymentMethod) })
        .locator('.additional-information');
    this.paymentAdditionalInfoLocatorParagraph = (
      paymentMethod: PaymentMethod,
    ): Locator =>
      this.paymentAdditionalInfoLocator(paymentMethod).locator('p', {
        hasText: 'Please send us your check including the following details:',
      });
    this.termsConditions = this.page
      .locator('#conditions-to-approve')
      .getByRole('checkbox');
  }

  /**
   * Choose Payment method and place order
   *
   * @param paymentMethod {PaymentMethod}
   */
  async choosePaymentMethodAndPlaceOrder(paymentMethod: PaymentMethod) {
    //Place order button not enable
    await expect(this.placeOrderButton).not.toBeEnabled();
    await expect(this.placeOrderButton).toBeVisible();

    // Check payment method radio button
    await this.paymentMethodRadio(paymentMethod).check();
    await expect(this.paymentMethodRadio(paymentMethod)).toBeChecked();
    await expect(
      this.paymentAdditionalInfoLocatorParagraph(paymentMethod),
    ).toBeVisible();

    // Check terms conditions checkbox
    await this.termsConditions.check();
    await expect(this.termsConditions).toBeChecked();

    //Place order button enable and click
    await expect(this.placeOrderButton).toBeEnabled();
    await expect(this.placeOrderButton).toBeVisible();
    await this.placeOrderButton.click();
  }
}
