
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

        const filePath = path.join(reportDir, `${testName}.pdf`);
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


/*

import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import sizeOf from 'image-size';

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

        const filePath = path.join(reportDir, `${testName}.pdf`);
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
            doc.moveDown(1);

            if (fs.existsSync(step.screenshot)) {
                doc.addPage();

                doc.fontSize(14)
                    .text(`${currentPage} - ${step.method}`, 40, 40);

                doc.fontSize(11)
                    .text(step.status, 500, 42, { width: 70, align: 'right' });

                const imageBuffer = fs.readFileSync(step.screenshot);
                const dimensions = sizeOf(imageBuffer);

                const imageWidth = dimensions.width || 1;
                const imageHeight = dimensions.height || 1;
                const maxWidth = 520;
                const maxHeight = 700;

                const scale = Math.min(
                    maxWidth / imageWidth,
                    maxHeight / imageHeight
                );

                const width = imageWidth * scale;
                const height = imageHeight * scale;
                const x = (doc.page.width - width) / 2;

                doc.image(imageBuffer, x, 70, {
                    width,
                    height
                });
            }
        }

        doc.end();
        console.log(`PDF Report: ${filePath}`);
    }
}
*/


/*
import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import sizeOf from 'image-size';

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

        const filePath = path.join(reportDir, `${testName}.pdf`);
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
            doc.moveDown(1);

            if (fs.existsSync(step.screenshot)) {
                doc.addPage();

                doc.fontSize(14)
                    .text(`${currentPage} - ${step.method}`, 40, 40);

                doc.fontSize(11)
                    .text(step.status, 500, 42, { width: 70, align: 'right' });

                const dimensions = sizeOf(step.screenshot);
                const imageWidth = dimensions.width || 1;
                const imageHeight = dimensions.height || 1;

                const maxWidth = 520;
                const maxHeight = 700;

                const scale = Math.min(
                    maxWidth / imageWidth,
                    maxHeight / imageHeight
                );

                const width = imageWidth * scale;
                const height = imageHeight * scale;
                const x = (doc.page.width - width) / 2;

                doc.image(step.screenshot, x, 70, {
                    width,
                    height
                });
            }
        }

        doc.end();
        console.log(`PDF Report: ${filePath}`);
    }
}


*/
/*

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

        const filePath = path.join(reportDir, `${testName}.pdf`);
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

            doc.fontSize(13).text(step.method, 40, doc.y, { width: 350 });

            if (step.status === 'PASS') {
                doc.strokeColor('green')
                    .lineWidth(2)
                    .moveTo(410, doc.y + 7)
                    .lineTo(416, doc.y + 13)
                    .lineTo(426, doc.y)
                    .stroke();

                doc.fillColor('green')
                    .fontSize(12)
                    .text('PASS', 435, doc.y - 14, { width: 70 });
            } else {
                doc.strokeColor('red')
                    .lineWidth(2)
                    .moveTo(410, doc.y + 2)
                    .lineTo(422, doc.y + 14)
                    .moveTo(422, doc.y + 2)
                    .lineTo(410, doc.y + 14)
                    .stroke();

                doc.fillColor('red')
                    .fontSize(12)
                    .text('FAIL', 435, doc.y - 14, { width: 70 });
            }

            doc.fillColor('black');
            doc.moveDown(1);

            if (fs.existsSync(step.screenshot)) {
                doc.addPage();

                doc.fontSize(14)
                    .text(`${currentPage} - ${step.method}`, 40, 40);

                doc.fontSize(11)
                    .text(step.status, 500, 42, { width: 70, align: 'right' });

                const image = doc.openImage(step.screenshot);
                const maxWidth = 520;
                const maxHeight = 700;

                const scale = Math.min(
                    maxWidth / image.width,
                    maxHeight / image.height
                );

                const imageWidth = image.width * scale;
                const imageHeight = image.height * scale;
                const x = (doc.page.width - imageWidth) / 2;
                const y = 70;

                doc.image(step.screenshot, x, y, {
                    width: imageWidth,
                    height: imageHeight
                });
            }
        }

        doc.end();
        console.log(`PDF Report: ${filePath}`);
    }
}
*/

/*

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

        const filePath = path.join(reportDir, `${testName}.pdf`);
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

            doc.fontSize(13).text(step.method, 40, y, { width: 380 });

            doc.fontSize(13)
                .text(step.status === 'PASS' ? '✓ PASS' : '✗ FAIL', 430, y, {
                    width: 120,
                    align: 'right'
                });

            doc.moveDown(1);

            if (fs.existsSync(step.screenshot)) {
                doc.image(step.screenshot, {
                    fit: [500, 400],
                    align: 'center'
                });
            }

            doc.moveDown();
        }

        doc.end();
        console.log(`PDF Report: ${filePath}`);
    }
}

*/