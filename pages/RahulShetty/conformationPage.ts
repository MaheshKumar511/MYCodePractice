import { Page, Locator } from '@playwright/test';
import { PlaywrightWrapper } from '../../costomFixture/common/PlaywrightWrapper';

export class ConfirmationPage extends PlaywrightWrapper {

    private txt_orderConfirmationNumber: () => Locator;
    private txt_orderAmount: () => Locator;
    private txt_toast: () => Locator;

    constructor(page: Page, private screenshotStep: (name: string, fn: () => Promise<void>) => Promise<void>) {
        super(page);

        this.txt_orderConfirmationNumber = () => { return this.page.getByText('| 6ab675e72be7a4bc2b6df90a |'); };
        this.txt_orderAmount = () => { return this.page.getByText('$'); };
        this.txt_toast = () => { return this.page.locator('#toast-container'); };
    }

    async verifyOrderConfirmationNumber() {
        await this.screenshotStep('Verify Order Confirmation Number', async () => {
            await this.expectVisible(this.txt_orderConfirmationNumber(), 'Order confirmation number');
        });
    }

    async verifyOrderAmount() {
        await this.screenshotStep('Verify Order Amount', async () => {
            await this.expectVisible(this.txt_orderAmount(), 'Order amount');
        });
    }

    async validateToastMessage(expectedText: string) {
        await this.screenshotStep('Validate Confirmation Toast', async () => {
            await this.ValidateToastMessage(expectedText, 'Confirmation Page');
        });
    }

}