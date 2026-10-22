import {expect, test} from "@playwright/test";
import {PageManager} from "../../page-objects/page-manager";

test.describe('From category page', () => {
    test('go to Categories', async ({ page }, testInfo) => {
        const pm = new PageManager(page);

        const title =  await pm.fromCategoriesPage().getPageTabTitle();
        expect(title).toEqual('Categories');

        await test.step('plop', async () => {

        })
    });
})
