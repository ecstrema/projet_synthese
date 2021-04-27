const fs = require('fs');
const path = require('path');

const outputFolder = "../csv";
if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder);
}

const dataFolder = "../data";
fs.readdirSync(dataFolder).map(fileName => path.join(dataFolder, fileName))
    .filter(fileName => fs.lstatSync(fileName).isFile())
    .forEach(fileName => {
        fs.readFile(fileName, 'utf8' , (err, contents) => {
            if (err) {
                console.error(err);
                return
            }
            try {
                let result = contents.slice(1, -1); // remove array definition
                // {"x":1619443143146,"y":3.4}, ...
                result = result.replace(/\},\{/ig, "}{")
                result = result.replace(/\{"x":([\w\.]*),"y":([\w\.]*)\}/ig, "$1,$2\n")
                result = "x,y\n" + result; // add column labels
                fs.writeFile(path.join(outputFolder, path.basename(fileName, ".json")) + ".csv", result, (err) => {
                    if (err) {
                        console.error(err);
                    }
                })
            } catch (error) {
                console.error(error);
            }
        })
    });
