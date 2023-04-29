import { app } from "electron";
import * as fs from "fs-extra";
import * as path from "path";
import { setUpDatabase } from "../storage";
import { getDatabase } from "../storage";
import { logger } from "../logger";

export default function () {
    let dbFile = path.join(app.getPath('userData'), "configuration.db");
    logger.info(`Fetching database from ${dbFile}`);
    const db = getDatabase(dbFile);

    if (fs.existsSync(dbFile)) {
        logger.info("No database found, creating a new one")
        setUpDatabase(db);
    } else {
    }

}
