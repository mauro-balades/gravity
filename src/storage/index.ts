import * as sqlite3 from "better-sqlite3";
import profilesSql from "../schemas/profiles.sql";
import historySql from "../schemas/history.sql";
import themesSql from "../schemas/themes.sql";
import sitedataSql from "../schemas/sitedata.sql";
import { logger } from "../logger";
import { IUser, ITheme, IHistoryItem, ISiteDataEntry } from "../interfaces";

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

export namespace sitedata {
    export async function appendSiteDataItem(item: ISiteDataEntry): Promise<void> {
        logger.d("[db] Appending new sitedata item:", item)
        const { key, value, origin, userID } = item;
        await globalDB
            .prepare(`INSERT OR REPLACE
                INTO sitedata (origin, key, value, userID)
                VALUES (?, ?, ?, ?)`)
            .run([origin, key, value, userID]);
        return;
    }
    
    export function getSiteDataItem(origin: string, key: any, user: IUser) {
        let row = globalDB.prepare(`SELECT value 
            FROM sitedata 
            WHERE 
                origin = ? AND 
                key = ? AND 
                userID = ?`)
            .get([ origin, key, user.id ]) as { value: any } | undefined; 
        return row?.value;
    }
}


export namespace history {
    export async function appendHistoryItem(item: IHistoryItem): Promise<void> {
        logger.d("[db] Appending new history item")
        const { title, url, date, userID } = item;
        await globalDB
            .prepare("INSERT INTO history (title, url, date, userID) VALUES (?, ?, ?, ?)")
            .run([title, url, date, userID]);
        return;
    }
    
    export function getHistoryItems(user: IUser) {
        let rows = globalDB.prepare(`SELECT * FROM history where userID = ${user.id} ORDER BY date DESC`).all() as IHistoryItem[];
        for (let row of rows) {
            row.favicon = sitedata.getSiteDataItem(row.url, 'favicon', user);
        }

        return rows;
    }
}

export function setUpDatabase(db: sqlite3.Database) {
    logger.d("[db] Creating profile table");
    db.exec(profilesSql);
    logger.d("[db] Creating themes table");
    db.exec(themesSql);
    logger.d("[db] Creating history table");
    db.exec(historySql);
    logger.d("[db] Creating sitedata table");
    db.exec(sitedataSql);
}

export function getDatabase(file: string) {
    const db = new sqlite3(file);
    globalDB = db;
    return db;
}
