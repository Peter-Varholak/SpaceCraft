//Used for loading the game
function loadFactions()
{
	updateAllFactions();
	enableFactions();	
}

function enableFactions()
{
	var length = factionProgress.factions.length
	for(i = 0; i < length; i++)
	{
		if(factionProgress.factions[i] != 101)
		{
			$("#factionItem" + (i + parseInt(1))).removeClass("locked");
		}
	}
}

function updateAllFactions()
{
	var amount = factionProgress.factions.length;
	for(i = 0; i < amount; i++)
	{
		updateFaction(i);
	}
}

//PUBLIC
function getFactionName(id)
{
	var name = $("#factionName" + (id + parseInt(1))).html();
	return name.replace(":", "");
}

//PUBLIC
function resolveFactions(finish)
{
	var factionsTag;
	var factionTag;
	var amount;
	var value;
	var condition;
	var faction;

	factionsTag = eventTag.find('factions');
	amount = factionsTag.attr('amount');

	for(i = 1; i <= amount; i++)
	{
		factionTag = factionsTag.find('faction[id="' + i + '"]');
		condition = factionTag.attr('condition');

		if(condition === finish)
		{
			value = factionTag.attr('value');	
			faction = factionTag.get(0).innerHTML;

			changeProgress(getfaction(faction), value);
		}		
	}	
}

function getfaction(faction)
{
	if(faction === "darksteel corsairs")
	{
		return 0;
	}
	else if(faction === "order")
	{
		return 1;
	}
	else if(faction === "council")
	{
		return 2;
	}
	else if(faction === "peacekeepers")
	{
		return 3;
	}
	else if(faction === "test5")
	{
		return 4;
	}
	else if(faction === "test6")
	{
		return 5;
	}
}

function changeProgress(id, value)
{
	if(factionProgress.factions[id] === 101)
	{
		unlockFaction(id)
	}

	factionProgress.factions[id] += parseInt(value);

	if(factionProgress.factions[id] > 100)
	{
		factionProgress.factions[id] = 100;
	}
	else if(factionProgress.factions[id] < -100)
	{
		factionProgress.factions[id] = -100;
	}

	if(value < 0)
	{
		if(factionProgress.factions[id] != -100)
		{
			addMessage("Reputation with " + getFactionName(id) + " decreased to " + factionProgress.factions[id] + ".");
		}		
	}
	else
	{
		if(factionProgress.factions[id] != -100)
		{
			addMessage("Reputation with " + getFactionName(id) + " increased to " + factionProgress.factions[id] + ".");
		}
	}

	updateFaction(id);	
}

function unlockFaction(id)
{
	if(factionProgress.factions[id] === 101)
	{
		factionProgress.factions[id] = 0;
		$("#factionItem" + (id + parseInt(1))).removeClass("locked");
		addMessage("You are now neutral with " + getFactionName(id) + ".");
	}
}

function updateFaction(id)
{
	if(factionProgress.factions[id] >= 0)
	{
		$("#factionProgress" + (id + parseInt(1))).removeClass("progressBarNegative");
		$("#factionProgress" + (id + parseInt(1))).addClass("progressBarPositive");
		$("#factionProgress" + (id + parseInt(1))).attr("value", factionProgress.factions[id]);
	}
	else
	{
		$("#factionProgress" + (id + parseInt(1))).removeClass("progressBarPositive");
		$("#factionProgress" + (id + parseInt(1))).addClass("progressBarNegative");
		$("#factionProgress" + (id + parseInt(1))).attr("value", -1*factionProgress.factions[id]);
	}
}