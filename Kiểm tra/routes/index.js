var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
mongoose.connect('mongodb+srv://Khoa21donga:Khoa21dongaKhoa21dongaKhoa21donga@cluster0.o9ivn6p.mongodb.net/test2?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false 
});
//create collection
let vanchuyenSchema = mongoose.Schema({
  Content: {
    type: String,
  },
  Picture: {
    type: String,
  },
  Point: {
    type: Number,
  }
});
let Vanchuyen = mongoose.model('Vanchuyen', vanchuyenSchema); 
/* GET home page. */
router.get('/', function(req, res, next) {
  Vanchuyen.find({}, (Error, data)=>{
    res.render('index',{vanchuyens:data});
  });
});
// nút thêm vận chuyển
router.get('/form-add',function(req, res, next){
  res.render('form-add',{});
});
router.post('/add',function(req, res, next){
  Vanchuyen.create(req.body);
  res.redirect('/');
});
// nút cập nhật vận chuyển
router.get('/form-update/:id',function(req, res, next){
  Vanchuyen.findById(req.params.id,(Error,data)=>{
    res.render('form-update',{vanchuyens:data});
  });
});
router.post('/update',function(req, res, next){
  console.log(req.body);
  Vanchuyen.findByIdAndUpdate(req.body.id,req.body, (Error, data)=>{
    res.redirect('/');
  });
})
// nút xoá vận chuyển
router.get('/form-delete/:id',function(req, res, next){
  Vanchuyen.findByIdAndDelete(req.params.id,(Error,data)=>{
    res.redirect('/');
  });
});
module.exports = router;
