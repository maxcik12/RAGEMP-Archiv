/* Funktion zum Verschlüsseln
gefunden auf https://www.andrerinas.de/tutorials/javascript-einen-hash-von-einem-string-erstellen.html?no_cache=1 */
hashCode = function(str) {
	var hash = 0, i, chr, len;
	if (str.length === 0) return hash;
	for (i = 0, len = str.length; i < len; i++) {
	chr   = str.charCodeAt(i);
	hash  = ((hash << 5) - hash) + chr;
	hash |= 0; // Convert to 32bit integer
	}
	return hash;
};

/*

	Register-Login
	2019
	© Xendom Rayden
	
	↓↓↓
	
*/

/* Database */
let mysql = require("mysql");

var connection = mysql.createConnection( {
	host: "localhost", 
	user: "root",
	password: "",
	database: "gtav"
});

connection.connect(function(e) {
	if(e) {
		console.log("Datenbankverbindung konnte nicht hergestellt werden!: " + e);
	}
	else
	{
		console.log("Datenbankverbindung konnte hergestellt werden.");
	};
});

/* Login / Register */
mp.events.add("registerLogin.server",(player,username,password,type) => {
	if(type == 0) {
		connection.query("SELECT * FROM userdata WHERE Username = ?",[username],function(err,res) {
			if(res.length > 0) {
				player.outputChatBox("Der angegebene Username ist bereits vergeben!");
			}
			else
			{
				connection.query("SELECT * FROM userdata WHERE SocialClub = ?",[player.socialClub],function(err,res) {
					if(res.length > 0) {
						player.outputChatBox("Du hast bereits einen Account bei uns!");
					}
					else
					{
						connection.query("INSERT INTO userdata SET Username = ?, Password = ?, SocialClub = ?",[username,hashCode(password),player.socialClub],function(err,res) {
							if(!err) {
								player.outputChatBox("Du hast dich erfolgreich registriert.");
								setPlayerDatasAfterLogin(player,username);
							};
						});
					};
				});
			};
		});
	}
	else
	{
		connection.query("SELECT * FROM userdata WHERE Username = ? AND Password = ?",[username,hashCode(password)],function(err,res) {
			if(res.length > 0) {
				player.outputChatBox("Du hast dich erfolgreich eingeloggt.");
				setPlayerDatasAfterLogin(player,username);
			}
			else
			{
				player.outputChatBox("Die angegebene Username-Passwort-Kombination existiert nicht!");
			};
		});
	};
});

function setPlayerDatasAfterLogin(player,username) {
	connection.query("SELECT * FROM Username = ?",[username],function(e,r) {
		player.setVariable("Money",r[0].Money);
	});
	player.call("registerLogin.destroy");
}
