import { Protocol, ProtocolRequest, ProtocolResponse } from "electron";
import csp from "./csp";
import * as URIs from "./available";
import * as fs from "fs-extra";
import * as path from "path";
import * as mime from "mime-types";

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
            throw Error(`Unexpected response type! (${typeof path})`);
        }
    }

    var requestUrl = request.url;
    logger.v(`New request for gravity protocol ("${requestUrl}")`)

    if (requestUrl == URIs.GRAVITY_NEW_USER) {
        cb(200, undefined, path.join(__dirname, '..', 'ui', 'user-land', 'new-user', 'index.html'));
    } else if (requestUrl == URIs.GRAVITY_GLOBAL_STYLES) {
        cb(200, 'text/css; charset=utf-8', path.join(__dirname, '..', 'ui', 'global', 'gravity-core.css'));
    } else if (requestUrl == URIs.GRAVITY_COMPONENTS) {
        cb(200, 'application/javascript; charset=utf-8', path.join(__dirname, '..', 'ui', 'global', 'components', 'index.js'));
    } else if (requestUrl.startsWith(URIs.GRAVITY_NEW_USER)) {
        serveAppAsset(requestUrl, path.join(__dirname, '..', 'ui', 'user-land', 'new-user'), cb);
    } else if (requestUrl.startsWith(URIs.GRAVITY_ASSETS)) {
        serveAppAsset(requestUrl, path.join(__dirname, '..', 'assets'), cb);
    } else {
        cb(404, 'Not Found', '');
    }
}

async function serveAppAsset (requestUrl: string, dirPath: string, cb: (statusCode: number, contentType: string | undefined, path: string, CSP: string | undefined) => void, {CSP}: {CSP: string | undefined} = {CSP: undefined}) {
    const urlp = new URL(requestUrl)
    var pathname = urlp.pathname
    if (pathname === '' || pathname === '/') {
      pathname = '/index.html'
    }
    var filepath = path.join(dirPath, pathname)

    // make sure the file exists
    try {
      await fs.promises.stat(filepath)
    } catch (e) {
        return cb(404, 'Not Found', '', undefined);
    }
  
    // identify the mime type
    var contentType = mime.lookup(filepath)

    // serve
    cb(200, contentType as string, filepath, CSP)
}
