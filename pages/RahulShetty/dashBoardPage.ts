import { Page, expect, Locator } from '@playwright/test';
import { PlaywrightWrapper } from '../../costomFixture/common/PlaywrightWrapper';

export class DashboardPage extends PlaywrightWrapper {
    private btn_viewProduct: () => Locator;
    private btn_addToCart: () => Locator;
    private btn_cart: () => Locator;
    private txt_toast: () => Locator;

    constructor(
        page: Page,
        private screenshotStep: (name: string, fn: () => Promise<void>) => Promise<void>
    ) {
        super(page);

        this.btn_viewProduct = () => {
            return this.page.getByRole('button', { name: 'View' }).first();
        };

        this.btn_addToCart = () => {
            return this.page.getByRole('button', { name: 'Add to Cart' });
        };

        this.btn_cart = () => {
            return this.page.locator('button[routerlink="/dashboard/cart"]');
        };

        this.txt_toast = () => {
            return this.page.locator('#toast-container');
        };
    }

    async clickFirstProduct() {
        await this.screenshotStep('Click First Product', async () => {
            const productResponsePromise = this.page.waitForResponse(
                response =>
                    response.request().method() === 'GET' &&
                    response.url().includes('/api/ecom/product/get-product-detail/')
            );

            await this.click(this.btn_viewProduct(), 'View product');

            await productResponsePromise;
        });
    }

    async addToCart() {
        await this.screenshotStep('Add Product To Cart', async () => {
            await this.click(this.btn_addToCart(), 'Add to Cart');
        });
    }

    async goToCart() {
        await this.screenshotStep('Go To Cart', async () => {
            await this.click(this.btn_cart(), 'Cart');
        });
    }

    async validateToastMessage(expectedText: string) {
        await this.screenshotStep('Validate Product Toast', async () => {
            await expect(this.txt_toast()).toContainText(expectedText, {
                timeout: 5000
            });
        });
    }
}