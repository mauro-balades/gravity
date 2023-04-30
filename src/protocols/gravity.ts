import { Protocol, ProtocolRequest, ProtocolResponse } from "electron";
import csp from "./csp";
import * as URIs from "./available";
import * as fs from "fs-extra";
import * as path from "path";
import { logger } from "../logger";

export function register (protocol: Protocol) {
    // setup the protocol handler
    logger.i(`Registring "gravity://*" protocol`)
    protocol.registerStreamProtocol('gravity', gravityProtocol)
}

function gravityProtocol(request: ProtocolRequest, respond: (x: ProtocolResponse) => void) {
    var cb = (statusCode: number, contentType: string | undefined, path: string, CSP: string | undefined = undefined) => {
        const headers = {
          'Cache-Control': 'no-cache',
          'Content-Type': (contentType || 'text/html; charset=utf-8'),
          'Content-Security-Policy': CSP || csp,
          'Access-Control-Allow-Origin': '*'
        }
        if (typeof path === 'string') {
          respond({statusCode, headers, data: fs.createReadStream(path)})
        } else {
            throw Error("Unexpected response type!");
        }
    }

    var requestUrl = request.url;
    logger.v(`New request for gravity protocol ("${requestUrl})`)

    if (requestUrl == URIs.GRAVITY_NEW_USER) {
        cb(200, undefined, path.join(__dirname, '..', 'ui', 'user-land', 'newUser', 'index.html'));
    } else if (requestUrl == URIs.GRAVITY_GLOBAL_STYLES) {
        cb(200, 'text/css; charset=utf-8', path.join(__dirname, '..', 'ui', 'global', 'gravity-core.css'));
    } else if (requestUrl == URIs.GRAVITY_GLOBAL_SCRIPTS) {
        cb(200, 'text/css; charset=utf-8', path.join(__dirname, '..', 'ui', 'global', 'gravity-core.asset.js'));
    } else if (requestUrl == URIs.GRAVITY_COMPONENTS) {
        cb(200, 'application/javascript; charset=utf-8', path.join(__dirname, '..', 'ui', 'global', 'components', 'index.js'));
    } else {
        cb(404, 'text/html; charset=utf-8', /*TODO: an actual error page*/path.join(__dirname, '..', 'ui', 'user-land', 'newUser', 'index.html'));
    }
}
