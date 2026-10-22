// fixture tests
// https://playwright.dev/docs/test-fixtures
import {PageManager} from "../../page-objects/page-manager";
import {basic} from "../../fixtures/demo/01-basic";
import {automatic} from "../../fixtures/demo/02-automatic";
import {manager} from "../../fixtures/demo/03-page-manager";
import {fixtureDependencies} from "../../fixtures/demo/04-fixture-dependencies";
import {withParam} from "../../fixtures/demo/05-fixture-with-parameter";


//Attention! Here, several fixtures are used for the demonstration. Between each fixture, the browser is closed!

basic('Use basic fixture', async ({ page, navigateTo }) => {
    const pm = new PageManager(page);
    await pm.fromCategoriesPage().isPageLoaded();
});

//Automatic fixture, remove fixture param
automatic('Use automatic fixture', async ({ page }) => {
    const pm = new PageManager(page);
    await pm.fromCategoriesPage().isPageLoaded();
});

//replace default fixture
manager('PageManager instance from fixture', async ({ pageManager }) => {
    await pageManager.fromCategoriesPage().isPageLoaded();
});

fixtureDependencies('fixtures order', async ({ pageManager }) => {
    await pageManager.fromCategoriesPage().isPageLoaded();
});

//fixture with parameter
withParam.use({myParam: 'myParamValue'});
withParam('fixture with param', async ({ page, navigateTo }) => {
    const pm = new PageManager(page);
    await pm.fromCategoriesPage().isPageLoaded();
});