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
const exts = ['txt', 'json']

if (process.argv[2].split('.').includes('log')) {
    fs.readFile(process.argv[2], "utf-8", function (err, data) {
        let commandOutputIndex = 3
        if (err) {
            return console.log(err)
        }
        let thisData = data
        console.log(data);
        if (process.argv[3] === "-t") {
            commandOutputIndex = 5
            if (process.argv[4] === "json") {
                thisData = []
                data.split('\r\n').forEach(item => {
                    const info = item.split(' ')
                    thisData.push({
                        date: `${info[0]} ${info[1]}`,
                        log_category: `${info[2].slice(1, info[2].length - 1)}`,
                        message_code: info[1].slice(0, info[2].length - 1),
                        log: info.splice(4, info.length).join(' ')
                    })
                })
                thisData = JSON.stringify(thisData, null, 2)
            }
        }
        const ext = (process.argv[4] || 'text').replace('text', 'txt')
        let target = process.argv[2].replace('.log', `.${ext}`)
        console.log('la', process.argv[commandOutputIndex + 1]);
        if (process.argv[commandOutputIndex] === "-o" && exts.includes(process.argv[commandOutputIndex + 1].split('.')[1]) === true) {
            console.log('here', commandOutputIndex);
            target = process.argv[commandOutputIndex + 1];
            const splitDir = target.split("/")
            const dir = splitDir.splice(0, splitDir.length - 1).join('/')
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, {
                    recursive: true
                });
            }
        }
        fs.writeFile(target, thisData, function (err) {
            if (err) {
                return console.log(err);
            }
            console.log(`The file was convert to ${ext}!`)
        })
    })
}
