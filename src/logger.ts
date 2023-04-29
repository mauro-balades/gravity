const { createLogger } = require('ccipher'); 

export var logger: any;

export function createNewLogger() {
    logger = createLogger(undefined);
}