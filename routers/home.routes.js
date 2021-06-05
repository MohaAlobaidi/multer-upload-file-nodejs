const app = require('express').Router()
const fileModal = require('../model/file.model')
const fs = require('fs')



app.get('/',async (req, res) =>{
  const fileList = await fileModal.find({}).select('path title ')
  // console.log(fileList);
  res.render('home.ejs',{fileList})
})


app.post('/add', async(req, res) => {

  const {title} = req.body
  const {path} = req.file
  if(path == undefined){
    res.redirect('home.js')
  }else{
    await fileModal.insertMany({path,title})
    res.redirect('/')
  }
 
});



app.post('/deltefile', async(req, res) => {
  console.log(req.body);
  const {path }= req.body
 await fileModal.findOneAndDelete({path})
  fs.unlinkSync(path)
  res.redirect('/')
});
module.exports = app