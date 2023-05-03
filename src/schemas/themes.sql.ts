export default `
CREATE TABLE themes (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	light BOOLEAN NOT NULL DEFAULT 0,
	button_radius VARCHAR(20) NOT NULL,
	input_radius VARCHAR(20) NOT NULL,
	button_background VARCHAR(20) NOT NULL,
	dialog_radius VARCHAR(20) NOT NULL,
	primary_color VARCHAR(20) NOT NULL,
	primary_background VARCHAR(20) NOT NULL,
	secondary_background VARCHAR(20) NOT NULL,
	name VARCHAR(20) NOT NULL
);

INSERT INTO themes (
	light,
	button_radius,
	input_radius,
	button_background,
	dialog_radius,
	primary_color,
	primary_background,
	secondary_background,
	name
) VALUES (
	TRUE,
	'5px',
	'5px',
	'#65a4d9',
	'5px',
	'#000',
	'#fff',
	'rgba(197, 197, 197, 0.38)',
	'light blue'
);
`