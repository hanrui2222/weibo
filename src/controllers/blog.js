const { exeSQL } = require('../db/mysql');
// 获取列表
const getList = (author, keyword) => {
  let sql =`select * from blogs where`;

  if (author){
    sql+=` author='${author}' `;

  }
  if (keyword){
    sql+=`and title like '%${keyword}%' `;
  }

// 从数据库里面拿数据

    //promise
  return exeSQL(sql);

// 先返回假数据
  // return [
  //   {
  //     id: 1,
  //     title: '标题1',
  //     content: '内容1',
  //     author: 'zhangsan',
  //     createdAt: 1610555518928

  //   },
  //   {
  //     id: 2,
  //     title: '标题2',
  //     content: '内容2',
  //     author: 'lisi2',
  //     createdAt: 1610555518935

  //   }
  // ]
}
// 获取博客详情
const getDetail =(id)=>{
  const sql=`select * from blogs where id='${id}'`; 
  return exeSQL(sql).then(rows=>{

    return rows[0];
  });
 


    //    先返回一个假数据
    // return [
    //     {
    //         id: 1,
    //         title: '标题1',
    //         content: '内容1',
    //         author: 'zhangsan',
    //         createdAt: 1610555518928
      
    //       },
    // ];
}
// 创建新的博客
const createNewBlog =(blogData={})=>{
  //blogData : title content
 const title = blogData.title;
 const content = blogData.content;
 const author = blogData.author;
 const createdAt = Date.now();
 const sql=`insert into blogs (title,content,author,createdAt) values ('${title}','${content}','${author}','${createdAt}') `;
 return exeSQL(sql).then(insertedResult=>{
   console.log('insertedResult',insertedResult);
   return{
     id:insertedResult.insertId
   }
 });
//   return {
//     id:1
//   }
}

//更新博客
const updateBlog = (id,blogData = {})=>{
  const title = blogData.title;
  const content = blogData.content;
  const sql =`update blogs set title = '${title}',content = '${content}' where id=${id}; `;
  return exeSQL(sql).then(updateResult=>{
    console.log('updateResult',updateResult);
    if (updateResult.affectedRows>0){
      return true;
    }
    return false;
  })
}

//删除博客
const deleteBlog = (id) =>{
  const sql = `delete from blogs where id = ${id} `;
  return exeSQL(sql).then(deleteResult =>{
    console.log('deleteResult',deleteResult);
    if(deleteResult.affectedRows>0){
      return true;
    }
    return false;
  })

  
}

module.exports = {
  getList,
  getDetail,
  createNewBlog,
  updateBlog,
  deleteBlog
}
