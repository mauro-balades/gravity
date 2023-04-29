import { app } from "electron";
import * as fs from "fs-extra";
import * as path from "path";
import { setUpDatabase } from "../storage";
import { getDatabase } from "../storage";

export default function () {
    let dbFile = path.join(app.getPath('userData'), "configuration.db");
    const db = getDatabase(dbFile);

    if (fs.existsSync(dbFile)) {
        setUpDatabase(db);
    } else {
    }

}
