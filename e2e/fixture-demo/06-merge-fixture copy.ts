import { mergeTests } from '@playwright/test';
import { toMergeFixture1 } from './06-01-to-merge-fixture';
import { toMergeFixture2 } from './06-02-to-merge-fixture';

export const mergeFixture = mergeTests(toMergeFixture1, toMergeFixture2);
