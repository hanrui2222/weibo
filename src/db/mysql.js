const mysql = require('mysql');
const { MYSQL_CONFIG } = require('../config/db');

const { error } = require('shelljs');

//创建连接对象
const connection=mysql.createConnection(MYSQL_CONFIG);

//开始连接
connection.connect();

//执行sql语句
// const sql = 'update blogs set title="标题9" where id="10"';
// connection.query(sql,(err,result)=>{
//     if(err){
//         console.error('error',err);
//         return;
//     }
//     console.log('result',result);
// })
//连接关闭
// connection.end();

// //执行sql语句
// function exeSQL(sql,callback){
//     connection.query(sql,callback);
// }

function exeSQL(sql){
    const promise = new Promise((resolve,reject)=>{
        connection.query(sql,(err,result)=>{
            if (err) {
              reject(err);
              return;
            }
            resolve(result);
          })
        })
        return promise;
    }






module.exports = {
    exeSQL
}