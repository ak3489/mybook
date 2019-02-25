'use strict'
const autop = require('./src/autop.js');

const writeJson = require('./src/writeJson.js');

const path = require('path')

const fs = require('fs')

const iconv = require('iconv-lite')

//读取文件夹名
// const  fs = require('fs');
const  join = require('path').join;
/**
 * 
 * @param startPath  起始目录文件夹路径
 * @returns {Array}
 */

fs.writeFileSync("./static/books.json",  JSON.stringify({"data":[]}));
var txtName=[];
function findSync(startPath) {
    // let result=[];   
    function finder(path) {
        let files=fs.readdirSync(path);
        files.forEach((val,index) => {
            let fPath=join(path,val);
            let stats=fs.statSync(fPath);
            if(stats.isDirectory()) {
              txtName.push(fPath);
                // 递归读取文件夹下文件
                // finder(fPath)
            };
            // 读取文件名
            function getFileName(data) {
              return data.substring(6,data.indexOf("."));
            }
            fPath = getFileName(fPath);
            if(stats.isFile()){                          
              txtName.push({book:fPath,id:index});              
            } 
        });

    }
    finder(startPath);
    return txtName;
}
let fileNames = findSync('./books');

writeJson.writeJson(txtName,"./static/books.json");

//var chapterReg = /(\x{7b2c})(\s*)([\x{4e00}\x{4e8c}\x{4e09}\x{56db}\x{4e94}\x{516d}\x{4e03}\x{516b}\x{4e5d}\x{5341}\x{767e}\x{5343}0-9]+)(\s*)([\x{7ae0}\x{8282}]+)/u;

function writeFile(bookname){
  // var bookname = "道门往事";
  var txt;
  var data = fs.readFileSync("./books/" + bookname + ".txt", 'binary');
  // var buf = new Buffer(data, 'binary');
  var buf = Buffer.from(data, 'binary');
  var data = iconv.decode(buf, 'GBK');

  data = autop.autop(data);
  txt = data;

  var exists = fs.existsSync("./static/html");
  if(!exists){
    fs.mkdirSync("./static/html");
  }
  var folder = fs.existsSync("./static/html/" + bookname);
  if(!folder){
    fs.mkdirSync("./static/html/" + bookname);
  }
  var url = "./static/html/" + bookname + "/" + bookname + ".html";  
  fs.writeFileSync(url, txt);
  console.log(txtName[i].book);
  // fs.writeFileSync("./static/html/" + bookname + "/" + bookname + ".json",JSON.stringify({"data":[{"title":bookname,"id":0}]}) );
};
for(var i=0; i<txtName.length; i++){
  writeFile(txtName[i].book)
}
// writeFile("道门往事");