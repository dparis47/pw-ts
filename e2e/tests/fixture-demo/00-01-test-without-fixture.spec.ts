import { chromium, test } from '@playwright/test';

test('Without playwright fixture', async () => {
  //create a new browser
  const browser = await chromium.launch();
  //create new context
  const context = await browser.newContext();
  //create new page
  const page = await context.newPage();

  await page.goto('https://amazon.com');

  await page.pause();

  //context
  console.log('### coockies', await context.cookies());
  await context.clearCookies();
  console.log('### coockies (after clear)', await context.cookies());

  //new page
  const context2 = await browser.newContext();
  //create new page
  const page2 = await context2.newPage();

  await page2.goto('https://google.com');

  await page.pause();

  //request
  const response = await page.request.get(
    'https://api.nationalize.io/?name=Nicolas',
  );
  const json = await response.json();
  console.log('#### json:', json);

  //browserName
  // @ts-expect-error: browser property
  console.log('### browserName', browser._name);
});

test.only('With playwright fixture', async ({
  browser,
  context,
  page,
  request,
  browserName,
}) => {
  await page.goto('https://amazon.com');

  await page.pause();

  //context
  console.log('### coockies', await context.cookies());
  await context.clearCookies();
  console.log('### coockies (after clear)', await context.cookies());

  //new page
  const context2 = await browser.newContext();
  //create new page
  const page2 = await context2.newPage();

  await page2.goto('https://google.com');

  await page.pause();

  //request
  const response = await request.get(
    'https://api.nationalize.io/?name=Nicolas',
  );
  const json = await response.json();
  console.log('#### json:', json);

  //browserName
  console.log('### browserName', browserName);
});
