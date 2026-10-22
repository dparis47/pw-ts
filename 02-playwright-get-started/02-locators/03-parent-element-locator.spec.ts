import {expect, test} from "@playwright/test";

test('Parent element locator', async ({ page }) => {

    // <elt1>
    //   <elt2>title 1</elt2>
    //   <elt2 id='id1'></elt2>
    //   <elt3>
    //    <button>button 1</button>
    //   </elt3>
    // </elt1>
    // <elt1>
    //   <elt2>title 1</elt2>
    //   <elt2 id='id2'></elt2>
    //   <elt3>
    //    <button>button 1</button>
    //   </elt3>
    // </elt1>
    await page.locator('elt1', {hasText: "title 1"}).getByRole('button').click() //the parent elt1 containing the text 'title 1'
    await page.locator('elt1', {has: page.locator('#id1')}).getByRole('button').click() //the parent elt1 has an element id equals to 'id1'

    //by filter
    await page.locator('elt1').filter({hasText: "title 1"}).getByRole('button').click()
    await page.locator('elt1').filter({has: page.locator('#id1')}).getByRole('button').click()

    // (not recommended)
    await page.locator(':text-is:("title 1")').locator('..').getByRole('button').click()// locator('..') means go one level up to the parent element
});