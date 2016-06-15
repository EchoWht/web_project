/**
 * Created by Administrator on 2016-05-27.
 */
var http=require('http');
var work=require('./lib/timertrack');
var mysql=require('mysql');
/*1.数据库初始化链接*/
var db=mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'',
    database:'noteblog'
});
/*2.HTTP请求路由*/
var server=http.createServer(function (req,res) {
    switch (req.method){
        case 'POST':
            switch (req.url){
                case '/':
                    work.add(db,req,res);
                    break;
                case '/archive':
                    work.update(db,req,res);
                    break;
                case '/delete':
                    work.delete(db,req,res);
                    break;
            }
            break;
        case 'GET':
             switch(req.url) {
        case '/':
          work.show(db, res);
          break;
        case '/archived':
          work.showArchived(db, res);
      }
            break;
    }
});
db.query(
    "CREATE TABLE IF NOT EXISTS work ("
    + "id INT(10) NOT NULL AUTO_INCREMENT, "
    + "hours DECIMAL(5,2) DEFAULT 0, "
    + "date DATE, "
    + "archived INT(1) DEFAULT 0, "
    + "description LONGTEXT,"
    + "PRIMARY KEY(id))",
    function(err) {
        if (err) throw err;
        console.log('Server started...');
        server.listen(3000, '127.0.0.1');
    }
);