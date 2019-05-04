var express = require('express');
var router = express.Router();
var database = require('../routes/database');


module.exports = {
  /*
    Params: 
      func: function to be executed after getting data from database done
      rfunc: function to be executed if data from database is empty
      questionPacksId: questions-pack ID
      questionNumber: the question number 
  */
  getQuestion : function(func, rfunc, info){
    var questionsPackId = info.questionsPackId;
    var questionNumber = info.questionNumber;

    database.ref('/QuestionPacks/q' + questionsPackId + '/questions/question' + questionNumber).once('value').then(function (snapshot) {
      var result = snapshot.val();
      if(result){
        func(result,{questionNumber:questionNumber});
      }else{
        rfunc();
      }
    });
  },

  setStatusRoom : function(func, info){
    var roomID = info.roomID;
    var questionNumber = info.questionNumber;
    var status = info.status;
    
    database.ref('/Rooms/r' + roomID+'/questionNumber').set(questionNumber);
    database.ref('/Rooms/r' + roomID+'/status').set(status);
  },

  getAnswerAndTopScores : function(func, info){
    var roomID= info.roomID;
    var questionsPackId = info.questionsPackId;
    var questionNumber = info.questionNumber;
    var numTop = info.numTop || 4

    console.log('[] ', '/QuestionPacks/q' + questionsPackId + '/questions/question' + questionNumber)

    database.ref('/QuestionPacks/q' + questionsPackId + '/questions/question' + questionNumber).once('value').then(function (snapshot) {
      var result = snapshot.val();
      console.log('[] here 1?', result);
      if(result){
        console.log('[] here 1?');
        answer = result.answer;
        database.ref('/Rooms/r'+roomID+'/players').once('value').then(function(snapshot){
          var players = snapshot.val();

          var top = [];
          for (var player in players) {
              top.push([player, players[player].score]);
          }

          top.sort(function(a, b) {
              return b[1]-a[1];
          });

          top = top.slice(0,numTop);

          for(i of top){
            i[0] = players[i[0]].name;
          }

          // Check if there still a next question
          var nextQuestionId = (parseInt(questionNumber)+1).toString();
          console.log('[]', '/QuestionPacks/q' + questionsPackId + '/questions/question' + nextQuestionId);
          database.ref('/QuestionPacks/q' + questionsPackId + '/questions/question' + nextQuestionId).once('value').then(function (snapshot) {
            if(snapshot.val()){
              state = 2;
            }else{
              state = 3;
            }

            // do
            func({
              state:state,
              answer:answer,
              top: top,
              numTop: numTop
            });
          });
        });
      }
    });
  },

  getPlayers : function(func, rfunc, info){
    var roomID = info.roomID;

    database.ref('/Rooms/r'+roomID + '/players').once('value').then(function (snapshot) {
      var result = snapshot.val();
      if(result){
        func(result,{});
      }else{
        rfunc();
      }
    });
  },
};

