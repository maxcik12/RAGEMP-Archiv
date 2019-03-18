/* BLIP ERSTELLEN */
let TutorialBlip = mp.blips.new(60, new mp.Vector3(0.5012635588645935,15.332207679748535,70.97830200195312),{
	name: "Tutorial",
	scale: 1,
	color: 2,
	alpha: 255,
	drawDistance: 500,
	shortRange: true,
	rotation: 180,
	dimension: 0,
});

/* NAME DES BLIPS ÄNDERN */
mp.events.addCommand("changename",(player) => {
	TutorialBlip.name = "Neues Tutorial";
});

/* TUTORIAL-BEFEHL */
mp.events.addCommand("tutorial",(player,fullText,zahl) => {
	if(zahl) {
		player.outputChatBox("Deine Zahl: " + zahl);
	}
	else
	{
		player.outputChatBox("Es wurde keine Zahl angegeben!");
	};
});

/* POSITION */
mp.events.addCommand("mypos",(player) => {
	var pos = player.position;
	player.outputChatBox("Position: " + pos);
	console.log("Position: " + pos);
});

/* ROUTE ERSTELLEN / LÖSCHEN */
mp.events.addCommand("createRoute",(player) => {
	TutorialBlip.routeFor(player,2,1);
});

mp.events.addCommand("destroyRoute",(player) => {
	TutorialBlip.unrouteFor(player);
});