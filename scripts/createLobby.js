var lobbyCreator = {
createLobby : function(database, res) {
    // Get new lobby Id
    var randomID;
    database.ref('/Rooms/').once('value').then(function(snapshot) {
        var lobbies = snapshot.val();
        console.log(lobbies);
        randomID = (Math.floor(Math.random() * 1001)).toString();
        console.log(randomID);
        res.render('newlobby', {lobbyID: randomID});
    });
}
}

module.exports = lobbyCreator;