const firebase = require('firebase');
// Initialize Firebase
var config = {
    apiKey: "AIzaSyBKheAnyvSFQtaMUwlaQ_7T-q5-Z9hmuQc",
    authDomain: "bamboo-cda5f.firebaseapp.com",
    databaseURL: "https://bamboo-cda5f.firebaseio.com",
    projectId: "bamboo-cda5f",
    storageBucket: "bamboo-cda5f.appspot.com",
    messagingSenderId: "550416420066"
};
firebase.initializeApp(config);

var database = firebase.database();

module.exports = database;