const fs = require('fs');
const path = require('path');

const ln = (moduleName) => {
    if (!fs.existsSync(path.join(__dirname, './node_modules/' + moduleName))) {
        require('child_process').execSync('ln -s ../../' + moduleName + ' ./node_modules/' + moduleName, {
            cwd: __dirname
        });
    }
};
ln('sonorpc');