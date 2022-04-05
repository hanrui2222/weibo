const mysql = require('mysql');
const { error } = require('shelljs');

//创建连接对象
const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root123',
    port:3306,
    database:'myblog'
});

//开始连接
connection.connect();

//执行sql语句
const sql = 'update blogs set title="标题9" where id="10"';
connection.query(sql,(err,result)=>{
    if(err){
        console.error('error',err);
        return;
    }
    console.log('result',result);
})
//连接关闭
connection.end();