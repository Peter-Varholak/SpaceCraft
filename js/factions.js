// REWORK SYSTEM!!!
//automatic generation of faction item
//change to list

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
function resolveFactions(finish)
{
	var factionsTag;
	var factionTag;
	var amount;
	var value;
	var condition;
	var factionId;

	factionsTag = eventTag.find('factions');
	amount = factionsTag.attr('amount');

	for(i = 1; i <= amount; i++)
	{
		factionTag = factionsTag.find('faction[id="' + i + '"]');
		condition = factionTag.find('condition').get(0).innerHTML;

		if(condition === finish)
		{
			value = factionTag.find('value').get(0).innerHTML;
			factionId = factionTag.find('factionid').get(0).innerHTML;

			changeProgress(parseInt(factionId), value);
		}		
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
			addMessage("Reputation with " + xmls.gameInformation.find('faction[id="' + id + '"]').get(0).innerHTML + " decreased to " + factionProgress.factions[id] + ".");
		}		
	}
	else
	{
		if(factionProgress.factions[id] != -100)
		{
			addMessage("Reputation with " + xmls.gameInformation.find('faction[id="' + id + '"]').get(0).innerHTML + " increased to " + factionProgress.factions[id] + ".");
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
		addMessage("You are now neutral with " + xmls.gameInformation.find('faction[id="' + id + '"]').get(0).innerHTML + ".");
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
