import querystring from "querystring";
let query = querystring.parse(global.location.search);
let winID = JSON.parse(query["?winID"]);
window.electronAPI.setWindowID(winID);

if (query["tabID"] !== undefined) {
    window.$tabID = JSON.parse(query["tabID"]);
}
