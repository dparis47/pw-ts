import {expect, Locator, test} from "@playwright/test";
import exp = require("node:constants");


//https://playwright.dev/docs/actionability

test.beforeEach(async ({page}) =>{
    await page.goto('http://uitestingplayground.com/ajax');
    await page.getByRole('button', {name: 'Button Triggering AJAX Request'});
});
test('Auto-waiting', async ({ page }) => {
    const success = page.locator('.bg-success');

    //textContent method wait
    const text = await success.textContent();
    expect(text).toEqual('Data loaded with AJAX get request.');

    //allTextContents do not wait
    await success.waitFor({state: 'attached'}); // test failed without waiting for state attached
    const allText = await success.allTextContents();
    expect(allText).toContain('Data loaded with AJAX get request.')

    // Locator (RECOMMENDED): default timeout 5 secondes (see 07-timeout.spec.ts)
    await expect(success).toHaveText('Data loaded with AJAX get request.', {timeout: 20*1000})// passed with 20s timeout
});


// WHEN COMMANDS OF PLAYWRIGHT DO NOT AUTOMATIC WAIT IMPLEMENTED
test('Alternative waits', async ({ page }) => {
    const success = page.locator('.bg-success');

    // 1- wait for element
    await page.waitForSelector('.bg-success');

    // 2- wait API response (see network)
    await page.waitForResponse('http://uitestingplayground.com/ajaxdata')//request URL

    // 3 - wait for network calls to be completed (NOT RECOMMENDED, but sometimes can be useful.)
    // This approach is not recommended because if some of the API calls is stuck,
    // the test will also be stuck at this point and some of those API calls may not be that really important for the functionality of the application.
    await page.waitForLoadState('networkidle');//playwright will wait until all the API calls in the networking tab of the browser will be completed and only then will move to the next line.

    // Many others ...
    // await page.waitForTimeout(5*1000);//hard code timeout (NOT RECOMMENDED)
    // await page.waitForURL('yourURL');


    const allText = await success.allTextContents();
    expect(allText).toContain('Data loaded with AJAX get request.')

})