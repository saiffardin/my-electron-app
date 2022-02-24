const fs = require('fs');
const path = require('path');

let btnRead = document.getElementById('btnRead');
let btnCreate = document.getElementById('btnCreate');
let btnDelete = document.getElementById('btnDelete');
let fileName = document.getElementById('fileName');
let fileContents = document.getElementById('fileContents');

let pathName = path.join(__dirname, 'Files');

console.log('pathName:', pathName)

btnCreate.addEventListener('click', function () {
    let file = path.join(pathName, fileName.value)
    let contents = fileContents.value
    fs.writeFile(file, contents, function (err) {
        if (err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    });
})


btnRead.addEventListener('click', function () {
    let file = path.join(pathName, fileName.value)

    fs.readFile(file, function (err, data) {
        if (err) {
            return console.log(err);
        }
        // reads the file and puts it into the 'fileContents' element
        fileContents.value = data
        console.log("The file was read!");
    })
})


btnDelete.addEventListener('click', function () {

    let file = path.join(pathName, fileName.value)

    fs.unlink(file, function (err) {
        if (err) {
            return console.log(err);
        }
        fileName.value = ''
        fileContents.value = ''
        console.log("The file was deleted!");
    })
})