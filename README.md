<h1 align="center"> CLI converter file.log to json or text(.txt)</h1>

<p align="center">
Task for Backend Developer
<br/>
  <a href="https://github.com/defri-ansyah/CLI-BE-TelkomTest"><strong>Explore the docs »</strong></a>
  <br /><br/>
  <a href="https://github.com/defri-ansyah/CLI-BE-TelkomTest">Report Bug</a>
  ·
  <a href="https://github.com/defri-ansyah/CLI-BE-TelkomTest">Request Feature</a>
</p>


### Requirements
1. <a href="https://nodejs.org/en/download/">Node Js</a>

### Installation
1. Clone the repo
```sh
git clone https://github.com/defri-ansyah/CLI-BE-TelkomTest.git
```
2. Install NPM packages
```
npm install
```
3. set global
```
npm link
```
4. run project
```
telkom
```

### Usage
```
-h == help or for how to use the CLI
[location your file] -t json == convert .log to .json
example : telkom /var/log/nginx/error.log -t json
[location your file] -t text == convert .log to .txt
example: telkom /var/log/nginx/error.log -t text
-o == to be able to choose where to put the output file

usage: telkom [-h] [<path>] [<path> -t <extention>]
              [<path> -o <new-path>] [<path> -t <extention> -o <new-path>] 

description :
path        path file log that you want to convert
extention   extention you choice json or text, default text
new-path    path that you want to put your file convert
```

### Example
```
telkom /var/log/nginx/error.log -t text
telkom /var/log/nginx/error.log -t json
telkom /var/log/nginx/error.log -o /User/defri/Desktop/nginxlog.txt
telkom /var/log/nginx/error.log -t json -o /User/defri/Desktop/nginxlog.json
telkom /var/log/nginx/error.log -t text -o /User/defri/Desktop/nginxlog.txt
```

### Contact

- Email - defriansyah013@gmail.com
- LinkedIn - [Defri Ansyah](https://linkedin.com/in/defri-ansyah/)

---
Copyright © 2021 [Defri Ansyah](https://github.com/defri-ansyah)