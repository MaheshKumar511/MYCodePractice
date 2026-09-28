import { test as base, expect } from '@playwright/test';
import { ApiFixture } from './ApiFixture';

type ApiTestFixture = {
    api: ApiFixture;
};

export const test = base.extend<ApiTestFixture>({
    api: async ({ request }, use) => {
        await use(new ApiFixture(request));
    }
});

export { expect };