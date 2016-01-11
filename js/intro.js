$(document).ready(function()
{
	if(localStorage.getItem("spacecraftSave") !== "true")
	{
		newGame();
	}

	$(".clickableIntro").click(function()
    {
        resolveIntroScreen($(this).val());
    });
});

function resolveIntroScreen(button)
{
    if(button === "CONTINUE")
    {
        startGame();
    }
    else if(button === "NEW GAME")
    {
        overwriteGame();
    }
    else if(button === "PLAY")
    {
        setupGame();
    }
    else
    {
        alert("You messed it up.");
    }
}

function newGame()
{
    $("#botButton").val("PLAY");
    $("#topButton").val("");
    $("#topButton").attr(
    {
        "class" : "", 
        "type" : "text",
        "placeholder" : "Name your ship"
    });
    $("#topButton").toggleClass("inputField");
}

function overwriteGame()
{
    if(confirm("Overwrite saved game?"))
    {
        saveGame();
        newGame();
    }  
}  

function setupGame()
{
    if($("#topButton").val() == "")
    {
        settings.shipName = "SS TooLazyToNameMyShip";
    }
    else
    {
        settings.shipName = $("#topButton").val();
    }
    
    saveGame();
    localStorage.setItem("spacecraftSave", true);
    startGame();
}

function startGame()
{
    loadGame();
    $("body").toggleClass("changedBody");
    $("#timer").toggleClass("afterChange");
    $("#uiButtons").toggleClass("afterChange");
    $("#intro").fadeOut(1000);      
    $("#game").fadeIn(2500);
    $("#musicPlayer").get(0).play();
}