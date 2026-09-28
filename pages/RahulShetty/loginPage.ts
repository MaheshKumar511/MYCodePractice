import { Page, expect, Locator } from '@playwright/test';
import { PlaywrightWrapper } from '../../costomFixture/common/PlaywrightWrapper';

export class LoginPage extends PlaywrightWrapper {

    private txt_email: () => Locator;
    private txt_password: () => Locator;
    private btn_login: () => Locator;
    private txt_toast: () => Locator;
    private loginToast = '';

    constructor(
        page: Page,
        private screenshotStep: (name: string, fn: () => Promise<void>) => Promise<void>
    ) {
        super(page);

        this.txt_email = () => { return this.page.getByRole('textbox', { name: 'email@example.com' }); };
        this.txt_password = () => { return this.page.getByRole('textbox', { name: 'enter your passsword' }); };
        this.btn_login = () => { return this.page.getByRole('button', { name: 'Login' }); };
        this.txt_toast = () => { return this.page.locator('#toast-container'); };
    }

    async navigate() {
        await this.screenshotStep('Navigate to Login Page', async () => {
            await this.goto('https://rahulshettyacademy.com/client/#/auth/login');
        });
    }

    async enterEmail(email: string) {
        await this.screenshotStep('Enter Email', async () => {
            await this.fill(this.txt_email(), email, 'Email');
        });
    }

    async enterPassword(password: string) {
        await this.screenshotStep('Enter Password', async () => {
            await this.fill(this.txt_password(), password, 'Password');
        });
    }

    async clickLogin(expectedText: string) {
        await this.screenshotStep('Click Login', async () => {
            await this.click(this.btn_login(), 'Login button');
            await expect(this.txt_toast()).toContainText(expectedText, { timeout: 5000 });
            this.loginToast = expectedText;
        });
    }

    async validateUrl(expectedText: string) {
        await this.screenshotStep('Validate dashboard URL', async () => {
            await expect(this.page).toHaveURL(/dashboard/);
        });
    }

    async validateToastMessage(expectedText: string) {
        await this.screenshotStep('Validate Login Toast', async () => {
            expect(this.loginToast).toContain(expectedText);
        });
    }
}

