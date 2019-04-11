var express = require('express');
var router = express.Router();
var db = require('./firestore');

router.get('/', function(req, res, next) {
    res.render('login', { title: 'Log in', message: '' }); // index.hbs file is rendered
});

router.post('/', function(req,res, next){
  if(!req.body) return res.sendStatus(400);
  console.log('[DEBUG] Receive data : ');
  console.log(req.body);

  var users = db.collection('Accounts').doc('Users').get()
  .then(doc=> {
    if(!doc.exists){
      console.log('[ERROR] No such document!');
    }else{
      var data = doc.data();
      console.log('[INFO] Document data:', doc.data());
      var isExist = false;
      for(var k in data){
        if(data.hasOwnProperty(k)){
          if(data[k].name == req.body.username && 
             data[k].password == req.body.password){
            isExist = true;
            break;
          }
        }
      }
      if(isExist){ 
        res.redirect('/'); 
        console.log('[DEBUG] Existed');
      }
      else{ 
        res.render('login', {title: 'Log in', message:"Your username doesn't exist!"}); 
        console.log('[DEBUG] Not Existed');
      }
    }
  })
  .catch(err=>{
    console.log('[ERROR] Error getting document', err);
  });
});
module.exports = router;
