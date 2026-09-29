import { Page, Locator } from '@playwright/test';
import { PlaywrightWrapper } from '../../costomFixture/common/PlaywrightWrapper';

export class CartPage extends PlaywrightWrapper {

    private txt_cartPrice1: () => Locator;
    private txt_cartPrice2: () => Locator;
    private btn_checkout: () => Locator;
    private txt_productId: () => Locator;

    constructor(page: Page, private screenshotStep: (name: string, fn: () => Promise<void>) => Promise<void>) {
        super(page);

        this.txt_cartPrice1 = () => this.page.getByText(/^\$\s*\d+$/).first();
        this.txt_cartPrice2 = () => this.page.getByText(/^\$\s*\d+$/).last();
        this.btn_checkout = () => this.page.getByRole('button', { name: /Checkout/i });
        this.txt_productId = () => this.page.locator('.itemNumber');
    }

    async verifyCartPrice1() {
        await this.screenshotStep('Verify Cart Price 1', async () => {
            await this.expectVisible(this.txt_cartPrice1(), 'Cart price 1');
        });
    }

    async verifyCartPrice2() {
        await this.screenshotStep('Verify Cart Price 2', async () => {
            await this.expectVisible(this.txt_cartPrice2(), 'Cart price 2');
        });
    }

    async checkout() {
        await this.screenshotStep('Checkout', async () => {
            await this.click(this.btn_checkout(), 'Checkout');
        });
    }

    async getProductID() {
        await this.screenshotStep('Verify Product ID', async () => {
            await this.expectVisible(this.txt_productId(), 'Product ID');
        });
    }
}





/*

import { Page, Locator } from '@playwright/test';
import { PlaywrightWrapper } from '../../costomFixture/common/PlaywrightWrapper';

export class CartPage extends PlaywrightWrapper {

    private txt_cartPrice1: () => Locator;
    private txt_cartPrice2: () => Locator;
    private btn_checkout: () => Locator;
    private txt_productId: () => Locator;

    constructor(page: Page, private screenshotStep: (name: string, fn: () => Promise<void>) => Promise<void>) {
        super(page);

        this.txt_cartPrice1 = () => { return this.page.getByText('$').nth(2); };
        this.txt_cartPrice2 = () => { return this.page.getByText('$').nth(3); };
        this.btn_checkout = () => { return this.page.getByRole('button', { name: /Checkout/i }); };
        this.txt_productId = () => { return this.page.locator('.itemNumber'); };
    }

    async verifyCartPrice1() {
        await this.screenshotStep('Verify Cart Price 1', async () => {
            console.log(await this.page.locator('body').innerText());
            await this.expectVisible(this.txt_cartPrice1(), 'Cart price 1');
        });
    }

    async verifyCartPrice2() {
        await this.screenshotStep('Verify Cart Price 2', async () => {
            console.log(await this.page.locator('body').innerText());
            await this.expectVisible(this.txt_cartPrice2(), 'Cart price 2');
        });
    }

    async checkout() {
        await this.screenshotStep('Checkout', async () => {
            await this.click(this.btn_checkout(), 'Checkout');
        });
    }

    async getProductID() {
        await this.screenshotStep('Verify Product ID', async () => {
            await this.expectVisible(this.txt_productId(), 'Product ID');
        });
    }

}


*/