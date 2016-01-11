$(document).ready(function()
{
	$(window).resize(function()
	{
  		checkRemoveMessage();
	});
});

//PUBLIC
function changeLocation(text)
{
	$("#location").html(text);
}

//PUBLIC
function changeCommunicationText(text)
{
	$("#communicationText").html(text);
}

//PUBLIC
function addMessage(text, time)
{
	if (time === undefined)
	{
		var date = new Date();
		var currentTime = checkTime(date.getHours()) + ':' + checkTime(date.getMinutes());
	}
	else
	{
		var currentTime = time;
	}
	
	$("#messages").prepend('<div class="message">\n<div class="messageTime">' + currentTime + '</div>\n<div class="messageText">' + text + '</div>\n</div>');
	checkRemoveMessage();
}

function checkRemoveMessage()
{
	if(checkOverflow())
	{
		$("#messages").children().last().remove();
		checkRemoveMessage()
	}	
}

function checkOverflow()
{
	var childrenCount = $("#messages").children().length;
	var messages = document.getElementById("messages");
	if(childrenCount > 0)
	{
		if (messages.children[childrenCount - 1].offsetTop + 
		messages.children[childrenCount - 1].offsetHeight >
	  	messages.offsetTop + messages.offsetHeight)
		{
		    return true;
		}
		else
		{
			return false;
		}
	}	
}