export default `
CREATE TABLE profiles (
      id   INTEGER PRIMARY KEY AUTOINCREMENT,
    name   VARCHAR(20),
theme_id   INTEGER NOT NULL DEFAULT 4,
defaultTab TEXT NOT NULL DEFAULT "gravity://new-tab"
);
`;
