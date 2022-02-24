const fs = require('fs');
const path = require('path');
btnCreate = document.getElementById('btnCreate');
btnRead = document.getElementById('btnRead');
btnDelete = document.getElementById('btnDelete');
fileName = document.getElementById('fileName');
fileContents = document.getElementById('fileContents');

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
    console.log('btnDelete')

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