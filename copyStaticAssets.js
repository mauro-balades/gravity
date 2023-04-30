const shell = require("shelljs");
const fs = require("fs");
const path = require("path");

console.log("Copy static assets...");

shell.cd("src");

shell.exec(`find -name "*.html"     | xargs cp --parents -t ../dist`);
shell.exec(`find -name "*.css"      | xargs cp --parents -t ../dist`);
shell.exec(`find -name "*.asset.js" | xargs cp --parents -t ../dist`);

console.log("Done.\n");

console.log("\n [browserify] Bundling all the UI scripts...");

// shell.exec(`find -name "dist/ui/*.js" | xargs browserify`);

var walk = function (dir, done) {
    var results = [];
    fs.readdir(dir, function (err, list) {
        if (err) return done(err);
        var i = 0;
        (function next() {
            var file = list[i++];
            if (!file) return done(null, results);
            file = path.resolve(dir, file);
            fs.stat(file, function (err, stat) {
                if (stat && stat.isDirectory()) {
                    walk(file, function (err, res) {
                        results = results.concat(res);
                        next();
                    });
                } else {
                    results.push(file);
                    next();
                }
            });
        })();
    });
};

walk(`${__dirname}/dist/ui/`, function (err, results) {
    if (err) throw err;

    for (let i = 0; i < results.length; i++) {
        let f = results[i];
        if (f.endsWith(".js") && !f.endsWith(".asset.js")) {
            let output = f.replace(".js", ".bundle.js");

            let parsed = path.parse(f);
            console.log(" [compiling]", f, " -> ", output);

            shell.exec(`webpack ${f} --output-filename ${parsed.name}.bundle.js --output-path ${parsed.dir}`);
            shell.rm(f);
            shell.mv(output, f);

            console.log(" [bundle mv]", output, " -> ", f);
        }
    }
});

console.log(" [browserify] Done.\n");
