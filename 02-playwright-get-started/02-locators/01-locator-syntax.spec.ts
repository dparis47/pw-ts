import {expect, test} from "@playwright/test";

test('Locator syntax rules', async ({ page }) => {

    //by tag name
    page.locator('input')
    await page.locator('input').first().click()

    //by id
    page.locator('#valueId')

    // by class value
    page.locator('.classValue')

    // by class value (full)
    page.locator('[class=classValue1 classValue2]')

    //by attribut
    page.locator('[attributName=attributValue]')

    //combien different selectors
    page.locator('input[attributName=attributValue].classValue')
    page.locator('input[attr1=attrValue1][attr2=attrValue2]')

    //by XPath (NOT RECOMMENDED)
    page.locator('//*[@id="valueId"]')

    //by partial text match
    page.locator(':text("text part")')

    //by exact text match
    page.locator(':text-is("Full text to be found")')
});