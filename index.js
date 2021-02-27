#!/usr/bin/env node
const { dir } = require('console');
let fs = require('fs')
console.log(process.argv);

if (!process.argv[2] || process.argv[2].split('.').includes('log') === false || process.argv[2] === "-h") {
    return console.log(`
    
    -h == help or for how to use the CLI
    [location your file] -t json == convert .log to .json
    example : converter /var/log/nginx/error.log -t json
    [location your file] -t text == convert .log to .txt
    example: converter /var/log/nginx/error.log -t text

    usage: telkom [-h] [<path>] [<path> -t <extention>]
                  [<path> -o <new-path>] [<path> -t <extention> -o <new-path>] 

    description :
    path        path file log that you want to convert
    extention   extention you choice json or text, default text
    new-path    path that you want to put your file convert
    
    example :
    telkom /var/log/nginx/error.log -t text
    telkom /var/log/nginx/error.log -o /User/johnmayer/Desktop/nginxlog.txt
    telkom /var/log/nginx/error.log -t json -o /User/johnmayer/Desktop/nginxlog.json
    telkom /var/log/nginx/error.log -t text -o /User/johnmayer/Desktop/nginxlog.txt
    
    `)
}
const extention = ['text', 'json']

if (process.argv[2].split('.').includes('log')) {
    fs.readFile(process.argv[2], "utf-8", function (err, data) {
        let commandOutputIndex = 3
        if (err) {
            return console.log(err)
        }
        let thisData = []
        if (process.argv[3] === "-t" && process.argv[4] === "json") {
            data.split('\r\n').forEach(item => {
                const str = item.split(': ')
                const info = item.split(' ')
                thisData.push({
                    date: `${info[0]} ${info[1]}`,
                    log_category: `${info[2].slice(1, info[2].length - 1)}`,
                    message_code: info[1].slice(0, info[2].length - 1),
                    log: str[1]
                })
            })
            commandOutputIndex = 5
        } else {
            thisData = data
        }

        let target = process.argv[2].replace('text', 'txt')
        console.log(process.argv[commandOutputIndex]);
        if (process.argv[commandOutputIndex] === "-o" && extention.includes(process.argv[commandOutputIndex+1].split('.')[1]) === true) {
            console.log('here');
            target = process.argv[commandOutputIndex+1];
            const splitDir = target.split("/")
            const dir = splitDir.splice(0, splitDir.length - 1).join('/')
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, {
                    recursive: true
                });
            }
        }
        
        fs.writeFile(target, JSON.stringify(thisData, null, 2), function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("The file was convert to json!")
        })
    })
}

//         // convert to text
//         if (process.argv[3] === "-t" && process.argv[4] === "text" && process.argv[5] === "-o" && process.argv[6].split('.').includes('txt') === true) {
//             const location = process.argv[6]
//             var lopping = location.split('/')
//             var directory = []
//             for (var i = 0; i < lopping.length - 1; i++) {
//                 directory.push(lopping[i])

//             }
//             dir = directory.join("/")
//             if (!fs.existsSync(dir)) {
//                 fs.mkdirSync(dir, {
//                     recursive: true
//                 });
//             }
//             fs.writeFile(location, data, function (err) {
//                 if (err) {
//                     return console.log(err);
//                 }
//                 console.log("The file was convert to text!")
//             })
//         }
//         else if (process.argv[3] === "-t" && process.argv[4] === "text" && !process.argv[5] && !process.argv[6]) {
//             const location = 'logs-text/logs.txt'
//             var lopping = location.split('/')
//             var directory = []
//             for (var i = 0; i < lopping.length - 1; i++) {
//                 directory.push(lopping[i])

//             }
//             dir = directory.join("/")
//             if (!fs.existsSync(dir)) {
//                 fs.mkdirSync(dir, {
//                     recursive: true
//                 });
//             }
//             fs.writeFile(location, data, function (err) {
//                 if (err) {
//                     return console.log(err);
//                 }
//                 console.log("The file was convert to text!")
//             })
//         }

//         // convert log with output location directory
//         else if (process.argv[3] === "-o" && process.argv[4].split('.').includes('txt') === true) {
//             const location = process.argv[4]
//             var lopping = location.split('/')
//             var directory = []
//             for (var i = 0; i < lopping.length - 1; i++) {
//                 directory.push(lopping[i])

//             }
//             dir = directory.join("/")
//             if (!fs.existsSync(dir)) {
//                 fs.mkdirSync(dir, {
//                     recursive: true
//                 });
//             }
//             fs.writeFile(location, data, function (err) {
//                 if (err) {
//                     return console.log(err);
//                 }
//                 console.log("The file was convert to text!")
//             })
//         }
//         //default convert to text .txt
//         else if (process.argv[2].split('.').includes('log') && !process.argv[3] && !process.argv[4] && !process.argv[5] && !process.argv[6]) {
//             const location = 'logs-text/logs.txt'
//             var lopping = location.split('/')
//             var directory = []
//             for (var i = 0; i < lopping.length - 1; i++) {
//                 directory.push(lopping[i])

//             }
//             dir = directory.join("/")
//             if (!fs.existsSync(dir)) {
//                 fs.mkdirSync(dir, {
//                     recursive: true
//                 });
//             }
//             fs.writeFile(location, data, function (err) {
//                 if (err) {
//                     return console.log(err);
//                 }
//                 console.log("The file was convert to text!")
//             })
//         } else {
//             return console.log(`

//     -h == help or for how to use the CLI
//     [location your file] -t json == convert .log to .json
//     example : converter /var/log/nginx/error.log -t json
//     [location your file] -t text == convert .log to .txt
//     example: converter /var/log/nginx/error.log -t text

//     [location your file] -o [output directory file] == to convert files and set the output location
//     example: converter /var/log/nginx/error.log -o /User/johnmayer/Desktop/nginxlog.txt
//     [location your file] -t json/text -o [output location file] == to convert the file according to the command and  set the output location
//     example: converter /var/log/nginx/error.log -t json -o /User/johnmayer/Desktop/nginxlog.json
//     example: converter /var/log/nginx/error.log -t text -o /User/johnmayer/Desktop/nginxlog.txt
//     `)
//         }

//     })
// }