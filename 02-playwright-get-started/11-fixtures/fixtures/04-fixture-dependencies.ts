// fixtures with order
import {expect, test as base} from '@playwright/test';
import {PageManager} from "../../page-objects/page-manager";

export type DemoFixture = {
    navigateTo: string,
    pageManager: PageManager
}

export const fixtureDependencies  = base.extend<DemoFixture>({
    navigateTo: async({page}, use) => {
        const pm: PageManager = new PageManager(page);

        await page.goto('http://localhost:8000/admin-dev');
        await pm.onLoginPage().login('admin@prestashop.com', 'prestashop');

        //go to Categories page
        await page.locator('#subtab-AdminCatalog').click();
        await page.locator('#subtab-AdminCategories').click();

        //activate this fixture
        await use(''); // empty string because we will not use this fixture
    },

    //navigateTo run before pageManager
    pageManager: async({page, navigateTo}, use) => {
        const pm = new PageManager(page);
        await use(pm);
    }
})