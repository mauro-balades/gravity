const shell = require("shelljs");

console.log("Copy static assets...")

shell.rm('-rf', 'dist/ui')
shell.cp("-R", "src/ui", "dist/ui/");

console.log("Done.\n")