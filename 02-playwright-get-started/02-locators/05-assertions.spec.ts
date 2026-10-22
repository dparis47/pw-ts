import {expect, Locator, test} from "@playwright/test";
import exp = require("node:constants");


//Playwright has two different types of the assertions:
//   * general assertions and
//   * locator assertions.
test('Assertions', async ({ page }) => {

    // General assertions
    const value= 'plop';
    expect(value).toEqual('plop');

    const orderMenu: Locator = page.locator('#subtab-AdminParentOrders');
    // See the textContent documentation: "NOTE If you need to assert text on the page, prefer expect(locator).toHaveText(expected[, options])  to avoid flakiness."
    const orderMenuLabel = await orderMenu.textContent();
    expect(orderMenuLabel).toEqual('Orders');

    // Locator assertions (RECOMMENDED)
    // This assertions has their own timeout (default 5 secondes)
    await expect(orderMenu).toHaveText('Orders');

    await expect(orderMenu).toBeEnabled()
    // Soft assertions (not a good practice)
    // Assertion when the test can be continue the execution even if the assertion is failed.
    await expect.soft(orderMenu).toHaveText('Orders');
    await orderMenu.click();
});