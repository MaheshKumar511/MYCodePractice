import { Locator, Page, expect } from '@playwright/test';
import { PlaywrightWrapper } from '../../costomFixture/common/PlaywrightWrapper';

export class TableHandlingPage extends PlaywrightWrapper {
    private tbl_process: () => Locator;
    private col_headers: () => Locator;
    private rows_process: () => Locator;
    private txt_chromeCpu: () => Locator;

    constructor(
        page: Page,
        private screenshotStep: (name: string, fn: () => Promise<void>) => Promise<void>
    ) {
        super(page);

        this.tbl_process = () => {
            return this.page.locator('table.table-striped');
        };

        this.col_headers = () => {
            return this.tbl_process().locator('thead th');
        };

        this.rows_process = () => {
            return this.tbl_process().locator('tbody tr');
        };

        this.txt_chromeCpu = () => {
            return this.page.locator('#chrome-cpu');
        };
    }

    private rowByProcessName(processName: string): Locator {
        return this.rows_process().filter({
            has: this.page.getByRole('cell', { name: processName, exact: true }),
        });
    }

    private async cellByProcessAndColumn(processName: string, columnName: string): Promise<Locator> {
        const headers = (await this.col_headers().allTextContents()).map((text) => text.trim());
        const columnIndex = headers.indexOf(columnName);

        if (columnIndex === -1) {
            throw new Error(`Table column "${columnName}" was not found.`);
        }

        return this.rowByProcessName(processName).getByRole('cell').nth(columnIndex);
    }

    async navigate() {
        await this.screenshotStep('Navigate To Dynamic Table', async () => {
            await this.goto('https://practice.expandtesting.com/dynamic-table');
            await this.expectVisible(this.tbl_process(), 'Dynamic process table');
        });
    }

    async verifyHeaders(expectedHeaders: string[]) {
        await this.screenshotStep('Verify Table Headers', async () => {
            await expect(this.col_headers()).toHaveCount(expectedHeaders.length);
            const actualHeaders = (await this.col_headers().allTextContents())
                .map((text) => text.trim())
                .sort();
            expect(actualHeaders).toEqual([...expectedHeaders].sort());
        });
    }

    async verifyProcessNames(expectedProcesses: string[]) {
        await this.screenshotStep('Verify Process Names', async () => {
            const actualProcesses = (await this.rows_process().locator('td:first-child').allTextContents())
                .map((text) => text.trim())
                .sort();
            expect(actualProcesses).toHaveLength(expectedProcesses.length);
            expect(actualProcesses).toEqual([...expectedProcesses].sort());
        });
    }

    async verifyHeadersAreUnique() {
        await this.screenshotStep('Verify Table Headers Are Unique', async () => {
            const headers = (await this.col_headers().allTextContents())
                .map((text) => text.trim());
            expect(new Set(headers).size).toBe(headers.length);
        });
    }

    async verifyProcessNamesAreUnique() {
        await this.screenshotStep('Verify Process Names Are Unique', async () => {
            const processNames = (await this.rows_process().locator('td:first-child').allTextContents())
                .map((text) => text.trim());
            expect(new Set(processNames).size).toBe(processNames.length);
        });
    }

    async verifyEveryRowHasValues() {
        await this.screenshotStep('Verify Every Table Row Has Values', async () => {
            const headerCount = await this.col_headers().count();
            const tableRows = await this.rows_process().evaluateAll((rows) =>
                rows.map((row) =>
                    Array.from(row.querySelectorAll('td'), (cell) => cell.textContent?.trim() ?? ''),
                ),
            );

            expect(tableRows.length).toBeGreaterThan(0);
            for (const row of tableRows) {
                expect(row).toHaveLength(headerCount);
                expect(row.every((cell) => cell.length > 0)).toBe(true);
            }
        });
    }

    async verifyProcessCanBeLocated(processName: string) {
        await this.screenshotStep(`Find ${processName} Row Dynamically`, async () => {
            await expect(this.rowByProcessName(processName)).toHaveCount(1);
            await this.expectVisible(this.rowByProcessName(processName), `${processName} row`);
        });
    }

    async verifyMetricColumnFormat(columnName: string, format: RegExp) {
        await this.screenshotStep(`Verify ${columnName} Values For Every Process`, async () => {
            const processNames = (await this.rows_process().locator('td:first-child').allTextContents())
                .map((text) => text.trim());

            for (const processName of processNames) {
                const metricCell = await this.cellByProcessAndColumn(processName, columnName);
                await this.expectVisible(metricCell, `${processName} ${columnName} cell`);
                expect(await metricCell.innerText()).toMatch(format);
            }
        });
    }

    async verifyCellFormat(processName: string, columnName: string, format: RegExp) {
        await this.screenshotStep(`Verify ${processName} ${columnName} Cell`, async () => {
            const cell = await this.cellByProcessAndColumn(processName, columnName);
            await this.expectVisible(cell, `${processName} ${columnName} cell`);
            expect(await cell.innerText()).toMatch(format);
        });
    }

    async verifyChromeCpuSummaryFormat() {
        await this.screenshotStep('Verify Chrome CPU Summary Format', async () => {
            await this.expectVisible(this.txt_chromeCpu(), 'Chrome CPU summary');
            await expect(this.txt_chromeCpu()).toContainText(/^Chrome CPU:\s*\d+(?:\.\d+)?%/);
        });
    }

    async verifyChromeCpuMatchesSummary() {
        await this.screenshotStep('Verify Chrome CPU Summary', async () => {
            const chromeCpu = await (await this.cellByProcessAndColumn('Chrome', 'CPU')).innerText();
            await this.expectVisible(this.txt_chromeCpu(), 'Chrome CPU summary');
            await expect(this.txt_chromeCpu()).toContainText(`Chrome CPU: ${chromeCpu}`);
        });
    }

    async verifyRowsAfterReload(expectedProcesses: string[]) {
        await this.screenshotStep('Verify Dynamic Rows After Reload', async () => {
            await this.page.reload();
            await this.expectVisible(this.tbl_process(), 'Dynamic process table after reload');

            const actualProcesses = (await this.rows_process().locator('td:first-child').allTextContents())
                .map((text) => text.trim())
                .sort();
            expect(actualProcesses).toEqual([...expectedProcesses].sort());

            const chromeCpu = await (await this.cellByProcessAndColumn('Chrome', 'CPU')).innerText();
            await expect(this.txt_chromeCpu()).toContainText(`Chrome CPU: ${chromeCpu}`);
        });
    }
}
