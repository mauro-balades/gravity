import { app } from "electron";
import * as fs from "fs-extra";
import * as path from "path";
import { getAllUsers, setUpDatabase } from "../storage";
import { getDatabase } from "../storage";
import { logger } from "../logger";
import { createSetUpWindow } from "../windows/setup";
import { createBrowserWindow } from "../windows/browser";

export default function () {
    let dbFile = path.join(app.getPath('userData'), "configuration.db");
    logger.i(`Fetching database from ${dbFile}`);

    const dbExists = !fs.existsSync(dbFile);
    const db = getDatabase(dbFile);

    if (dbExists) {
        logger.v("No database found, creating a new one")
        setUpDatabase(db);
    }

    let users = getAllUsers();

    if (users.length == 0) {
        logger.i(`Opening welcome page for new user`);
        createSetUpWindow();
    } else {
        let user = users[0]; // TODO: open user decide dialog
        createBrowserWindow(user);
    }
}
