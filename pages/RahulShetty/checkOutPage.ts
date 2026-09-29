import { Page, Locator } from '@playwright/test';
import { PlaywrightWrapper } from '../../costomFixture/common/PlaywrightWrapper';

export class CheckoutPage extends PlaywrightWrapper {

    private cmb_expiry: () => Locator;
    private txt_cvv: () => Locator;
    private txt_cardHolderName: () => Locator;
    private txt_country: () => Locator;
    private btn_placeOrder: () => Locator;

    private btn_countryOption = (country: string): Locator => {
        return this.page.locator('section.ta-results button.ta-item').filter({hasText: new RegExp(`^\\s*${country}\\s*$`, 'i')}).first();
    };

    constructor(
        page: Page,
        private screenshotStep: (name: string, fn: () => Promise<void>) => Promise<void>
    ) {
        super(page);

        this.cmb_expiry = () => {
            return this.page.getByRole('combobox').nth(1);
        };

        this.txt_cvv = () => {
            return this.page.getByRole('textbox').nth(1);
        };

        this.txt_cardHolderName = () => {
            return this.page.getByRole('textbox').nth(2);
        };

        this.txt_country = () => {
            return this.page.getByRole('textbox', { name: 'Select Country' });
        };

        this.btn_placeOrder = () => {
            return this.page.getByText('Place Order');
        };
    }

    async selectExpiry() {
        await this.screenshotStep('Select Expiry', async () => {
            await this.selectOption(this.cmb_expiry(), '30', 'Expiry');
        });
    }

    async enterCVV(cvv: string) {
        await this.screenshotStep('Enter CVV', async () => {
            await this.fill(this.txt_cvv(), cvv, 'CVV');
        });
    }

    async enterCardHolderName(name: string) {
        await this.screenshotStep('Enter Card Holder Name', async () => {
            await this.fill(this.txt_cardHolderName(), name, 'Card Holder Name');
        });
    }

    async enterCountry(country: string) {
        await this.screenshotStep('Enter Country', async () => {
            await this.fill(this.txt_country(), country, 'Country');
            await this.press(this.txt_country(), 'Backspace', 'Country');
        });
    }

    async selectCountry(country: string) {
        await this.screenshotStep('Select Country', async () => {
            const countryOption = this.btn_countryOption(country);
            await this.waitForVisible(countryOption, `Country option: ${country}`);
            await this.click(countryOption, `Country option: ${country}`);
        });
    }

    async placeOrder() {
        await this.screenshotStep('Place Order', async () => {
            await this.click(this.btn_placeOrder(), 'Place Order');
        });
    }
}