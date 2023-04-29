const shell = require("shelljs");

shell.rm('-rf', 'dist/ui')
shell.cp("-R", "src/ui", "dist/ui/");

console.log("Done\n")