import { existsSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { DatabaseSync } from 'node:sqlite';

const source = resolve(process.env.TEND_DB_PATH || process.argv[2] || './data/comments.sqlite');
const target = resolve(process.env.TEND_BACKUP_PATH || process.argv[3] || `./backups/comments-${new Date().toISOString().replace(/[:.]/g, '-')}.sqlite`);

if (!existsSync(source)) throw new Error(`Database does not exist: ${source}`);
mkdirSync(dirname(target), { recursive: true });
rmSync(target, { force: true });

const database = new DatabaseSync(source);
const escapedTarget = target.replace(/'/g, "''");
database.exec(`VACUUM INTO '${escapedTarget}'`);
database.close();
console.log(`Backup written to ${target}`);
