export default `
CREATE TABLE profiles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(20),
  theme_id INTEGER NOT NULL DEFAULT 1,
defaultTab TEXT NOT NULL DEFAULT "https://google.com"
);
`;
