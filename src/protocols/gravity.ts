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
    } else {
        throw Error("Unexpected protocol URI found! (TODO: throw 404)");
    }
}
