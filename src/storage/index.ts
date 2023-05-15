import * as sqlite3 from "better-sqlite3";
import profilesSql from "../schemas/profiles.sql";
import themesSql from "../schemas/themes.sql";
import { logger } from "../logger";
import { IUser, ITheme } from "../interfaces";

var globalDB: sqlite3.Database;

export function getAllThemes() {
    return globalDB.prepare("SELECT * FROM themes").all() as ITheme[];
}

export function getAllUsers() {
    let users: IUser[] = [];
    let themes = getAllThemes();
    let rows = globalDB.prepare("SELECT * FROM profiles").all() as IUser[];
    for (const u of rows) {
        let theme = themes.find((x: ITheme) => x.id == u.theme_id);
        if (theme !== undefined) {
            u.theme = theme;
        } else {
            u.theme = themes[0];
        }

        users.push(u);
    }

    return users;
}

export async function createNewUser(username: string): Promise<IUser> {
    let usr: IUser;
    const result = await globalDB
        .prepare("INSERT INTO profiles (name) VALUES (?)")
        .run([username]);
    usr = getAllUsers()[(result.lastInsertRowid as number) - 1];

    return usr;
}

export function setUpDatabase(db: sqlite3.Database) {
    logger.d("[db] Creating profile table");
    db.exec(profilesSql);
    logger.d("[db] Creating themes table");
    db.exec(themesSql);
}

export function getDatabase(file: string) {
    const db = new sqlite3(file);
    globalDB = db;
    return db;
}
