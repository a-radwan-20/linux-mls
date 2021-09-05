#!/usr/bin/env node
const fs = require('fs');
const chalk = require('chalk');
const {lstat} =  fs.promises;
const path = require('path');

const userArg = process.argv[2] || process.cwd();

fs.readdir(userArg, async (err, filenames) => {
    if (err) {
        console.log(err)
    }
    const sPromises = filenames.map(fName => {
        return lstat(path.join(userArg, fName))
    })
    const allNames = await Promise.all(sPromises);

    for (let name of allNames){
        const index = allNames.indexOf(name);

        if (name.isFile(filenames[index])) {
            console.log(chalk.blue(filenames[index]));
        } else {
            console.log(chalk.bold.red(filenames[index]));
        }
    }
})