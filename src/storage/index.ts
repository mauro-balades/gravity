import { Database } from "sqlite3";
import profilesSql from "../schemas/profiles.sql";
import themesSql from "../schemas/themes.sql";

export function setUpDatabase(db: Database) {
    db.exec(profilesSql);
    db.exec(themesSql);
}

export function getDatabase(file: string) {
    const db = new Database(file);
    return db;
}
