import { simpleFixture } from '../../fixture-demo/01-demo-simple-fixture';
import { autoFixture } from '../../fixture-demo/02-demo-auto-fixture';
import { pageManagerFixture } from '../../fixture-demo/03-demo-page-manager-fixture';
import { dependeciesFixture } from '../../fixture-demo/04-demo-dependecies-fixture';
import { withParamFixture } from '../../fixture-demo/05-demo-parameter-fixture';
import { mergeFixture } from '../../fixture-demo/06-merge-fixture copy';
import { CategoriesPage } from '../../page-object/BO/categories-page';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
simpleFixture('Simple Fixture @fixture', async ({ navigateTo, page }) => {
  const categoryPage = new CategoriesPage(page);
  categoryPage.isPageLoaded();
});

autoFixture('Auto fixture @fixture', async ({ page }) => {
  const categoryPage = new CategoriesPage(page);
  categoryPage.isPageLoaded();
});

pageManagerFixture('Page manager @fixture', async ({ pageManager }) => {
  pageManager.fromCategoriesPage().isPageLoaded();
});

dependeciesFixture(
  'Dependencies fixtures @fixture',
  async ({ pageManager }) => {
    pageManager.fromCategoriesPage().isPageLoaded();
  },
);

withParamFixture.use({
  myUser: { email: 'admin@prestashop.com', password: 'prestashop' },
});

withParamFixture('With param fixture @fixture', async ({ pageManager }) => {
  pageManager.fromCategoriesPage().isPageLoaded();
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
mergeFixture('Merge fixtures @fixture', async ({ navigateTo, pageManager }) => {
  pageManager.fromCategoriesPage().isPageLoaded();
});
