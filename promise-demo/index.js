// // 读取json文件

const fs = require('fs');
const path = require('path');

// function getFileContent(filename,callback){
//     // 获取文件路径
//     // const fullFilename =path.resolve(__dirname,'data',filename);
//     const fullFilename =path.resolve(__dirname,'data',filename);
//     // console.log("正在打印");
//     // console.log(fullFilename.toString());
//     // console.log("打印结束");

//     fs.readFile(fullFilename,(err,data)=>{
//         if(err){
//             console.error(err);
//             return;
//         }
//         console.log("正在打印1");
//         callback(
//             JSON.parse(data.toString())
//             )
//             // console.log(
//             //     JOSN.parse(data.toString())
//             //     )    
//         console.log("打印结束1");
//     })
// }

// //回调地狱
// getFileContent('a.json',(aData)=>{
//     console.log('aData',aData);
//     getFileContent(aData.next,(bData)=>{
//         console.log('bData',bData);
//         getFileContent(bData.next,(cData)=>{
//             console.log('cData',cData);
            
//         })
//     })
    
// });

//promise 实现

function getFileContent(filename){
    const promise = new Promise((resolve,reject)=>{
            // 获取文件路径
    // const fullFilename =path.resolve(__dirname,'data',filename);
    const fullFilename =path.resolve(__dirname,'data',filename);
    // console.log("正在打印");
    // console.log(fullFilename.toString());
    // console.log("打印结束");

    fs.readFile(fullFilename,(err,data)=>{
        if(err){
            console.error(err);
            return;
        }
        console.log("正在打印1");
        resolve(
            JSON.parse(data.toString())
            )
            // console.log(
            //     JOSN.parse(data.toString())
            //     )    
        console.log("打印结束1");
    });

    });

    return promise;
}

getFileContent('a.json').then((aData)=>{
    console.log('aData',aData);
    return getFileContent(aData.next);
}).then((bData)=>{
    console.log('bData',bData);
    return getFileContent(bData.next);
}).then((cData)=>{
    console.log('cData',cData);
   
})
