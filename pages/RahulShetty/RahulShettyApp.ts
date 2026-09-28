import { Page } from '@playwright/test';
import { LoginPage } from './loginPage';
import { DashboardPage } from './dashBoardPage';
import { CartPage } from './cartPage';
import { CheckoutPage } from './checkOutPage';
import { ConfirmationPage } from './conformationPage';

export class RahulShettyApp {

    private _loginPage?: LoginPage | null;
    private _dashboardPage?: DashboardPage | null;
    private _cartPage?: CartPage | null;
    private _checkoutPage?: CheckoutPage | null;
    private _confirmationPage?: ConfirmationPage | null;

    constructor(
        private page: Page,
        private screenshotStep: (name: string, fn: () => Promise<void>) => Promise<void>
    ) { }

    get loginPage(): LoginPage {
        if (!this._loginPage) this._loginPage = new LoginPage(this.page, this.screenshotStep);
        return this._loginPage;
    }

    get dashboardPage(): DashboardPage {
        if (!this._dashboardPage) this._dashboardPage = new DashboardPage(this.page, this.screenshotStep);
        return this._dashboardPage;
    }

    get cartPage(): CartPage {
        if (!this._cartPage) this._cartPage = new CartPage(this.page, this.screenshotStep);
        return this._cartPage;
    }

    get checkoutPage(): CheckoutPage {
        if (!this._checkoutPage) this._checkoutPage = new CheckoutPage(this.page, this.screenshotStep);
        return this._checkoutPage;
    }

    get confirmationPage(): ConfirmationPage {
        if (!this._confirmationPage) this._confirmationPage = new ConfirmationPage(this.page, this.screenshotStep);
        return this._confirmationPage;
    }
}
