export default `
CREATE TABLE history (
     id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
    url TEXT NOT NULL,
   date INTEGER NOT NULL,
 userID INTEGER NOT NULL
);
`;
