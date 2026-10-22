// fixture with param
import {expect, test as base} from '@playwright/test';
import {PageManager} from "../../page-objects/page-manager";

export type DemoFixture = {
    myParam: string,
    navigateTo: string
}

export const withParam  = base.extend<DemoFixture>({
    myParam: "", //init param
    navigateTo: async({page, myParam}, use) => {

        console.log('param value is set in the test: ', myParam)//myParamValue from test.spect.ts

        const pm: PageManager = new PageManager(page);
        await page.goto('http://localhost:8000/admin-dev');
        await pm.onLoginPage().login('admin@prestashop.com', 'prestashop');
        //go to Categories page
        await page.locator('#subtab-AdminCatalog').click();
        await page.locator('#subtab-AdminCategories').click();
        //activate this fixture
        await use(''); // empty string because we will not use this fixture
    }
})