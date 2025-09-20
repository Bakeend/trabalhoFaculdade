import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

const DATA_DIR = "./data";

// Garante que a pasta data existe
if (!existsSync(DATA_DIR)) {
    mkdirSync(DATA_DIR);
}

export function loadData<T>(filename: string): T[] {
    const filePath = join(DATA_DIR, filename);
    if (!existsSync(filePath)) {
        writeFileSync(filePath, "[]", "utf-8");
    }
    const data = readFileSync(filePath, "utf-8");
    return JSON.parse(data) as T[];
}

export function saveData<T>(filename: string, data: T[]): void {
    const filePath = join(DATA_DIR, filename);
    writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}