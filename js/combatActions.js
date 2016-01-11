function takeDamage(damage)
{
    if(playerStats.currentPlayerShields > 0)
    {
        playerStats.currentPlayerShields--;
        updatePlayerShields();
        return;
    }

    playerStats.currentPlayerHp -= parseInt(damage);
    updatePlayerHealth();

    if (playerStats.currentPlayerHp <= 0)
    {
        alert("Game over");
        location.reload();
    }
}

function playerHeal(heal)
{
    playerStats.currentPlayerHp += parseInt(heal);
    updatePlayerHealth();

    if (playerStats.currentPlayerHp >= playerStats.maxPlayerHp)
    {
        playerStats.currentPlayerHp = playerStats.maxPlayerHp;
    }
}

function dealDamage(damage)
{
    //add weapon check layer on top of this
    negotiateHeal(damage * 5);

    if(enemyStats.currentEnemyShields > 0)
    {
        enemyStats.currentEnemyShields--;
        updateEnemyShields();
        return;
    }

    enemyStats.currentEnemyHp -= parseInt(damage);
    updateEnemyHealth();

    if (enemyStats.currentEnemyHp <= 0)
    {
        eventEnd("combat", "kill");
    }
}

function enemyHeal(heal)
{
    enemyStats.currentEnemyHp += parseInt(heal);
    updateEnemyHealth();

    if (enemyStats.currentEnemyHp >= enemyStats.maxEnemyHp)
    {
        enemyStats.currentEnemyHp = enemyStats.maxEnemyHp;
    }
}

function negotiate(negotiate)
{
    var amount = (Math.floor(playerStats.fame / 20) * 10);

    if(amount < 0)
    {
        amount *= -1;
    }

    amount += parseInt(negotiate);

    enemyStats.diplomacyHealth -= parseInt(amount);

    var message;    
    
    if (enemyStats.diplomacyHealth <= 0)
    {
        eventEnd("combat", "diplomacy");
    }
    else if(enemyStats.diplomacyHealth < enemyStats.maxDiplomacyHealth * 0.33)
    {
        message = eventTag.find('negotiation3').get(0).innerHTML;
        changeCommunicationText(message);
    }
    else if(enemyStats.diplomacyHealth < enemyStats.maxDiplomacyHealth * 0.66)
    {
        message = eventTag.find('negotiation2').get(0).innerHTML;
        changeCommunicationText(message);
    }
    else
    {
        message = eventTag.find('negotiation1').get(0).innerHTML;
        changeCommunicationText(message);
    }
}

function negotiateHeal(negotiate)
{
    var amount = (Math.floor(playerStats.fame / 10) * 5);

    if(amount < 0)
    {
        amount *= -1;
    }

    amount += parseInt(negotiate);

    enemyStats.diplomacyHealth += parseInt(amount);
}

function updatePlayerHealth()
{
    $("#playerHealthValue").html(playerStats.currentPlayerHp + "/" + playerStats.maxPlayerHp);
}

function updatePlayerShields()
{
    $("#playerShieldValue").html(playerStats.currentPlayerShields + "/" + playerStats.maxPlayerShields);
}

function updateEnemyHealth()
{
    $("#enemyHealthValue").html(enemyStats.currentEnemyHp + "/" + enemyStats.maxEnemyHp);
}

function updateEnemyShields()
{
    $("#enemyShieldValue").html(enemyStats.currentEnemyShields + "/" + enemyStats.maxEnemyShields);    
}