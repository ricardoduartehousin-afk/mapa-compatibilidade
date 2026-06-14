import initSqlJs from 'sql.js';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DB_PATH = join(__dirname, 'data.db');

let db = null;

export async function initDb() {
  const SQL = await initSqlJs();

  if (fs.existsSync(DB_PATH)) {
    const buffer = fs.readFileSync(DB_PATH);
    db = new SQL.Database(buffer);
  } else {
    db = new SQL.Database();
  }

  db.run(`
    CREATE TABLE IF NOT EXISTS leads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nomeP1 TEXT NOT NULL,
      dataP1 TEXT NOT NULL,
      nomeP2 TEXT NOT NULL,
      dataP2 TEXT NOT NULL,
      email TEXT NOT NULL,
      whatsapp TEXT NOT NULL,
      acceptedTerms INTEGER DEFAULT 0,
      status TEXT DEFAULT 'pendente',
      percentage INTEGER,
      asaas_id TEXT,
      email_sent INTEGER DEFAULT 0,
      createdAt TEXT DEFAULT (datetime('now', '-3 hours')),
      updatedAt TEXT DEFAULT (datetime('now', '-3 hours'))
    )
  `);

  try {
    db.run("SELECT email_sent FROM leads LIMIT 0");
  } catch (_) {
    try {
      db.run("ALTER TABLE leads ADD COLUMN email_sent INTEGER DEFAULT 0");
      saveDb();
    } catch (_2) {}
  }

  saveDb();

  try {
    db.run("ALTER TABLE leads ADD COLUMN email_sent INTEGER DEFAULT 0");
    saveDb();
  } catch (_) {}

  return db;
}

export function saveDb() {
  if (!db) return;
  const data = db.export();
  const buffer = Buffer.from(data);
  fs.writeFileSync(DB_PATH, buffer);
}

export function getDb() {
  return db;
}

export function queryAll(sql, params = []) {
  const stmt = db.prepare(sql);
  if (params.length > 0) stmt.bind(params);
  const rows = [];
  while (stmt.step()) {
    rows.push(stmt.getAsObject());
  }
  stmt.free();
  return rows;
}

export function queryOne(sql, params = []) {
  const stmt = db.prepare(sql);
  if (params.length > 0) stmt.bind(params);
  const row = stmt.step() ? stmt.getAsObject() : null;
  stmt.free();
  return row;
}

export function execute(sql, params = []) {
  db.run(sql, params);
  const lastId = getLastInsertId();
  saveDb();
  return { changes: db.getRowsModified(), lastInsertRowid: lastId };
}

export function getLastInsertId() {
  const stmt = db.prepare('SELECT last_insert_rowid() as id');
  const result = stmt.step() ? stmt.getAsObject() : { id: null };
  stmt.free();
  return result.id;
}
