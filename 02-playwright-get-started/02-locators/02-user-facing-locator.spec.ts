import {expect, Locator, test} from "@playwright/test";
import exp = require("node:constants");


// https://playwright.dev/docs/best-practices
// "Test user-visible behavior:
// Automated tests should verify that the application code works for the end users, and avoid relying on implementation details such as things which users will not typically use,
// see, or even know about such as the name of a function, whether something is an array, or the CSS class of some element.
// The end user will see or interact with what is rendered on the page, so your test should typically only see/interact with the same rendered output."

//L'idée générale qui sous-tend ce concept est que notre locator doit imiter le comportement de l'utilisateur.
// Si, l'utilisateur voit le texte sur le bouton, le locator doit également contenir le texte que l'utilisateur voit et spécifier qu'il s'agit d'un bouton avec lequel nous voulons interagir.
test('User facing locator', async ({ page }) => {

    //User facing locator
    //by Role
    // locator for an input with a text content: User see a textbox with a text ' test@example.com'
    await page.getByRole('textbox', {name: " test@example.com"}).click();

    //locator for a button with 'Login' label
    await page.getByRole('button', {name: 'Login'}).click();

    //by Label: 'Email address'
    await page.getByLabel('Email address').click();

    // by placeholder attribut input: visible text that cannot be modified by the user
    await page.getByPlaceholder('test@example.com').click();

    //by text:  any static text that is displayed on the page as a locator
    await page.getByText('Active Shopping Carts').click();

    //by title
    await page.getByTitle('MyTitle').click();

    // NOT user facing locator data-testId
    await page.getByTestId('dataTestIdValue').click(); // default data-testid, see playwright config settings. overwrite with testIdAttribute value
});