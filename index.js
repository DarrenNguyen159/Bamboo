const firebase = require('firebase');
const express = require('express');
const app = express();
const port = 3000;

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

var database = firebase.firestore();

app.use(express.static("public"));

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file
app.set('views', __dirname + '/views');

app.get('/', (req, res) => {
    res.render('index');
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));