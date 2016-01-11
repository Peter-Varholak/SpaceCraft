function setupCombat(eventTag)
{
	switchToCombatButtons();

	$("#enemyImage").addClass("disabledImage");

	var message = eventTag.find('message').get(0).innerHTML;
	changeCommunicationText(message);

	enemyStats.maxMoney = eventTag.find('enemymaxgold').get(0).innerHTML;
	enemyStats.maxEnemyHp = eventTag.find('enemyhp').get(0).innerHTML;
	enemyStats.maxfactionHealth = eventTag.find('enemyfactionhealth').get(0).innerHTML;
	enemyStats.maxEnemyShields = eventTag.find('enemyshield').get(0).innerHTML;

	enemyHeal(enemyStats.maxEnemyHp);
	enemyStats.currentEnemyShields = enemyStats.maxEnemyShields; //TODO: make into function in actions
	enemyStats.factionHealth = enemyStats.maxfactionHealth; //TODO: make into function in actions
	
	updateAll();
}

function endCombat(eventTag, finish)
{
	var outroMessage;

	if(finish === "kill")
	{
		outroMessage = killVictory(eventTag);
	}
	else if(finish === "diplomacy")
	{
		outroMessage = diplomacyVictory(eventTag);
	}
	else if(finish === "escape")
	{
		if(!escapeCombat(eventTag, "escape"))
		{
			changeCommunicationText(eventTag.find('escapefailoutromessage').get(0).innerHTML);
			enableButtons(1);
			return;
		}
		else
		{
			outroMessage = eventTag.find('escapeoutromessage').get(0).innerHTML;
		}
	}
	else if(finish === "flee")
	{
		if(!escapeCombat(eventTag, "flee"))
		{
			changeCommunicationText(eventTag.find('fleefailoutromessage').get(0).innerHTML);
			return;
		}
		else
		{
			stats.fleeVictory++;
			outroMessage = eventTag.find('fleeoutromessage').get(0).innerHTML;
		}
	}
	else
	{
		alert("BUG: Combat finish not yet implemented.");
	}

	switchToOutroButtons("combat");

	$("#enemyImage").removeClass("disabledImage");

	resolveFactions(finish);
	changeCommunicationText(outroMessage);
	updatePlayer();
}

function escapeCombat(eventTag, type)
{
	var chance = eventTag.find('escapechance').get(0).innerHTML;
	var result = Math.floor(Math.random() * 100 + 1);

	if(type === "escape")
	{
		if(result <= chance)
		{
			return true;
		}

		return false;
	}
	else if(type === "flee")
	{
		if(result <= chance / 2)
		{
			return true;
		}

		return false;
	}
	else
	{
		alert("BUG: Invalid escape type.");
	}
}

function killVictory(eventTag)
{
	stats.killVictory++;
	outroMessage = eventTag.find('killoutromessage').get(0).innerHTML;
	addMoney(Math.floor((Math.random() * eventTag.find('enemymaxgold').get(0).innerHTML) + 1));

	return outroMessage;
}

function diplomacyVictory(eventTag)
{
	stats.diplomacyVictory++;
	outroMessage = eventTag.find('factionoutromessage').get(0).innerHTML;

	var fameValue = eventTag.find('famevalue').get(0).innerHTML;
	var maxFame = eventTag.find('maxFame').get(0).innerHTML;

	if(Math.abs(playerStats.fame + parseInt(fameValue)) <= maxFame)
	{
		addFame(fameValue);
	}

	return outroMessage;
}