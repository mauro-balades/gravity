export default `
CREATE TABLE IF NOT EXISTS theme (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	light BOOLEAN NOT NULL DEFAULT 0,
	button_radius VARCHAR(20) NOT NULL,
	input_radius VARCHAR(20) NOT NULL,
	dialog_raius VARCHAR(20) NOT NULL,
	primary_color VARCHAR(20) NOT NULL,
	secondary_color VARCHAR(20) NOT NULL,
	primary_background VARCHAR(20) NOT NULL,
	secondary_background VARCHAR(20) NOT NULL
);
`