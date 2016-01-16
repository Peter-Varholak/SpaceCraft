var eventTag;

function findEvent(level)
{
	//TODO: event countdown

	var xml = xmls.events[level];

	eventTag = getRandomEvent(xml);

	eventIntro();	
}

function getRandomEvent(xml)
{
	var maxEvents = xml.find('events').attr('amount');
	var eventId = Math.floor((Math.random() * maxEvents) + 1);
	return xml.find('event[id="' + eventId + '"]');
}

function eventIntro()
{
	var location = eventTag.find('location').get(0).innerHTML;
	var log = eventTag.find('log').get(0).innerHTML;
	var introMessage = eventTag.find('intromessage').get(0).innerHTML;

	changeLocation(getLocation(location));
	changeCommunicationText(introMessage);
	addMessage(log);

	var type = eventTag.find('type').get(0).innerHTML;

	switchToIntroButtons(type)

	enableStatWindow();

	changeTab("Communication"); //switch screen
}

function getLocation(type)
{
	// TODO: REWORK THIS ONE!!!
	var location;
	
	var maxLocations = xmls.locations.find(type).attr('amount');
	var locationId = Math.floor((Math.random() * maxLocations) + 1);

	if(type === "pirate")
	{
		location = xmls.locations.find('piratelocation[id="' + locationId + '"]').get(0).innerHTML
				   + " " + Math.floor((Math.random() * 50) + 1);
	}
	else
	{
		alert("BUG: Location not found");
	}

	return location;
}

function enableStatWindow()
{
	//swap image
	$("#enemyImage").removeClass("disabledImage");
	$("#enemyStats").removeClass("disabledStatWindow");
}

//PUBLIC
function eventStart(type)
{
	if(type === "combat")
	{
		setupCombat(eventTag);
	}
	else
	{
		alert("BUG: Event type not found");
	}
}

//PUBLIC
function eventEnd(type, finish)
{
	if(type === "combat")
	{
		endCombat(eventTag, finish);
	}
	else
	{
		alert("BUG: Event end not yet implemented.");
	}
}

//PUBLIC
function eventOutro()
{
	switchToMenuButtons();

	$("#enemyStats").addClass("disabledStatWindow");

	changeLocation("The Void");
	changeCommunicationText("Tutorial not yet implemented.");

	saveGame();
}