import {expect, test} from "@playwright/test";
import mockObject from './test-data/mock-object.json';

//https://playwright.dev/docs/api/class-route
test.beforeEach(async ({ page }) => {
    // 1- How to intercept API response and replace the response with our own object
    await page.route('*/**/api/endpoint1', async route => {
        // And then fulfill this object as a desired response
        await route.fulfill({
            body: JSON.stringify(mockObject)

        })
    });

    // 2- How to intercept API response and how to modify this API response.
    // /!\ playwright has a bug in the framework that closing the browser before it's actually able
    // if not corrected, assertion gives enough time for the application to be loaded
    // otherwise add 1 sec timeout to the page (ie await page.waitForTimeout(1000)
    await page.route('*/**/api/endpoint2', async route => {
        const response = await route.fetch();
        const responseBody = await response.json();
       // responseBody to update

        // And then fulfill the modified response as a desired response
        await route.fulfill(responseBody);
    });

    page.goto('https://test-url.com');
})
test('API Mock', async ({ page }) => {
    // Test implementation
})

