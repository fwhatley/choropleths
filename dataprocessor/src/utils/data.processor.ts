import { ApiDataModel } from "../models/api.data.model";
var fs = require('fs');
var os = require("os");
var mod10 = require('mod10');

export class DataProcessor {

    public generateLuhnPassingNumbers(filename: string, root: string, start: number, end: number, skus: string[], isIccid = false) {
        console.log(`generating ${filename}. Numbers in range: ${root}[${start} - ${end}]`)
        let list: any[] = [];
        for (let i = end - 1; i >= start; i--) {
            if (mod10(root + i + "")) {
                if (isIccid) {
                    let iccid = root + i + "";
                    let imsiBase = "3101500";
                    let imsi = imsiBase + iccid.slice(11, 19); // last 8 digits of imsi is iccid[12,20)
                    list.push([iccid, imsi]);

                } else {
                    let imei = root + i + "";
                    list.push([imei]);
                }
            }
        }

        let serialNumCountPerSku = list.length/skus.length;
        for(let i = 0; i < skus.length; i++) {
            let listToPrint = [];
            let fname = `${filename}_${skus[i]}`;
            for(let j = i * serialNumCountPerSku; j < (i+1) *  serialNumCountPerSku; j++) {
                listToPrint.push(list[j]);
            }
            this.writeToFile(fname, listToPrint);
        }

    }

    private writeToFile(filename: string, list: any[]): void {

        // write to .csv
        const csvString = this.getText(list, ',');
        const csvFilename = filename + ".csv";
        this.writeTextToFile(csvFilename, csvString, list.length);

        // write .txt
        const txtString = this.getText(list, '|');
        const txtFilename = filename + ".txt";
        this.writeTextToFile(txtFilename, txtString, list.length);

    }

    private writeTextToFile(filename: string, text: string, lineCount: number): void {
        fs.writeFile(filename, text, (err) => {
            // throws an error, you could also catch it here
            if (err) throw err;

            // success case, the file was saved
            console.log(`Succesfuly writen to file ${filename}: ${lineCount} items`);
        });
    }

    private getText(list: any[], separator: string = ','): string {
        let text = "";
        list.map((items) => {
            items.map((item: string, i: number) => {
                if (i > 0) {
                    text += separator;
                }
                text += item
                if (i+1 >= items.length) {
                    text += os.EOL;
                }
            });
        });

        return text;
    }

}
