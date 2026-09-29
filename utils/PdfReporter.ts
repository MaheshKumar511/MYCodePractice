import { Reporter, TestCase, TestResult } from '@playwright/test/reporter';
import { PdfReport, ReportStep } from './PdfReport';
import path from 'path';

export default class PdfReporter implements Reporter {

    onTestEnd(test: TestCase, result: TestResult) {
        const steps: ReportStep[] = [];

        for (const pageStep of result.steps) {
            for (const methodStep of pageStep.steps || []) {
                const failed = !!methodStep.error;
                const screenshotName = failed
                    ? `${methodStep.title}-FAILED.png`
                    : `${methodStep.title}.png`;

                steps.push({
                    page: pageStep.title,
                    method: methodStep.title,
                    status: failed ? 'FAIL' : 'PASS',
                    screenshot: path.join(
                        process.cwd(),
                        'test-results',
                        test.title,
                        screenshotName
                    )
                });
            }
        }

        if (steps.length) {
            PdfReport.generate(test.title, steps);
        }
    }
}