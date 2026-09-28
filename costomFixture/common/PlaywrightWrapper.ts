import { Locator, Page, expect } from '@playwright/test';

export class PlaywrightWrapper {

    constructor(protected page: Page) { }

    // =========================
    // Timestamp
    // =========================

    private getTimestamp(): string {
        const now = new Date();

        return now.toLocaleTimeString('en-IN', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        }) + `.${now.getMilliseconds().toString().padStart(3, '0')}`;
    }

    // =========================
    // Console Logger
    // =========================

    private log(message: string): void {
        console.log(`[${this.getTimestamp()}] ${message}`);
    }

    // =========================
    // Navigation
    // =========================

    async goto(url: string): Promise<void> {

        this.log('Started goto method');

        try {
            await this.page.goto(url);

            this.log(`Navigated to: ${url}`);
            this.log('Completed goto method');

        } catch (error) {

            this.log('Failed goto method');
            throw error;
        }
    }

    // =========================
    // Click
    // =========================

    async click(
        locator: Locator,
        elementName?: string
    ): Promise<void> {

        this.log('Started click method');

        try {
            await locator.click();

            this.log(
                elementName
                    ? `Clicked: ${elementName}`
                    : 'Clicked'
            );

            this.log('Completed click method');

        } catch (error) {

            this.log('Failed click method');
            throw error;
        }
    }

    // =========================
    // Fill
    // =========================

    async fill(
        locator: Locator,
        value: string,
        elementName?: string
    ): Promise<void> {

        this.log('Started fill method');

        try {
            await locator.fill(value);

            this.log(
                elementName
                    ? `Filled: ${elementName}`
                    : 'Filled'
            );

            this.log('Completed fill method');

        } catch (error) {

            this.log('Failed fill method');
            throw error;
        }
    }

    // =========================
    // Select Option
    // =========================

    async selectOption(
        locator: Locator,
        value: string,
        elementName?: string
    ): Promise<void> {

        this.log('Started selectOption method');

        try {
            await locator.selectOption(value);

            this.log(
                elementName
                    ? `Selected: ${elementName}`
                    : `Selected option: ${value}`
            );

            this.log('Completed selectOption method');

        } catch (error) {

            this.log('Failed selectOption method');
            throw error;
        }
    }

    // =========================
    // Verify Element Visible
    // =========================

    async expectVisible(
        locator: Locator,
        elementName?: string
    ): Promise<void> {

        this.log('Started expectVisible method');

        try {
            await expect(locator).toBeVisible();

            this.log(
                elementName
                    ? `Verified visible: ${elementName}`
                    : 'Verified element is visible'
            );

            this.log('Completed expectVisible method');

        } catch (error) {

            this.log('Failed expectVisible method');
            throw error;
        }
    }

    // =========================
    // Get Text
    // =========================

    async getText(
        locator: Locator,
        elementName?: string
    ): Promise<string> {

        this.log('Started getText method');

        try {
            const text = await locator.textContent();

            this.log(
                elementName
                    ? `Text retrieved from: ${elementName}`
                    : 'Text retrieved'
            );

            this.log('Completed getText method');

            return text ?? '';

        } catch (error) {

            this.log('Failed getText method');
            throw error;
        }
    }

    // =========================
    // Check
    // =========================

    async check(
        locator: Locator,
        elementName?: string
    ): Promise<void> {

        this.log('Started check method');

        try {
            await locator.check();

            this.log(
                elementName
                    ? `Checked: ${elementName}`
                    : 'Checked'
            );

            this.log('Completed check method');

        } catch (error) {

            this.log('Failed check method');
            throw error;
        }
    }

    // =========================
    // Uncheck
    // =========================

    async uncheck(
        locator: Locator,
        elementName?: string
    ): Promise<void> {

        this.log('Started uncheck method');

        try {
            await locator.uncheck();

            this.log(
                elementName
                    ? `Unchecked: ${elementName}`
                    : 'Unchecked'
            );

            this.log('Completed uncheck method');

        } catch (error) {

            this.log('Failed uncheck method');
            throw error;
        }
    }

    // =========================
    // Press Keyboard Key
    // =========================

    async press(
        locator: Locator,
        key: string,
        elementName?: string
    ): Promise<void> {

        this.log('Started press method');

        try {
            await locator.press(key);

            this.log(
                elementName
                    ? `Pressed ${key} on: ${elementName}`
                    : `Pressed: ${key}`
            );

            this.log('Completed press method');

        } catch (error) {

            this.log('Failed press method');
            throw error;
        }
    }

    // =========================
    // Hover
    // =========================

    async hover(
        locator: Locator,
        elementName?: string
    ): Promise<void> {

        this.log('Started hover method');

        try {
            await locator.hover();

            this.log(
                elementName
                    ? `Hovered: ${elementName}`
                    : 'Hovered'
            );

            this.log('Completed hover method');

        } catch (error) {

            this.log('Failed hover method');
            throw error;
        }
    }

    // =========================
    // Toast / Snackbar Capture
    // =========================

    async getAllToastMessages(): Promise<string[]> {
        this.log('Started getAllToastMessages method');

        try {
            const selectors = [
                '[role="alert"]',
                '[role="status"]',
                '.toast',
                '.toast-message',
                '.mat-snack-bar-container',
                '.toast-container',
                '.ng-trigger',
                '.toast-wrap',
                '[aria-live]',
                '.mat-simple-snackbar',
                '.md-toast',
                '.snackbar'
            ];

            const messages = new Set<string>();

            for (const selector of selectors) {
                const locator = this.page.locator(selector);
                const count = await locator.count();

                for (let index = 0; index < count; index++) {
                    const text = (await locator.nth(index).innerText())
                        .replace(/\s+/g, ' ')
                        .trim();

                    if (text && text.length > 0) {
                        messages.add(text);
                    }
                }
            }

            const result = [...messages];

            this.log(
                result.length > 0
                    ? `Captured toast messages: ${result.join(' | ')}`
                    : 'No toast messages found'
            );

            this.log('Completed getAllToastMessages method');

            return result;

        } catch (error) {
            this.log('Failed getAllToastMessages method');
            throw error;
        }
    }

    async verifyToastMessages(expectedMessages: string[]): Promise<void> {
        const actualMessages = await this.getAllToastMessages();

        for (const expectedMessage of expectedMessages) {
            const matchFound = actualMessages.some((message) =>
                message.toLowerCase().includes(expectedMessage.toLowerCase())
            );

            expect(matchFound).toBeTruthy();
        }
    }

    // =========================
    // Wait For Element
    // =========================

    async ValidateToastMessage(expectedText: string, pageName: string) {

        const toastSelectors = [
            '[role="alert"]',
            '[role="status"]',
            '.toast',
            '.toast-message',
            '.mat-snack-bar-container',
            '.toast-container',
            '.ng-trigger',
            '.toast-wrap',
            '[aria-live]',
            '.mat-simple-snackbar',
            '.md-toast',
            '.snackbar'
        ];

        const endTime = Date.now() + 5000;
        let matched = false;

        while (Date.now() < endTime) {

            for (const selector of toastSelectors) {

                const locator = this.page.locator(selector);
                const count = await locator.count();

                for (let i = 0; i < count; i++) {

                    const message = (await locator.nth(i).innerText())
                        .replace(/\s+/g, ' ')
                        .trim();

                    if (
                        message.toLowerCase().includes(
                            expectedText.toLowerCase()
                        )
                    ) {
                        matched = true;
                        break;
                    }
                }

                if (matched) {
                    break;
                }
            }

            if (matched) {
                break;
            }

            await this.page.waitForTimeout(200);
        }

        expect(
            matched,
            `Expected toast message "${expectedText}" on ${pageName}`
        ).toBeTruthy();
    }

    async waitForVisible(
        locator: Locator,
        elementName?: string
    ): Promise<void> {

        this.log('Started waitForVisible method');

        try {
            await locator.waitFor({
                state: 'visible'
            });

            this.log(
                elementName
                    ? `Element visible: ${elementName}`
                    : 'Element is visible'
            );

            this.log('Completed waitForVisible method');

        } catch (error) {

            this.log('Failed waitForVisible method');
            throw error;
        }
    }

    // =========================
    // Is Visible
    // =========================

    async isVisible(
        locator: Locator,
        elementName?: string
    ): Promise<boolean> {

        this.log('Started isVisible method');

        try {
            const visible = await locator.isVisible();

            this.log(
                elementName
                    ? `${elementName} visible: ${visible}`
                    : `Element visible: ${visible}`
            );

            this.log('Completed isVisible method');

            return visible;

        } catch (error) {

            this.log('Failed isVisible method');
            throw error;
        }
    }
}