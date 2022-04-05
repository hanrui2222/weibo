
const {SuccessModel, ErrorModel} = require('../model/responseModel');
const {getList, getDetail,createNewBlog,updateBlog,deleteBlog} = require('../controllers/blog');
const { exeSQL } = require('../db/mysql');



// 博客相关路由
const handleBlogRoute = (req, res) => {
  // 定义处理路由的逻辑
  const method = req.method;
  const id = req.query.id;
  const blogData=req.body;

  if (method === 'GET' && req.path === '/api/blog/list') {
    // /api/log/list?author = zhangsan&keyword=123
    //    new SuccessModel()
    // const sql ='select * from blogs';
    // exeSQL(sql,(err,result)=>{
    //   if (err) {
    //     console.log('error',err);
    //     return;
    //   }
    //   console.log('result',result);
    // })
    // //promise
    // exeSQL(sql).then(result =>{
    //   console.log('result',result);

    // })

    const author = req.query.author || '';
    const keyword = req.query.keyword || '';
    const listDataPromise = getList(author, keyword);
    return listDataPromise.then(listData=>{
      return new SuccessModel(listData);
    })
  
  }

  if (method === 'GET' && req.path === '/api/blog/detail') {

    
      const detailDataPromise = getDetail(id);
      return detailDataPromise.then(detailData=>{
        return new SuccessModel(detailData);
      })
     
  }
//新建博客路由
  if (method === 'POST' && req.path === '/api/blog/new') {
    const author= 'zhangsan';
    req.body.author = author;
    const newBlogDataPromise=createNewBlog(blogData);
    return newBlogDataPromise.then(newBlogData=>{
      return new SuccessModel(newBlogData);

    })
    
  }

  if (method === 'POST' && req.path === '/api/blog/update') {

    const updatedBlogDataPromise = updateBlog(id,blogData);
    return updatedBlogDataPromise.then(updateBlogData=>{
      if (updatedBlogData){
        return new SuccessModel('更新博客成功！');
      }else{
        return new ErrorModel('更新博客失败');
      }

    });

  }

  if (method === 'POST' && req.path === '/api/blog/delete') {
    const deleteBlogData = deleteBlog(id);
    if (deleteBlogData){
      return new SuccessModel('删除博客成功！');
    }else{
      return new ErrorModel('删除博客失败');
    }
  }
}
module.exports = handleBlogRoute
