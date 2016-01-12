function addMoney(money)
{
    playerStats.moneyAmount += parseInt(money);
    updatePlayerMoney();

    addMessage("I gained " + money + " " + gameInformation.find('currencyname').get(0).innerHTML + (money == 1) ? "." : "s.");
}

function removeMoney(money, reason)
{
    var newAmount = playerStats.moneyAmount - parseInt(money);

    if(newAmount < 0)
    {
        if(reason === "buy")
        {
            addMessage("I can't afford that.");
            return false;
        }
        else
        {
            newAmount = 0;
        }
    }

    playerStats.moneyAmount = newAmount;
    updatePlayerMoney();

    if(reason === "buy")
    {
        addMessage("I spent " + money + " " + gameInformation.find('currencyname').get(0).innerHTML + (money == 1) ? "." : "s.");
    }
    else
    {
        if(newAmount === 0)
        {
            addMessage("I lost all my " + gameInformation.find('currencyname').get(0).innerHTML + "s.");
        }
        else
        {
            addMessage("I lost " + money + " " + gameInformation.find('currencyname').get(0).innerHTML + (money == 1) ? "." : "s.");
        }        
    }
}

function addFame(fame)
{
    playerStats.fame += parseInt(fame);
    updatePlayerFame();

    if(playerStats.fame < -100)
    {
        playerStats.fame = -100;
    }
    if(playerStats.fame > 100)
    {
        playerStats.fame = 100;
    }
}

function updatePlayerFame()
{
    $("#playerFameValue").html(playerStats.fame);
}

function updatePlayerMoney()
{
    $("#playerMoneyValue").html(playerStats.moneyAmount);
}

function updatePlayer()
{
    updatePlayerHealth();
    updatePlayerShields();
    updatePlayerFame();
    updatePlayerMoney();
}

function updateEnemy()
{
    updateEnemyHealth();
    updateEnemyShields();
}

function updateAll()
{
    updatePlayer();
    updateEnemy();
}