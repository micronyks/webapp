var fs = require("fs-extra");
const path = require("path")

var source = '../../wide ui/';
var destination = `../../backup/${formatDate(new Date())}_${formatTime(new Date())}`;

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}

function formatDate(date) {
    return [
        padTo2Digits(date.getDate()),
        padTo2Digits(date.getMonth() + 1),
        date.getFullYear(),
    ].join('-');
}

function formatTime(date){
    return [
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
    ].join('.');
}

console.log(destination);


async function copyDir(src, dest) {
    await fs.mkdir(dest, { recursive: true });
    let entries = await fs.readdir(src, { withFileTypes: true });

    for (let entry of entries) {
        let srcPath = path.join(src, entry.name);
        let destPath = path.join(dest, entry.name);

        if (entry.isDirectory() && entry.name.includes('node_modules')) {
            continue;
        }

        entry.isDirectory() ?
            await copyDir(srcPath, destPath) :
            await fs.copyFile(srcPath, destPath);
    }
}


copyDir(source, destination);
