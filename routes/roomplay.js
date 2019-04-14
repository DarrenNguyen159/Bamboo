var express = require('express');
var router = express.Router();
var database = require('./database');
var url = require('url');

/*
	







*/
var options = {
	maxAge: 1000 * 60 * 15, //  would expire after 15 mins
	httpOnly: true, // the cookie only accessible by the web server
	signed: false // Indicates if the cookie should be signed
}

router.get('/joinroom', function(req, res, next) {
	var roomID = req.query.roomID;
	if(roomID){
		// roomID is required ! If roomID is undefined, redirect to home page
		database.ref('/Rooms/r'+roomID).once('value').then(function(snapshot){
		  if(snapshot.val()){
		  	// Room existed ! Render page to enter nick name 
				res.render('roomplay/joinroom', {title: '', roomID: roomID, message:''});
		  }else{
		  	// Room not found!
		    res.redirect('/');
	      }
		});
	}else{
		// roomID is undefined
		res.redirect('/');
	}
});

router.post('/checkRoom', function(req,res,next){
	res.status(200);
    res.setHeader('Content-Type', 'application/json');
    
	database.ref('/Rooms/r'+req.body.roomID).once('value').then(function(snapshot){
	  if(snapshot.val()){
	  	// Room existed !
	    res.json({statusRoom:1});
	  }else{
	  	// Room not found!
	    res.json({statusRoom:0});
      }
	});
});

router.get('/checkRoom', function(req,res,next){
	res.status(200);
    res.setHeader('Content-Type', 'application/json');
    
	database.ref('/Rooms/r'+req.query.roomID).once('value').then(function(snapshot){
	  if(snapshot.val()){
	  	// Room existed !
	    res.json({statusRoom:1});
	  }else{
	  	// Room not found!
	    res.json({statusRoom:0});
      }
	});
});

router.post('/checkNickName', function(req,res,next){
	var nickName = req.body.nickName;
	var roomID = req.body.roomID;
	var type = req.body.playerType; // temporaryUser 0, loggedInUser 1
	var uid = req.body.uid; // = uid if type=1; = undefined if type=0

	console.log("[Debug]Cookies" + JSON.stringify(req.cookies));

	res.status(200);
  res.setHeader('Content-Type', 'application/json');
	    
	database.ref('/Rooms/r' + roomID + '/players').once('value').then(function(snapshot){
		var data = snapshot.val();
		console.log("[DEBUG] Finding player:" + nickName + " in " + roomID);
		console.log("[DEBUG] players in lobby " + roomID + ":" + JSON.stringify(data));
	  if(data){
	  	var isValid = true;
	  	Object.keys(data).forEach(function(key) {
		    if(data[key].name == nickName){
		    	isValid = false;
				}
		});
		if(isValid){
			if(type=='0'){ 
				var id=0;
				while(true){
					if(Object.keys(data).includes('player'+id.toString())){
						id++;
					}else{
						break;
					}
				}
				uid='player'+id.toString();
			}

			// set cookies
			res.cookie('uid',uid);
			res.cookie('roomID',roomID);

			// respond to client 
			res.json({isValidNickName:1});

			// create new user
			database.ref('/Rooms/r'+roomID+'/players/'+uid).set({
				name: nickName
			});


		} else {
			res.json({isValidNickName:0});
		}
		} else {// first to join
			// respond to client 
			res.json({isValidNickName:1});
			// create new user
			database.ref('/Rooms/r'+ roomID + '/players/'+ 'player0').set({
				name: nickName
			});
	  }
	});
});


router.get('/roomplay', function(req,res,next){

	// read cookies 
	console.log(req.cookies);

	// check if uid and 
	uid = req.cookies.uid;
	roomID = req.cookies.roomID;
	database.ref('/Rooms/r'+roomID+'/players/'+uid).once('value').then(function(snapshot) {
        var data = snapshot.val();
        if(data){
			database.ref('/Rooms/r'+roomID).once('value').then(function(snapshot) {
			    res.render(
			    	'roomplay/roomplay', 
			    	{
			    		room: snapshot.val(), 
			    		currentPlayer: data.name, 
			    		currentRoom: roomID
			    	}
			    );
			});
        }else{
        	// redirect to homepage if player does not exist in that room
        	res.redirect('/');
        }
    });




});


module.exports = router;
