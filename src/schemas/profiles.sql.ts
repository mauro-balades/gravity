
export default `
CREATE TABLE IF NOT EXISTS profiles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(20),
 theme SMALLINT(20) NOT NULL DEFAULT '0'
);
`;