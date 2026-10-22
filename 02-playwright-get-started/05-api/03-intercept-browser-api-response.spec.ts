import {expect, test, request} from "@playwright/test";
test.beforeEach(async ({ page }) => {
    page.goto('https://test-url.com');
})
test('API Request', async ({ page, request }) => {

    const accessToken= 'presta123'
    await page.getByRole('button');

    const response = await page.waitForResponse('localhost:8000/api/endpoint');
    const body = response.json()
    //console.log(body.tags[0].id)
   const deleteResponse=  await request.delete(`localhost:8000/api/endpoint/${body.tags[0].id}`, {
            headers: {
                Authorization: `token ${accessToken}`
            }
        })

    expect(deleteResponse.status()).toEqual(204);

})