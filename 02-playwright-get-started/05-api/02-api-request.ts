import {expect, test, request} from "@playwright/test";
test.beforeEach(async ({ page }) => {
    page.goto('https://test-url.com');
})
test('API Request', async ({ page, request }) => {

    const accessToken= 'presta123'
    //POST
    const response = await request.post('http://localhost:8000/api/categories', {
        // request body named 'data'
        data: {
            "name": "Category name",
            "description": "category descrition"
            // ...
        },
        headers: {
            Authorization: `token ${accessToken}`
        }
    });

    expect(response.status()).toEqual(201);

    const responseBody = response.json();
    // console.log(responseBody.categories.category[0].id);
})

