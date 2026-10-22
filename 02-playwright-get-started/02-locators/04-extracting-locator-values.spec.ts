import {expect, Locator, test} from "@playwright/test";

test('Extracting values', async ({ page }) => {

    // text content
    const orderMenu: Locator = page.locator('#subtab-AdminParentOrders');
    const orderMenuLabel = await orderMenu.textContent();
    expect(orderMenuLabel).toEqual('Orders')

    // all text content
    const menu: Locator= page.locator('.has_submenu');
    const menuLabels: string[] = await menu.allTextContents();
    expect(menuLabels).toContain('Orders')

    // input field
    const query: Locator = page.getByPlaceholder('Search')//search BO input
    query.fill('plop')
    const inputValue = await query.inputValue()
    expect(inputValue).toEqual('plop')

    // attribut's element value
    const placeholderValue: string|null = await query.getAttribute('placeholder')
    expect(placeholderValue).toEqual('Search')
});