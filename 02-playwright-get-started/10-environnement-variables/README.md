# Environnement variables

To run application in the different environments like staging, dev, production environment etc, usually settings, credentials, URLs etc for different environment is different.

## Process env
playwright config
```sh 
    baseURL: process.env.DEV === '1' ? 'localhost:8000/dev'
    : process.env.INTE === '1' ? 'localhost:8000/inte'
    : process.env.PRE_PROD === '1' ? 'localhost:8000/pre-prod'
    : 'localhost:8000/admin-dev',
```

* run test in command
```sh 
$ PRE_PROD=1 npx playwright test --project=chromium
```
* or .env
```sh 
    PRE_PROD_URL=localhost:8000/pre-prod
```

## Test options type
* Test options template : create a type in test-options.ts
* Import it inside of the config file and add it to defineConfig function

playwright-config.ts
```sh
import type { TestOptions} from "./e2e/playwright/10-environnement-variables/test-options";

export default defineConfig<TestOptions>({
  ...

  projects: [
    {
      name: 'pre-production',
      testMatch: '**/*.spec.ts',
      use: {
        browserName: 'chromium',
        globalURL: 'localhost:8000/pre-prod'
      }
    },
    ...
  ],
});
```
* In the test file, instead of importing tests from the playwright library directly, create this import import test

test file:
```sh 
import {expect} from "@playwright/test";
import {test} from "../test-options";

test.describe('From Order page', () => {

    test('go to Orders', async ({ page, qaURL }) => {
        await page.goto(qaURL);
        ...
        })
    });
})

```