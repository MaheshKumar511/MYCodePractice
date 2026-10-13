import { test as base, Page } from '@playwright/test';
import { RahulShettyApp } from '../pages/RahulShetty/RahulShettyApp';
import { TableHandlingPage } from '../pages/Seliniumpractice/tableHandelig';

type MaheshFixture = {
    maheshCosomfixture: MaheshCostomfixture;
};

export class MaheshCostomfixture {

    private _RahulShetty?: RahulShettyApp | null;
    private _tableHandling?: TableHandlingPage | null;

    constructor(
        private page: Page,
        private screenshotStep: (name: string, fn: () => Promise<void>) => Promise<void>
    ) { }

    get RahulShetty(): RahulShettyApp {
        if (!this._RahulShetty) this._RahulShetty = new RahulShettyApp(this.page, this.screenshotStep);
        return this._RahulShetty;
    }

    get tableHandling(): TableHandlingPage {
        if (!this._tableHandling) {
            this._tableHandling = new TableHandlingPage(this.page, this.screenshotStep);
        }
        return this._tableHandling;
    }
}

export const test = base.extend<MaheshFixture>({
    maheshCosomfixture: async ({ page }, use, testInfo) => {
        const screenshotStep = async (name: string, fn: () => Promise<void>) => {
            await test.step(name, async () => {
                try {
                    await fn();
                    await page.screenshot({ path: `test-results/${testInfo.title}/${name}.png`, fullPage: true });
                    console.log(`PASS: ${name}`);
                } catch (error) {
                    await page.screenshot({ path: `test-results/${testInfo.title}/${name}-FAILED.png`, fullPage: true });
                    console.log(`FAIL: ${name}`);
                    throw error;
                }
            });
        };

        await use(new MaheshCostomfixture(page, screenshotStep));
    }
});
