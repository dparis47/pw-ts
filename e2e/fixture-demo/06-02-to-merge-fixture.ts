import { test as base } from '@playwright/test';
import { PageManager } from '../page-object/BO/page-manager';

export type MyFixture = {
  pageManager: PageManager;
};

export const toMergeFixture2 = base.extend<MyFixture>({
  pageManager: async ({ page }, use) => {
    const pm = new PageManager(page);
    use(pm);
  },
});
