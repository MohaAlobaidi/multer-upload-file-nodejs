const express = require('express')
const app = express()
const port = 3000 || process.env.PORT
const mongoose = require('mongoose')
const path = require('path')
var multer  = require('multer')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" +  file.originalname )
  }
})


function fileFilter (req, file, cb) {
  if(file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype == 'image/jpej'  ){
    cb(null, true)
  }else{
  cb(null, false)
  }
}

var upload = multer({ dest: 'uploads/',storage,fileFilter })
app.use(upload.single('file'))









app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:false }))


app.use(express.static(path.join(__dirname,'public')))

app.use("/uploads",express.static(path.join(__dirname,"uploads")))

app.use(require('./routers/home.routes'))



mongoose.connect('mongodb://localhost:27017/uploadMulter', {useNewUrlParser: true, useUnifiedTopology: true});

app.listen(port, () => console.log(`Example app listening on port port!`))