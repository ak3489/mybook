'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const autop = require('../src/autop.js');

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
// console.log( typeof txtName );
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

function writeJson(params){
  //现将json文件读出来
  fs.readFile("./static/books.json",function(err,data){
      if(err){
          return console.error(err);
      }                
      var books = data.toString();//将二进制的数据转换为字符串   
      books = JSON.parse(data);//将字符串转换为json对象
      books.data=params;//将传来的对象push进数组对象中
      books.total = books.data.length;//定义一下总条数，为以后的分页打基础
      var str = JSON.stringify(books);//因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
      fs.writeFile('./static/books.json',str,function(err){
          if(err){
              console.error(err);
          }
          // console.log('----------新增成功-------------');                        
      })
  })
};
    writeJson(txtName)  

//var chapterReg = /(\x{7b2c})(\s*)([\x{4e00}\x{4e8c}\x{4e09}\x{56db}\x{4e94}\x{516d}\x{4e03}\x{516b}\x{4e5d}\x{5341}\x{767e}\x{5343}0-9]+)(\s*)([\x{7ae0}\x{8282}]+)/u;

function writeFile(){
  var bookname = "道门往事";
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
  fs.writeFileSync(url, txtName + txt);
};
writeFile();




module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: false,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
