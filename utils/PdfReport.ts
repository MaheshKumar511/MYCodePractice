import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

export type ReportStep = {
    page: string;
    method: string;
    status: 'PASS' | 'FAIL';
    screenshot: string;
};

export class PdfReport {

    static generate(testName: string, steps: ReportStep[]) {
        const reportDir = path.join(process.cwd(), 'reports', 'pdf');
        fs.mkdirSync(reportDir, { recursive: true });

        const safeTestName = testName.replace(/[<>:"/\\|?*]/g, '_');
        const filePath = path.join(reportDir, `${safeTestName}.pdf`);

        const doc = new PDFDocument({ margin: 40 });
        doc.pipe(fs.createWriteStream(filePath));

        doc.fontSize(20).text('Test Execution Report', { align: 'center' });
        doc.moveDown();
        doc.fontSize(12).text(`Test: ${testName}`);
        doc.moveDown();

        let currentPage = '';

        for (const step of steps) {

            if (currentPage !== step.page) {
                currentPage = step.page;
                doc.addPage();
                doc.fontSize(18).text(currentPage);
                doc.moveDown();
            }

            const y = doc.y;

            doc.fontSize(13).text(step.method, 40, y, { width: 350 });

            if (step.status === 'PASS') {
                doc.strokeColor('green')
                    .lineWidth(2)
                    .moveTo(410, y + 7)
                    .lineTo(416, y + 13)
                    .lineTo(426, y)
                    .stroke();

                doc.fillColor('green')
                    .fontSize(12)
                    .text('PASS', 435, y, { width: 70 });
            } else {
                doc.strokeColor('red')
                    .lineWidth(2)
                    .moveTo(410, y + 2)
                    .lineTo(422, y + 14)
                    .moveTo(422, y + 2)
                    .lineTo(410, y + 14)
                    .stroke();

                doc.fillColor('red')
                    .fontSize(12)
                    .text('FAIL', 435, y, { width: 70 });
            }

            doc.fillColor('black');

            if (fs.existsSync(step.screenshot)) {
                doc.addPage();

                doc.fontSize(14)
                    .text(`${currentPage} - ${step.method}`, 40, 40);

                doc.fontSize(11)
                    .text(step.status, 500, 42, { width: 70, align: 'right' });

                const imageWidth = 500;
                const imageX = (doc.page.width - imageWidth) / 2;

                doc.image(step.screenshot, imageX, 70, {
                    width: imageWidth
                });
            }
        }

        doc.end();

        console.log(`PDF Report: ${filePath}`);
    }
}