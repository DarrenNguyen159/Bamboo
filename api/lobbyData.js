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
    
    database.ref('/Rooms/r' + roomID).set({
      questionNumber: questionNumber,
      status: status
    });
  },

  getAnswerAndTopScores : function(func, info){
    var roomID= info.roomID;
    var questionPacksId = info.questionPacksId;
    var questionNumber = info.questionNumber;
    var numTop = info.numTop || 4

    database.ref('/QuestionPacks/q' + questionPacksId + 'questions/question' + questionNumber).once('value').then(function (snapshot) {
      var result = snapshot.val();
      if(result){
        answer = result.answer;
        database.ref('/Rooms/r'+roomID+'/players').once('value').then(function(snapshot){
          var players = snapshot.val();

          // get top 4 
          var props = Object.keys(players).map(function(key) {
            return { key: key, value: this[key].score };
          }, players);
          var i=0;
          var top = props.slice(0,numTop).reduce(function(obj, prop) {
            obj[prop.key] = prop.value;
            return obj;
          }, {});

          // do 
          func({
            answer:answer,
            top: top,
            numTop: numTop
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

