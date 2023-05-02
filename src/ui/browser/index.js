import querystring from 'querystring';

let query = querystring.parse(global.location.search);
let data = JSON.parse(query['?user'])