export default `
CREATE TABLE sitedata (
    origin NOT NULL,
    key NOT NULL,
    value,
    userID NOT NULL
);

CREATE UNIQUE INDEX sitedata_origin_key ON sitedata (origin, key);
PRAGMA user_version = 1;
`;