import {expect, test} from "@playwright/test";

test('Child element locator', async ({ page }) => {


    // <elt1>
    //    <radioButton>option 1</radioButton>
    //    <radioButton>option 2</radioButton>
    //    <radioButton>option 3</radioButton>
    //</elt1>
    await page.locator('elt1 radioButton :text-is("option 1")').click()
    await page.locator('elt1').locator('radioButton').locator(':text-is("option 1")').click()

    //by index (Try to avoid this approach as much as possible: web elements can be changed on the web page)
    // <elt1>
    //    <button>button 1</button>
    //</elt1>
    // <elt1>
    //    <button>button 1</button>
    //</elt1>
    // <elt1>
    //    <button>button 1</button>
    //</elt1>
    await page.locator('elt1').nth(2).getByRole('button').click() //third element (index start at 0)

});