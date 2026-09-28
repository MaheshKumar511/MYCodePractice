import * as XLSX from 'xlsx';

export type ExcelData = {
    email: string;
    password: string;
    cvv: number;
    name: string;
};

export class ExcelUtils {

    static readExcel(filePath: string, sheetName: string): ExcelData[] {
        const workbook = XLSX.readFile(filePath);
        const sheet = workbook.Sheets[sheetName];

        return XLSX.utils.sheet_to_json<ExcelData>(sheet, {
            defval: ''
        });
    }
}