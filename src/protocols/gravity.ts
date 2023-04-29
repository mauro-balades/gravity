import { Protocol, ProtocolRequest, ProtocolResponse } from "electron";
import once from 'once';
import csp from "./csp";
import {gravity} from "./available";
import * as fs from "fs-extra";
import * as path from "path";

export function register (protocol: Protocol) {
    // setup the protocol handler
    protocol.registerStreamProtocol('beaker', gravityProtocol)
}

function gravityProtocol(request: ProtocolRequest, respond: (x: ProtocolResponse) => void) {
    var cb = once((statusCode: number, contentType: string | undefined, path: string, CSP: string) => {
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
    })

    var requestUrl = request.url;
    if (requestUrl == gravity.NEW_USER) {

    } else {
        throw Error("Unexpected protocol URI found! (TODO: throw 404)");
    }
}
