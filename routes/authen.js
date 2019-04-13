var express = require('express');
var router = express.Router();
// var db = require('./firestore');
var database = require('./database');

// /authen

router.get('/:id', function(req, res, next) {
    var id = req.params['id'];
    res.render('login', { title: 'Log in', message: "", lobbyID: id });
});

router.post('/checkRoom', function(req,res,next){
  if(!req.body) return res.sendStatus(400);

  console.log('[DEBUG] Receive data: ');
  console.log(req.body);

  database.ref('/Rooms/r'+req.body.roomID).once('value').then(function(snapshot){
      if(snapshot.val()){
        console.log('[DEBUG] Room existed!');
        // res.redirect('/', {message: 'Room existed!'});
        res.render('roomplay/joinroom', {title: 'Enter nickname', message:'', roomID:req.body.roomID});
      }else{
        console.log('[DEBUG] Room not found!');
        // res.render('/index', {title: '', message: 'Room not found!'});
        // res.redirect('/');
        res.render('index', {title:'', message:'Room not found'});
      }
  });
});

router.post('/setNickName', function(req,res,next){
  if(!req.body) return res.sendStatus(400);

  console.log('[DEBUG] <SetNickName> Receive data: ');
  console.log(req.body);

  database.ref('Rooms/r' + req.body.roomID+ '/players/player10').set({
    name: req.body.name,
    uid: req.body.uid
  });

  database.ref('/Rooms/r'+req.body.roomID).once('value').then(function(snapshot) {
      var data = snapshot.val();
      // console.log(data.players);
      res.render('roomplay/roomplay', {room: data});
  });  

});

// router.post('/', function(req,res, next){
//   if(!req.body) return res.sendStatus(400);
//   console.log('[DEBUG] Receive data : ');
//   console.log(req.body);

//   var users = db.collection('Accounts').doc('Users').get()
//   .then(doc=> {
//     if(!doc.exists){
//       console.log('[ERROR] No such document!');
//     }else{
//       var data = doc.data();
//       console.log('[INFO] Document data:', doc.data());
//       var isExist = false;
//       for(var k in data){
//         if(data.hasOwnProperty(k)){
//           if(data[k].name == req.body.username && 
//              data[k].password == req.body.password){
//             isExist = true;
//             // Save user session
            
//             break;
//           }
//         }
//       }
//       if(isExist){ 
//         res.redirect('/'); 
//         console.log('[DEBUG] Existed');
//       }
//       else{ 
//         res.render('login', {title: 'Log in', message:"Your username doesn't exist!"}); 
//         console.log('[DEBUG] Not Existed');
//       }
//     }
//   })
//   .catch(err=>{
//     console.log('[ERROR] Error getting document', err);
//   });
// });
module.exports = router;
