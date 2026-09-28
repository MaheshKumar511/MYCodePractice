/*

import * as XLSX from 'xlsx';

export class ExcelUtils {

    static readExcel(filePath: string, sheetName: string) {
        const workbook = XLSX.readFile(filePath);
        const sheet = workbook.Sheets[sheetName];
        return XLSX.utils.sheet_to_json(sheet, { defval: '' });
    }
}


/*
import * as XLSX from 'xlsx';

export class ExcelUtils {

    static readExcel(filePath: string, sheetName: string) {
        const workbook = XLSX.readFile(filePath);
        const sheet = workbook.Sheets[sheetName];
        const rows = XLSX.utils.sheet_to_json<string[]>(sheet, { header: 1, defval: '' });
        const headers = rows[0] as string[];

        return rows.slice(1).map(row =>
            headers.reduce((data, header, index) => {
                data[header] = row[index];
                return data;
            }, {} as Record<string, string | number>)
        );
    }
}
    */



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