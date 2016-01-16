var xmls = {
    gameInformation: null,
    events : [],
    locations : null
}
var settings = {
    shipName : "",
    soundOn : true,
    musicOn : true
};
var stats = {
    killVictory : 0,
    diplomacyVictory : 0,
    fleeVictory : 0
};

var factionProgress = {
    factions : [101, 101, 101, 101, 101, 101]
};
var tutorial = {
    finished : false
};
var playerStats = {
    level : 1,
    moneyAmount : 150,
    currentPlayerHp : 5,
    maxPlayerHp : 5,
    currentPlayerShields : 0,
    maxPlayerShields : 0,
    fame : 0,
    charisma : 0
};
var scienceStats = {
    scienceProgress : -1,
    scienceResearch : "",
    scienceResearchProgress : 0
};
var biolabStats = {
    biolabProgress : -1,
    biolabResearch : "",
    biolabResearchProgress : 0
};
var inventory = {
    slotAmount : 4,
    slots : []
};
var enemyStats = {
    maxMoney : 0,
    currentEnemyHp : 0,
    maxEnemyHp : 0,
    diplomacyHealth : 0,
    maxDiplomacyHealth : 0,
    currentEnemyShields : 0,
    maxEnemyShields : 0
};


$(document).ready(function()
{
    if (!isLocalStorageSupported())
    {
        // create a fake localStorage global variable
        localStorage = [];
    }    
});

function isLocalStorageSupported() 
{
    try 
    {
        return 'localStorage' in window && window['localStorage'] !== null;
    } 
    catch (e) 
    {
        return false;
    }
}

//PUBLIC
function saveGame()
{
    localStorage["settings"] = JSON.encode(settings);
    localStorage["stats"] = JSON.encode(stats);

    localStorage["factionProgress"] = JSON.encode(factionProgress);
    localStorage["tutorial"] = JSON.encode(tutorial);
    localStorage["playerStats"] = JSON.encode(playerStats);
    localStorage["scienceStats"] = JSON.encode(scienceStats);
    localStorage["biolabStats"] = JSON.encode(biolabStats);
    localStorage["inventory"] = JSON.encode(inventory);
}

//PUBLIC
function loadGame()
{
    settings = JSON.decode(localStorage["settings"]);
    stats = JSON.decode(localStorage["stats"]);
    factionProgress = JSON.decode(localStorage["factionProgress"]);
    tutorial = JSON.decode(localStorage["tutorial"]);
    playerStats = JSON.decode(localStorage["playerStats"]);
    scienceStats = JSON.decode(localStorage["scienceStats"]);
    biolabStats = JSON.decode(localStorage["biolabStats"]);
    inventory = JSON.decode(localStorage["inventory"]);

    loadXMLs();
    loadFactions();

    toggleSound();
    toggleSound();
    toggleMusic();
    toggleMusic();
    
    updateAll();
}

function loadXMLs()
{
    // WEB
    //xmls.gameInformation = getXML("../xml/gameInformation.xml");
    //xmls.events1 = getXML("../xml/events1.xml");
    //xmls.locations = getXML("../xml/locations.xml");
    // LOCAL SCHOOL
    xmls.gameInformation = getXML("file:///D:/Work/Html/SpaceCraft/xml/gameInformation.xml");
    loadEvents();
    xmls.locations = getXML("file:///D:/Work/Html/SpaceCraft/xml/locations.xml");

    function loadEvents()
    {
        var amount = playerStats.level;

        for(i = 0; i <= amount; i++)
        {
            loadEvent(i);
        }
    }
}

function getXML(name)
{
    var xmlHandler;

    $.ajax({
        type: "GET",
        url: name,
        dataType: "xml",
        async: false,
        success: function(xml){
            xmlHandler = $(xml);
        },
        error: function(xhr, status, error) {
            alert(xhr + " " + status + " " + error);
        }
    });

    return xmlHandler;
}



function loadEvent(level)
{
    xmls.events.push(getXML("file:///D:/Work/Html/SpaceCraft/xml/events" + level + ".xml"));
}