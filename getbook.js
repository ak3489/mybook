/**
 * 修改 Created by feverdestiny on 2017/9/22.
 */
// const autop = require('./src/autop.js');
const cheerio = require("cheerio");
const request = require("request");
const fs = require("fs");
const path = require("path");
const writeJson = require('./src/writeJson.js');
let count = 0; //叠加
let url = 'http://www.ebtang.com/book/2401/directory'; //小说Url
let list = []; //章节List
var mainUrl='';
let booksName = ''; //小说名称
let bookId = '';

/**
 * 获取小说目录页
 */
const books = function () {
    request(url, function (err, res, body) {
        if (!err && res.statusCode == 200) {
            console.log(`获取小说基本信息成功·······`)
            booksQuery(body);
        } else {
            console.log('err:' + err)
        }
    })
}
/**
 * 处理小说名称及其小说目录
 * @param {*} body 
 */
const booksQuery = function (body) {
    $ = cheerio.load(body);
    booksName = $('#bookDetail').attr('d-name'); //小说名称 
    bookId = $('#bookDetail').attr('d-id');
    mainUrl = 'http://www.ebtang.com/book/'+bookId+'/';   
    // console.log( bookId );
    $('#directoryList').find('b').each(function (i, e) { //获取章节UrlList
        list.push($(e).attr('d-id'));        
    });
    createFolder(path.join(__dirname, `/books/${booksName}.txt`)); //创建文件夹
    fs.createWriteStream(path.join(__dirname, `/books/${booksName}.txt`)) //创建txt文件
    console.log(`开始写入《${booksName}》·······`);
    // fs.appendFile(txtName,"./static/books.json");
    // function newbook(){
    //     var params = [];
    //     fs.readFile(path.join(__dirname,`/static/books.json`), function(err,data){
    //         if(err){
    //         return console.error(err);}
    //         var books = data.toString();
    //         books = JSON.parse(data);
    //         var booklenght = books.data.length;
    //         params.push({book:booksName,id:booklenght++});
    //         console.log( booklenght,books.data);
    //         books.data.concat(params);
    //         console.log(books.data);
    //         var str = JSON.stringify(books);
    //         fs.writeFile(path.join(__dirname,`/static/books.json`),str,function(err){
    //             if(err){
    //                 console.error(err);
    //             }
    //             console.log('----------新增成功-------------');                        
    //         })
    //         // writeJson.writeJson(str,path.join(__dirname,`/static/books.json`))    
    //     });
    // }
    // newbook();
    getBody(); //获取章节信息

}
/**
 * 获取章节页面信息
 * 
 */
const getBody = function () {  
    let primUrl = mainUrl + list[count];
    // console.log(primUrl)
    request(primUrl, function (err, res, body) {
        if (!err && res.statusCode == 200) {
            toQuery(body);
        } else {
            console.log('getBodyerr:' + err)
        }
    })
};
/**
 * 处理章节页面信息
 * @param {any} body 
 */
var aTitle = [];
const toQuery = function (body) {
    $ = cheerio.load(body);
    var zjUrl = 'http://www.ebtang.com/book/readbook/'+bookId+'/'+list[count]+'.json';
    const iconv = require('iconv-lite')
    var title=''; //获取章节标题  
    var content= '';
    request.get({url:zjUrl,encoding:null},function(err,response,body){
        var buf =  iconv.decode(body, 'utf-8'); 
        var jdata=JSON.parse(buf);
        title = (jdata.bookChapter.title).replace(/[\-\_\,\!\|\~\`\(\)\#\$\%\^\&\*\{\}\:\;\"\L\<\>\?]/g, '');
        var title1 = title.replace(/[\'\"\\\/\b\f\n\r\t]/g, '');
        var title2 = title1.replace(/\s+/g,"");
        title = title2;
        // title.replace(/[\'\"\\\/\b\f\n\r\t]/g, '');
        console.log(title);
        aTitle.push({title:title,id: count});
        content = jdata.bookChapter.content;
        // writeJson(aTitle)//执行写入章节标题json;
        writeJson.writeJson(aTitle,path.join(__dirname,`/static/html/${booksName}/${booksName}.json`))
        writeFs(title, content);//生成txt文件
        writeHtml(title, content);//生成html文件
        });
}

/**
 * 写入txt文件
 * @param {*} title 
 * @param {*} content 
 */
const writeFs = function (title, content) {
    // 添加数据
    fs.appendFile(path.join(__dirname, `/books/${booksName}.txt`), title, function (err) {
        // console.log(title);
        if (err) throw err;
    });
    fs.appendFile(path.join(__dirname, `/books/${booksName}.txt`), content, function (err) {
        if (err) {
            console.log(err)
        } else {
            console.log(title + '········保存成功')
            if (count + 1 < list.length) { //当前页码是否超过章节数
                count = count + 1;
                getBody();
            }
        }
    });
};
const writeHtml = function(title, content){
    // 添加数据
    // console.log(content);
    var contentTxt = content.replace(/\n/g,"<br/>");    
    // console.log(contentTxt);
    var folder = fs.existsSync(path.join(__dirname, `/static/html/${booksName}`));
    if(!folder){
        fs.mkdirSync(path.join(__dirname, `/static/html/${booksName}`));
    }
    fs.writeFileSync(path.join(__dirname, `/static/html/${booksName}/${booksName}.json`), JSON.stringify({"data":[]})); 
    fs.writeFileSync(path.join(__dirname, `/static/html/${booksName}/${title.replace(/\s+/g,"")}.html`), title + contentTxt); 
};
/**
 * 创建文件夹
 * 
 * @param {any} to 
 */
const createFolder = function (to) { //文件写入
    var sep = path.sep
    var folders = path.dirname(to).split(sep);
    var p = '';
    while (folders.length) {
        p += folders.shift() + sep;
        if (!fs.existsSync(p)) {
            fs.mkdirSync(p);
        }
    }
};

/**
 * 
 * 去除所有空格
 * @param {any} str 
 * @param {any} is_global 
 * @returns 
 */
const Trim = function (str, is_global) {

    var result;
    result = str.replace(/(^\s+)|(\s+$)/g, "");
    if (is_global.toLowerCase() == "g")
    {
        result = result.replace(/\s/g, "");
    }
    return result;
}
books();