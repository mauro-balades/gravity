export default `
CREATE TABLE themes (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	light BOOLEAN NOT NULL DEFAULT 0,
	glass_opacity REAL NOT NULL DEFAULT 0.5,
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
	glass_opacity,
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
	0.5,
	'5px',
	'5px',
	'#65a4d9',
	'5px',
	'#000',
	'#fff',
	'rgba(197, 197, 197, 0.38)',
	'Transparent (light)'
);

INSERT INTO themes (
	light,
	glass_opacity,
	button_radius,
	input_radius,
	button_background,
	dialog_radius,
	primary_color,
	primary_background,
	secondary_background,
	name
) VALUES (
	FALSE,
	0.5,
	'5px',
	'5px',
	'#65a4d9',
	'5px',
	'#fff',
	'#000',
	'rgba(64, 64, 64, 0.38)',
	'Transparent (dark)'
);

INSERT INTO themes (
	light,
	glass_opacity,
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
	0.9,
	'5px',
	'5px',
	'#65a4d9',
	'5px',
	'#000',
	'#fff',
	'linear-gradient(135deg, rgba(225,179,245,1) 0%, rgba(155,157,226,1) 100%)',
	'Universe (light)'
);

INSERT INTO themes (
	light,
	glass_opacity,
	button_radius,
	input_radius,
	button_background,
	dialog_radius,
	primary_color,
	primary_background,
	secondary_background,
	name
) VALUES (
	FALSE,
	0.9,
	'5px',
	'5px',
	'#65a4d9',
	'5px',
	'#fff',
	'#141417',
	'linear-gradient(135deg, rgba(225,179,245,1) 0%, rgba(155,157,226,1) 100%)',
	'Universe (dark)'
);
`;
