import { Database } from "sqlite3";
import profilesSql from "../schemas/profiles.sql";
import themesSql from "../schemas/themes.sql";
import { logger } from "../logger";
import { IUser, ITheme } from "../interfaces";

var globalDB: Database;

export function getAllThemes() {
    let themes: ITheme[] = [];
    globalDB.all("SELECT * FROM themes", function(err, rows) {
        themes = rows as ITheme[];
    });

    return themes;
}

export function getAllUsers() {
    let users: IUser[] = [];
    let themes = getAllThemes();
    globalDB.all("SELECT * FROM profiles", function(err, rows) {
        for (const u of users) {
            let theme = themes.find((x: ITheme) => { x.id = u.theme_id });
            if (theme !== undefined) {
                u.theme = theme;
            } else {
                u.theme = themes[0];
            }

            users.push(u);
        }
    });

    return users;
}

export function setUpDatabase(db: Database) {
    logger.d("  [db] Creating profile table");
    db.exec(profilesSql);
    logger.d(" [db] Creating themes table");
    db.exec(themesSql);
}

export function getDatabase(file: string) {
    const db = new Database(file);
    globalDB = db;
    return db;
}
