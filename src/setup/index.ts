import { app } from "electron";
import * as fs from "fs-extra";
import * as path from "path";
import { setUpDatabase } from "../storage";
import { getDatabase } from "../storage";
import { logger } from "../logger";
import { createSetUpWindow } from "../windows/setup";

export default function () {
    let dbFile = path.join(app.getPath('userData'), "configuration.db");
    logger.i(`Fetching database from ${dbFile}`);
    const db = getDatabase(dbFile);

    if (/*TODO: add this once it's done: '!'*/fs.existsSync(dbFile)) {
        logger.v("No database found, creating a new one")
        setUpDatabase(db);

        logger.i(`Opening welcome page for new user`);
        createSetUpWindow();
    } else {
        throw Error("TODO");
    }

}
