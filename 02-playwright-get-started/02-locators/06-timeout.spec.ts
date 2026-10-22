import {expect, Locator, test} from "@playwright/test";
import exp = require("node:constants");

//playwright.config.ts
//globaltimeout: Maximum time in milliseconds the whole test suite can run. Zero timeout (default) disables this behavior. Useful on CI to prevent broken setup from running too long and wasting resources
//timeout: Timeout for each test in milliseconds. Defaults to 30 seconds.
//In global options for all tests (ie use: {}), 2 timeouts:
//navigationTimeout: Timeout for each navigation action in milliseconds. Defaults to 0 (no timeout).
//actionTimeout: Default timeout for each Playwright action in milliseconds, defaults to 0 (no timeout)

//All tests will be limited by 'globalTimeout'
//To modify the test timeout for a particular test suite with 'testInfo' in a beforeEach hook.
test.beforeEach(async ({page}, testInfo) =>{
    await page.goto('http://uitestingplayground.com/ajax');
    await page.getByRole('button', {name: 'Button Triggering AJAX Request'});
    //modify the default timeout for the test suite
    testInfo.setTimeout(testInfo.timeout + 10*1000);
});

// test will be limited by 'timeout'
test('Timeout', async ({ page }) => {


    //override the test timeout for a particular test (ie 'timeout')
    test.setTimeout(10*1000)// => click needs 15 sec => test will be failed

    //the command slow will increase the default timeout in 3 times to allow the test a little bit more time to continue the execution.
    test.slow();// => 3 * timeout value

    const success = page.locator('.bg-success');
    // 'click' command will be limited by the 'actionTimeout'
    // We can always override the 'actionTimeout' for the action by providing the timeout inside of the command
    await success.click({timeout: 20*1000});//need 15 seconds to be executed

    //Expect locator assertion timeout:
    //In playwright config add:
    //expect : {
    //      timeout: 5*1000
    //},
    expect(success).toHaveText('text');
    // can be override
    expect(success).toHaveText('text', {timeout: 10*1000});
});