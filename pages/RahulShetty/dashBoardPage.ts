import { Page, expect, Locator } from '@playwright/test';
import { PlaywrightWrapper } from '../../costomFixture/common/PlaywrightWrapper';

export class DashboardPage extends PlaywrightWrapper {

    // =========================
    // Static Locators
    // =========================

    private btn_viewProduct: () => Locator;
    private btn_addToCart: () => Locator;
    private btn_cart: () => Locator;
    private txt_toast: () => Locator;

    constructor(
        page: Page,
        private screenshotStep: (name: string, fn: () => Promise<void>) => Promise<void>
    ) {
        super(page);

        // =========================
        // Static Locator Definitions
        // =========================

        this.btn_viewProduct = () => {
            return this.page.getByRole('button', { name: 'View' }).first();
        };

        this.btn_addToCart = () => {
            return this.page.getByRole('button', { name: 'Add to Cart' });
        };

        this.btn_cart = () => {
            return this.page.locator('button[routerlink="/dashboard/cart"]');
        };

        this.txt_toast = () => { return this.page.locator('#toast-container'); };
    }

    // =========================
    // Page Methods
    // =========================

    async clickFirstProduct() {
        await this.screenshotStep('Click First Product', async () => {

            const productResponsePromise = this.page.waitForResponse(
                response =>
                    response.request().method() === 'GET' &&
                    response.url().includes('/api/ecom/product/get-product-detail/')
            );

            await this.click(this.btn_viewProduct(), 'View product');

            const productResponse = await productResponsePromise;

            console.log('PRODUCT DETAIL RESPONSE:', productResponse.status());
        });
    }

    async addToCart() {
        await this.screenshotStep('Add Product To Cart', async () => {

            const productId = this.page.url().split('/product-details/')[1];
            console.log('PRODUCT ID FROM URL:', productId);

            const [request, response] = await Promise.all([
                this.page.waitForRequest(
                    request =>
                        request.method() === 'POST' &&
                        request.url().includes('/api/ecom/user/add-to-cart')
                ),
                this.page.waitForResponse(
                    response =>
                        response.request().method() === 'POST' &&
                        response.url().includes('/api/ecom/user/add-to-cart')
                ),
                this.click(this.btn_addToCart(), 'Add to Cart')
            ]);

            console.log('ADD TO CART URL:', request.url());
            console.log('ADD TO CART HEADERS:', request.headers());
            console.log('ADD TO CART REQUEST BODY:', request.postData());
            console.log('ADD TO CART RESPONSE:', response.status());
            console.log('ADD TO CART BODY:', await response.text());
        });
    }

/*
    async addToCart() {
        await this.screenshotStep('Add Product To Cart', async () => {
            await this.click(this.btn_addToCart(), 'Add to Cart');
        });
    }
        */

    async goToCart() {
        await this.screenshotStep('Go To Cart', async () => {

            this.page.on('response', async response => {
                if (response.request().method() === 'GET') {
                    console.log(
                        `GET RESPONSE: ${response.status()} ${response.url()}`
                    );

                    if (response.url().includes('/api/')) {
                        try {
                            console.log(`GET BODY: ${await response.text()}`);
                        } catch {
                            console.log('GET BODY: <unavailable>');
                        }
                    }
                }
            });

            await this.click(this.btn_cart(), 'Cart');
        });
    }

    async validateToastMessage(expectedText: string) {
        await this.screenshotStep('Validate Product Toast', async () => {
            await expect(this.txt_toast()).toContainText(expectedText, { timeout: 5000 });
        });
    }
}
