const shell = require("shelljs");
const fs = require("fs");
const path = require("path");

console.log(" [assets] Copy static assets...");

shell.cd("src");

shell.exec(`find -name "*.html"     | xargs cp --parents -t ../dist`);
console.log(" [assets] HTML files... Done");
shell.exec(`find -name "*.css"      | xargs cp -a --parents -t ../dist`);
console.log(" [assets] CSS files... Done");
shell.exec(`find -name "*.js"      | xargs cp --parents -t ../dist`);
console.log(" [assets] Javascript files... Done");
shell.exec(`cp -rp assets ../dist`);
console.log(" [assets] Javascript files... Done");
// shell.exec(`find -name "*.asset.js" | xargs cp --parents -t ../dist`);

console.log(" [assets] Done.");
console.log("\n [bundle] Bundling all the UI scripts...");

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
        if (f.endsWith(".js") && !f.endsWith(".asset.js") && !f.endsWith(".bundle.js")) {
            let output = f.replace(".js", ".bundle.js");

            let shouldCompile = false;
            try {
                const outputFileMtime = fs.statSync(output).mtime;
                const originalFileMtime = fs.statSync(f.replace(`${__dirname}/dist/ui/`, `${__dirname}/src/ui/`)).mtime;

                shouldCompile = originalFileMtime > outputFileMtime;
            } catch (e) {
                console.log(` [bundle] error: ${e}`)
                shouldCompile = true;
            }

            // shouldCompile = true; // for development or force compile

            if (shouldCompile) {
                let parsed = path.parse(f);
                console.log(" [bundle]", f, " -> ", output);

                let ex = shell.exec(`webpack ${f} --output-filename ${parsed.name}.bundle.js --target web --output-path ${parsed.dir}`);
                if (ex.code != 0) { process.exit(1); }

                console.log(" [bundle]", output, " -> ", f);

                shell.rm(f);
                shell.cp(output, f);
            } else {
                console.log(` [bundle] File '${f}' hasn't been changed, ignoring`);

                shell.rm(f);
                shell.cp(output, f);
            }
        }
    }

    console.log(" [bundle] Done.\n");
});

