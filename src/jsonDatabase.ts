import { readFileSync, writeFileSync, existsSync } from "fs";

export function loadData<T>(filename: string): T[] {
  if (!existsSync(filename)) {
    writeFileSync(filename, "[]", "utf-8");
  }
  const data = readFileSync(filename, "utf-8");
  return JSON.parse(data) as T[];
}

export function saveData<T>(filename: string, data: T[]): void {
  writeFileSync(filename, JSON.stringify(data, null, 2), "utf-8");
}
