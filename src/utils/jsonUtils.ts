import * as fs from "fs";
import * as path from "path";

// Liest Testdaten aus einer JSON-Datei
export function readTestData(fileName: string) {
    try {
        const filePath = path.join(__dirname, `../data/${fileName}`);
        const rawData = fs.readFileSync(filePath, "utf-8");
        return JSON.parse(rawData);
    } catch (error) {
        throw new Error(`Failed to read or parse test data file: ${fileName}. Error: ${error.message}`);
    }
}
