import {test as base} from '@playwright/test';

export type TestOptions ={
    qaURL: string,
}

export const test = base.extend<TestOptions>({
    qaURL: ['', {option: true}] //empty string as a placeholder and override this value inside of the configuration file
})