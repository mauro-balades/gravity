import { Database } from "sqlite3";
import profilesSql from "../schemas/profiles.sql";
import themesSql from "../schemas/themes.sql";
import { logger } from "../logger";

export function setUpDatabase(db: Database) {
    logger.d("  [db] Creating profile table");
    db.exec(profilesSql);
    logger.d(" [db] Creating themes table");
    db.exec(themesSql);
}

export function getDatabase(file: string) {
    const db = new Database(file);
    return db;
}
