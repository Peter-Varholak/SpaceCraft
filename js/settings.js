var DAY_SECONDS = 86400000;

$(document).ready(function()
{
    startTime();
    
    $("#timer").dblclick(function () {
        displayInfo();
    });    
});

function startTime()
{
    var today = new Date();
    var seconds = today.getTime();
    var years = 100 + Math.floor(seconds / (600 * DAY_SECONDS));
    var yearDay = Math.floor((seconds / DAY_SECONDS) % 600);
    var season = Math.floor((yearDay / 120) + 1);
    var month = Math.floor(((yearDay - (120 * (season - 1))) / 30) + 1);
    var day = Math.floor(yearDay - (120 * (season - 1)) - (30 * (month - 1)));
    var h = today.getHours();
    var m = today.getMinutes();
    h = checkTime(h);
    m = checkTime(m);
    document.getElementById("timer").innerHTML =
    "AS " + years + "-" + season + "-" + month + "-" + day + " " + h + ":" + m;
    var t = setTimeout(startTime, 60000);
}

//PUBLIC
function toggleSound()
{
    $("#soundPlayer").get(0).volume = 1.0;

    if(settings.soundOn === true)
    {
        $("#soundPlayer").get(0).muted = true;
        $("#soundButton").attr("src", "img/soundDisabled.svg");
        settings.soundOn = false;
    }
    else
    {
        $("#soundPlayer").get(0).muted = false;
        $("#soundButton").attr("src", "img/sound.svg");
        settings.soundOn = true;
    }
}

//PUBLIC
function toggleMusic()
{
    $("#musicPlayer").get(0).volume = 1.0;

    if(settings.musicOn === true)
    {
        $("#musicPlayer").get(0).muted = true;
        $("#musicButton").attr("src", "img/musicDisabled.svg");
        settings.musicOn = false;
    }
    else
    {
        $("#musicPlayer").get(0).muted = false;
        $("#musicButton").attr("src", "img/music.svg");
        settings.musicOn = true;
    }
}

//PUBLIC
function checkTime(i) 
{
    if (i < 10) {i = "0" + i};
    return i;
}

function displayInfo()
{
    alert("It's me!");
}