import { test } from '../../costomFixture/MaheshCostomfixture';

const expectedHeaders = ['Name', 'Memory', 'CPU', 'Disk', 'Network'];
const expectedProcesses = ['Chrome', 'Firefox', 'Internet Explorer', 'System'];

test.describe('Dynamic table interview practice', () => {
    test.beforeEach(async ({ maheshCosomfixture }) => {
        await maheshCosomfixture.tableHandling.navigate();
    });

    test('identifies column headers without relying on their order', async ({
        maheshCosomfixture,
    }) => {
        await maheshCosomfixture.tableHandling.verifyHeaders(expectedHeaders);
    });

    test('identifies all expected process names', async ({ maheshCosomfixture }) => {
        await maheshCosomfixture.tableHandling.verifyProcessNames(expectedProcesses);
    });

    test('checks that column headers are unique', async ({ maheshCosomfixture }) => {
        await maheshCosomfixture.tableHandling.verifyHeadersAreUnique();
    });

    test('checks that process names are unique', async ({ maheshCosomfixture }) => {
        await maheshCosomfixture.tableHandling.verifyProcessNamesAreUnique();
    });

    test('checks that each table row contains a value for every header', async ({
        maheshCosomfixture,
    }) => {
        await maheshCosomfixture.tableHandling.verifyEveryRowHasValues();
    });

    test('finds the Chrome CPU value using process and column names', async ({
        maheshCosomfixture,
    }) => {
        await maheshCosomfixture.tableHandling.verifyCellFormat('Chrome', 'CPU', /^\d+(?:\.\d+)?%$/);
    });

    test('finds every expected process row dynamically', async ({ maheshCosomfixture }) => {
        for (const processName of expectedProcesses) {
            await maheshCosomfixture.tableHandling.verifyProcessCanBeLocated(processName);
        }
    });

    test('validates Memory values and units for every process', async ({ maheshCosomfixture }) => {
        await maheshCosomfixture.tableHandling.verifyMetricColumnFormat(
            'Memory',
            /^\d+(?:\.\d+)?\s*MB$/,
        );
    });

    test('validates CPU percentages for every process', async ({ maheshCosomfixture }) => {
        await maheshCosomfixture.tableHandling.verifyMetricColumnFormat('CPU', /^\d+(?:\.\d+)?%$/);
    });

    test('validates Disk values and units for every process', async ({ maheshCosomfixture }) => {
        await maheshCosomfixture.tableHandling.verifyMetricColumnFormat(
            'Disk',
            /^\d+(?:\.\d+)?\s*MB\/s$/,
        );
    });

    test('validates Network values and units for every process', async ({ maheshCosomfixture }) => {
        await maheshCosomfixture.tableHandling.verifyMetricColumnFormat(
            'Network',
            /^\d+(?:\.\d+)?\s*Mbps$/,
        );
    });

    test('compares Chrome CPU in the table with the yellow summary label', async ({
        maheshCosomfixture,
    }) => {
        await maheshCosomfixture.tableHandling.verifyChromeCpuMatchesSummary();
    });

    test('validates the format of the yellow Chrome CPU summary', async ({
        maheshCosomfixture,
    }) => {
        await maheshCosomfixture.tableHandling.verifyChromeCpuSummaryFormat();
    });

    test('finds a different process metric using its column name', async ({
        maheshCosomfixture,
    }) => {
        await maheshCosomfixture.tableHandling.verifyCellFormat(
            'System',
            'Disk',
            /^\d+(?:\.\d+)?\s*MB\/s$/,
        );
    });

    test('finds process rows after reload without relying on row position', async ({
        maheshCosomfixture,
    }) => {
        await maheshCosomfixture.tableHandling.verifyRowsAfterReload(expectedProcesses);
    });
});
