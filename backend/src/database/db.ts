import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Database from "better-sqlite3";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbDir = path.join(__dirname);
if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
}
const dbPath = path.join(__dirname, 'database.db');
export const db = new Database(dbPath);
db.pragma('journal_mode = WAL');
