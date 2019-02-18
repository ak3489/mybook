const fs = require("fs");
function writeJson(params, url) {
    //现将json文件读出来
    fs.readFile(url, function(err,data){
        if(err){
            return console.error(err);
        }                
        var books = data.toString();//将二进制的数据转换为字符串   
        books = JSON.parse(data);//将字符串转换为json对象
        books.data=params;//将传来的对象push进数组对象中
        books.total = books.data.length;//定义一下总条数，为以后的分页打基础
        var str = JSON.stringify(books);//因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
        fs.writeFile(url,str,function(err){
            if(err){
                console.error(err);
            }
            // console.log('----------新增成功-------------');                        
        })
    })
  };
  module.exports = {
    writeJson
  }