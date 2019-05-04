var socket = require('socket.io');
var lobbyData = require('../api/lobbyData');

var NUM_TOP = 4;

/*
tmp
if(data.state==0){
				// get player info 
				lobbyData.getPlayers(
					(rs,info)=>{
						socket.emit('host',{
							state:0,
							players: rs
						});
					},
					()=>{},
					{roomID: data.roomID}
				);

			}else 
			*/

module.exports.setup = function(server){
	var io = socket(server);
	console.log('[INFO] Set up websocket !');

	var playersSockets = {};

	io.on('connection', (socket)=>{

		console.log('[INFO] Made socket connection', socket.id);

		socket.on('playerCheckIn',function(data){
			if(data.roomID && data.player){
				socket.id = data.roomID +'-'+data.player;
			}
		});

		// Handle event 'host'
		socket.on('host', function(data){
			console.log('[] HOST DATA =', data);

			if(data.state==1){
				// get question and starting playing
				var roomID = data.roomID;
				var questionsPackId = data.questionsPackId;
				var questionNumber = data.questionNumber;

				// get question 
				lobbyData.getQuestion(
					(rs,info)=>{
						lobbyData.setStatusRoom(
							{},
							{
								roomID: roomID,
								questionNumber: questionNumber,
								status:"playing"
							}
						);
						socket.emit('host',{
							roomID: roomID,
							state: 1,
							a: rs.a,
							b: rs.b,
							c: rs.c,
							d: rs.d,
							limit: rs.limit,
							question: rs.question,
							questionNumber: info.questionNumber
						});
						io.sockets.emit('player',{
							state: 1,
							roomID: roomID,
							questionNumber: info.questionNumber
						});	
					},
					()=>{
						socket.emit('host',{state:3,roomID:roomID});
						io.sockets.emit('player',{state:3,roomID:roomID});
					},
					{
						questionsPackId: questionsPackId,
						questionNumber: questionNumber
					}
				);

			}else if(data.state==2){
				// stop that question, display answer and top 4 score
				var roomID = data.roomID;
				var questionNumber = data.questionNumber;
				var questionsPackId = data.questionsPackId;

				// set status to not accept any answer
				lobbyData.setStatusRoom(
					function(){},
					{
						roomID: roomID,
						questionNumber: questionNumber,
						status:"waiting"
					}
				);

				// display
				lobbyData.getAnswerAndTopScores(
					function(topPlayers, allPlayers){
						socket.emit('host',topPlayers);
						io.sockets.emit('player',allPlayers);
					},
					{
						roomID: roomID,
						questionsPackId: questionsPackId,
						questionNumber: questionNumber,
						numTop: NUM_TOP
					}
				);
			}
		});

		socket.on('player', function(data){

			console.log('[] PLAYER DATA =', data);

			if(data.state==1){

				var roomID = data.roomID;
				var questionNumber = data.questionNumber;
				var answer = data.answer;
				var player = data.player;

				// check roomID, current questionNumber is being played
				lobbyData.answeringQuestion(
					function(){

					},
					{
						roomID: roomID,
						questionNumber: questionNumber,
						answer: answer,
						player: player
					}
				);

				// check correct answer ? 

				// Add: point, answerStatus, update 

				// 

			}

		});
	});
}