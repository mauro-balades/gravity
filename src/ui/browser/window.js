import querystring from 'querystring';
let query = querystring.parse(global.location.search);
let winID = JSON.parse(query['?winID'])

window.electronAPI.setWindowID(winID);