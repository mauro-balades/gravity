export default `
CREATE TABLE IF NOT EXISTS theme (
	light BOOLEAN() NOT NULL DEFAULT '0',
	id INT() AUTO_INCREMENT PRIMARY KEY,
	primary TEXT() NOT NULL,
	background TEXT() NOT NULL,
	secondary TEXT() NOT NULL,
);
`