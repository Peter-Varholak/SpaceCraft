$(document).ready(function()
{
	$(".tabButton").click(function () 
	{
		resolveButton($(this));
	});	
});

function resolveButton(button)
{
	if(button.val() === "Explore")
	{
		findEvent(playerStats.level);
	}
	else if(isChangeTabButton(button.val()))
	{
		changeTab(button.val());
	}
	else if(isIntroButton(button.val()))
	{
		resolveIntro(button.val());
	}
	else if(isOutroButton(button.val()))
	{
		resolveOutro(button.val());
	}
	else if(isCombatButton(button.val()))
	{
		resolveCombat(button.val());
	}
	else
	{
		addMessage("Action not yet implemented.");
	}	
}

function isChangeTabButton(button)
{
	if(button === "Places" || button === "Communication" || button === "Inventory" || button === "Datalog" ||
	   button === "Income" || button === "Science" || button === "Biolab" || button === "Ship" || button === "Crew")
	{
		return true;
	}

	return false;
}

function isIntroButton(button)
{
	if(button === "Engage" || button === "Escape")
	{
		return true;
	}

	return false;
}

function isOutroButton(button)
{
	if(button === "Continue")
	{
		return true;
	}

	return false;
}

function isCombatButton(button)
{
	if(button === "Attack" || button === "Negotiate" || button === "Flee")
	{
		return true;
	}

	return false;
}

function resolveIntro(button)
{
	if(button === "Engage")
	{
		eventStart("combat");
	}
	else if(button === "Escape")
	{
		eventEnd("combat", "escape");
	}
}

function resolveOutro(button)
{
	if(button === "Continue")
	{
		eventOutro();
	}
}

function resolveCombat(button)
{
	$("#tab01").val("Attack");
	$("#tab02").val("Negotiate");
	$("#tab03").val("Technology");
	$("#tab04").val("Examine");
	$("#tab05").val("Items");
	$("#tab06").val("Flee");

	if(button === "Attack")
	{
		dealDamage(1);
	}
	else if(button === "Negotiate")
	{
		negotiate(5);
	}
	else if(button === "Technology")
	{
		alert("Button Technology not yet implemented.");
	}
	else if(button === "Examine")
	{
		alert("Button Examine not yet implemented.");
	}
	else if(button === "Items")
	{
		alert("Button Items not yet implemented.");
	}
	else if(button === "Flee")
	{
		eventEnd("combat", "flee");
	}
}

//PUBLIC
function changeTab(button)
{
	$(".enabledTab").removeClass("enabledTab");
	$("#" + button.toLowerCase() + "Tab").addClass("enabledTab");
}

//PUBLIC
function switchToMenuButtons()
{
	$("#tab01").val("Explore");
	$("#tab02").val("Places");
	$("#tab03").val("Communication");
	$("#tab04").val("Datalog");
	$("#tab05").val("Inventory");
	$("#tab06").val("Income");
	$("#tab07").val("Science");
	$("#tab08").val("Biolab");
	$("#tab09").val("Ship");
	$("#tab10").val("Crew");

	$(".disabledButton").removeClass("disabledButton");
}

//PUBLIC
function switchToIntroButtons(type)
{
	if(type === "combat")
	{
		$("#tab01").val("Engage");
		$("#tab02").val("Escape");

		enableButtons(2);
	}
}

//PUBLIC
function switchToOutroButtons(type)
{
	if(type === "combat")
	{
		$("#tab01").val("Continue");

		enableButtons(1);
	}
}

//PUBLIC
function switchToCombatButtons()
{
	$("#tab01").val("Attack");
	$("#tab02").val("Negotiate");
	$("#tab03").val("Technology");
	$("#tab04").val("Examine");
	$("#tab05").val("Items");
	$("#tab06").val("Flee");

	enableButtons(6);
}

function enableButtons(amount)
{
	$(".tabButton").addClass("disabledButton");

	for(i = 1; i <= amount; i++)
	{
		$("#tab0" + i).removeClass("disabledButton");
	}	
}