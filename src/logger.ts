import l from 'logger';

export var logger: any;

export function createNewLogger() {
    logger = l.createLogger();
}