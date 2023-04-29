export default `
CREATE TABLE IF NOT EXISTS theme (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	light BOOLEAN NOT NULL DEFAULT 0,
	primary_color VARCHAR(20) NOT NULL,
	secondary_color VARCHAR(20) NOT NULL,
	primary_background VARCHAR(20) NOT NULL,
	secondary_background VARCHAR(20) NOT NULL
);
`