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
	io.on('connection', (socket)=>{

		console.log('[INFO] Made socket connection', socket.id);

		// Handle event 'host'
		socket.on('host', function(data){
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
						io.sockets.emit('host',{
							state: 1,
							a: rs.a,
							b: rs.b,
							c: rs.c,
							d: rs.d,
							limit: rs.limit,
							question: rs.question,
							questionNumber: info.questionNumber
						});
						console.log('HERE?');
					},
					()=>{
						io.sockets.emit('host',{state:3});
						io.sockets.emit('player',{state:3});
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

				console.log('[] DATA =', data);

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
					function(rs){
						io.sockets.emit('host',rs);
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
	});
}