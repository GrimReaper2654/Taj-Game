// Functions
function randint(min, max) { // Randint returns random interger between min and max (both included)
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function randchoice(list, remove=false) { // chose 1 from a list and update list
    console.log(list);
    let length = list.length;
    let choice = randint(0, length-1);
    if (remove) {
        console.log(choice);
        let chosen = list.splice(choice, 1);
        return [chosen, list];
    }
    console.log(list[choice]);
    return list[choice];
}

const descriptions = {
    bodyParts: ["head", "shoulder", "knee", "toe", "arm", "hand", "chest", "foot", "hip", "wrist", "shin", "leg", "neck"],
    naturalHazard: ["stick", "leaf", "Taj clone", "wall", "rock"],
    strong: ["powerful", "deadly", "incredible", "amazing", "flawless"],
    general: ["mediocre", "average", "strong", "weak", "lackluster"],
    enemyPrep: ["gets into a battle stance", "intimidatingly waves his weapon", "charges up an attack", "flexes his muscles"],
    enemyAppeared: ["appeared in front of you", "landed in front of you", "emerged from the shaddows"],
    find: ['locate', 'stumble upon', 'discover', 'see'],
    location: ['in a wooden crate', 'hidden in a corner', 'on a rock', 'on the ground'],
    insults: ['Taj deez nuts', 'Ta-Ja', 'you spedlord', 'you sped'],
    rage: [`"I hate you!"`, `"DIE!`]
};

// Constants
// Teir 1: Taj's basement 
// Teir 2: Innovations Island
// Teir 3: Taj Church
// Teir 4: Taj Territory

var player_name = 'Spedry';
var settings = { // most of these do nothing
    stat_limit: 1000,
    enable_shield: true,
    enable_hunger: true,
    rapid_regeneration: false,
    weapon_durability: false,
    secondary_ammo: true,
    taunting: true,
    intelligence: true,
    evasion: true,
    min_hunger_to_regen: 0.4,
    max_regen: 200,
    
};

const data = {
    buttons: {
        continue: `<button id="continue" onclick="finishCutscene()">Continue</button>`,
    },
};

//Functions
function replaceHtml(textID, text) {
    document.getElementById(textID).innerHTML = text;
};

function addHtml(textID, text) {
    document.getElementById(textID).innerHTML = document.getElementById(textID).innerHTML + text;
};

async function displayText(textID, text, delay=10) {
    for(let i=0;i<text.length;i++) {
        document.getElementById(textID).innerHTML += text[i];
        await delay(delay);
    }
};

// Cutscene stuff, this took many hours :( 
const delay = ms => new Promise(res => setTimeout(res, ms));
var cutsceneEnded = false;
async function cutscene(text, sped = true) {
    replaceHtml('controlPannel', '');
    await showText(text,sped);
    replaceHtml('controlPannel', '');
    while (!cutsceneEnded) {
        console.log('Waiting in cutscene');
        await delay(250);
    }
    cutsceneEnded = false;
    hideText("controlPannel");
    hideText("console");
    console.log("cutscene finished");
    return;
}
function finishCutscene() {
    cutsceneEnded = true;
};

var finishedChoosing = false;
async function choice(description,choices,useNames=false,returnObject=false,canCancel=true,sped=true) {
    showButton('');
    console.log(canCancel);
    console.log(choices);
    returnObj=returnObject;
    var globalChoices = choices;
    let numChoices = choices.length;
    await showText(description,sped);
    hideText("controlPannel");
    for (let i = 0; i < numChoices; i++){
        let textToDisplay = choices[i];
        if (useNames) {
            textToDisplay = choices[i].name;
        }
        console.log(`<button id="choice${i}" onclick="choose(${i})">${textToDisplay}</button>`);
        addButton(`<button id="choice${i}" onclick="choose(${i})">${textToDisplay}</button>`);
    }
    if (canCancel) {
        console.log(canCancel);
        addButton(`<button id="choice${-1}" onclick="choose(${-1})">Cancel</button>`);
    }
    while (finishedChoosing===false) {
        console.log('waiting in choice function');
        await delay(250);
    }
    
    let output = finishedChoosing;
    finishedChoosing = false;
    if (returnObject) {
        console.log('qqqqqqq');
        console.log('choices');
        if (output != -1) {
            output = choices[output];
        }
    }
    return output;
};

function choose(output) {
    console.log(output);
    finishedChoosing = output;
};

// The rest of the functions
function bar(displayName, size, value, lost, limit=settings.stat_limit, showValue=true) {
    /*
    console.log(lost,value);
    if (value < 0) {
        lost += value;
        value = 0;
    }*/
    let startingvalue = value + lost;
    if (value < 0) {
        value = 0;
    }
    lost = startingvalue - value;
    //console.log(lost,value);
    let bar = '';
    let filled = Math.round((value/limit)*size);
    let halfFilled = Math.round((lost/limit)*size);
    let empty = size-filled-halfFilled;
    if (empty < 0) {
        halfFilled+=empty;
        empty = 0;
        if (halfFilled < 0) {
            console.log(`bruh`);
            return 1;
        }
    }
    if (filled + halfFilled + empty != size) {
        console.log(`bruh bruh bruh`);
        console.log(value);
        console.log(filled + halfFilled + empty);
        console.log(filled);
        console.log(halfFilled);
        console.log(empty);
        return 1;
    }
    for (let i=0; i<filled; i++) {
        bar += '█';
    }
    for (let i=0; i<halfFilled; i++) {
        bar += '▒';
    }
    for (let i=0; i<empty; i++) {
        bar += ' ';
    }
    let display = `${displayName} ▕${bar}▏`;
    if (showValue) {
        /*
        let end = '';
        if (value < 1000) {
            end += ' ';
        }
        if (value < 100) {
            end += ' ';
        }
        if (value < 10) {
            end += ' ';
        }*/
        let info = `(${Math.round(value)}/${limit})`;
        
        let filler = 12-info.length;
        for (let i=0; i<filler; i++) {
            info += ' ';
        }
        display+=info//+end;
    }
    //console.log(display);
    return display
};

async function updateStats(player) {
    while(player.lost != [0,0,0,0]) {
        let format = `<p id="bar">-------------------------------------------${player.playerName}-------------------------------------------<br>${bar(' health', 20, player.health, player.lost[0])}${bar('  mental health', 20, player.mental_health, player.lost[1])}<br>${bar(' hunger', 20, player.hunger, player.lost[2])}${bar('   intelligence', 20, player.intelligence, player.lost[3])}</p>`;
        //console.log(format);
        //console.log(format);
        document.getElementById("playerBars").innerHTML = format;
        for (let i=0; i<4; i++) {
            player.lost[i] -= 10;
            if (player.lost[i] < 0) {
                player.lost[i] = 0;
            }
        }
        await delay(200);
    }
};

async function updateEnemy(enemyList) {
    let cont = true;
    while(cont) {
        cont = false;
        let format = `<p id="bar">------------------------------------------Enemies------------------------------------------<br>`;
        for (let i=0; i<enemyList.length; i++) {
            format += bar(enemyList[i].shortName, 15, enemyList[i].health, enemyList[i].lost, enemyList[i].maxHealth, false);
            format += '     ';
            if (i % 3 == 0) {
                format += '<br>';
            }
            if (enemyList[i].lost != 0) {
                enemyList[i].lost -= 10;
                cont = true;
            }
            if (enemyList[i].lost < 0) {
                enemyList[i].lost = 0;
            }
        }
        format+=`</p>`;
        document.getElementById("enemyBars").innerHTML = format;
        await delay(500);
    }
};

async function showInventory(player, isCutscene = false) {
    let inventory = `-----------------Invenotry-----------------<br>`;
    for (let i=0; i<player.inventory.items.length; i++) {
        let item = player.inventory.items[i];
        
        if (item.type != 'ammunition') {
            inventory += `[${i}] ${item.name} (${item.quantity})<br>`;
        }
    }
    if (isCutscene) {
        await cutscene(inventory,false);
        return;
    } else {
        console.log(inventory);
        return inventory;
    }
};

async function giveItem(player, item=null, items=null) {
    let chosenItem = null;
    if (items) {
        chosenItem = randchoice(items);
    } else {
        chosenItem = item
    }
    console.log(chosenItem);
    console.log(player);
    let decision = await choice(`You ${randchoice(descriptions.find)} ${chosenItem.quantity} ${chosenItem.name} ${randchoice(descriptions.location)}`, ['take', 'leave'],false,false,false,false);
    if (!decision) {
        if (player.inventory.items.length >= 7) {
            await cutscene(`${player.name} is a weaking and can not carry any more items. Maybe if you worked out more instead of playing computer games (yes, I'm looking at you Taj), you could carry more items.`);
        } else {
            await cutscene(`You take the ${chosenItem.name}`);
            player.inventory.items.push(JSON.parse(JSON.stringify(chosenItem)));
        }
    } else {
        await cutscene(`You leave the ${chosenItem.name}`);
    }
    return player;
};

async function giveWeapon(player, weapon=null, weaponsList=null) {
    let chosenItem = null;
    if (weaponsList != null) {
        console.log('list');
        console.log(weaponsList);
        chosenItem = randomWeapon(weaponsList);
    } else {
        console.log('weapon');
        console.log(weapon);
        chosenItem = weapon
    }
    console.log(chosenItem);
    console.log(player);
    let decision = await choice(`You ${randchoice(descriptions.find)} a ${chosenItem.name} ${randchoice(descriptions.location)}`, ['take', 'leave']);
    if (!decision) {
        let slot = await choice(`Which weapon slot do you use?`, ['main 1', 'main 2'])
        if (slot) {
            console.log('replacing weapon slot 2');
            console.log(JSON.parse(JSON.stringify(chosenItem)));
            player.inventory.weapons.main2 = JSON.parse(JSON.stringify(chosenItem));
            console.log(player);
        } else {
            console.log('replacing weapon slot 1');
            console.log(JSON.parse(JSON.stringify(chosenItem)));
            player.inventory.weapons.main1 = JSON.parse(JSON.stringify(chosenItem));
            console.log(player);
        }
        await cutscene(`You take the ${chosenItem.name}`);
    } else {
        await cutscene(`You leave the ${chosenItem.name}`);
    }
    return player;
};

async function equipArmour(player, armour = null) {
    if (armour == null) {
        armour = randchoice(armours);
    }
    console.log(armour);
    console.log(player);
    let decision = await choice(`You ${randchoice(descriptions.find)} a ${armour.name}`, ['equip', 'leave'],false,false,false,false);
    if (!decision) {
        await cutscene(`You put on the ${armour.name}`);
        player.armour = JSON.parse(JSON.stringify(armour.armour));
        player.strength += armour.strengthIncease;
    } else {
        await cutscene(`You leave the ${armour.name}`);
    }
    return player;
};

function updatePlayer(player, healthChange=0, hungerChange=0, mentalChange=0, intelligenceChange=0, strengthChange = 0, regenerateion=false) {
    console.log('updating player');
    console.log(player);
    let oldPlayer = JSON.parse(JSON.stringify(player));
    if (strengthChange) {
        player.strength += strengthChange/100;
    }
    if (healthChange) {
        player.health += healthChange;
        player.mental_health += healthChange/10;
    }
    if (hungerChange) {
        player.hunger += hungerChange;
        if (hungerChange > 0) {
            player.mental_health += 10;
        }
    }
    if (mentalChange) {
        player.mental_health += mentalChange;
        if (mentalChange < 250) {
            player.intelligence -= 10;
        }
    }
    if (intelligenceChange) {
        player.intelligence += intelligenceChange;
        player.mental_health += intelligenceChange/4;
    }
    if (regenerateion && settings.enable_hunger) {
        console.log('regenerating player')
        let regenCapacity = (player.hunger-(settings.stat_limit*settings.min_hunger_to_regen))/2;
        regenCapacity *= 1-((settings.stat_limit-player.health)/settings.stat_limit); // more hp = less regen (slows down regeneration as your health increases)
        if (regenCapacity > settings.max_regen) {
            regenCapacity = settings.max_regen;
        }
        console.log('regen cap:',regenCapacity);
        let missingHp = settings.stat_limit-player.health;
        console.log('missing hp:',missingHp);
        if (missingHp > regenCapacity) {
            missingHp = regenCapacity;
        }
        console.log('regenerated hp:',missingHp);
        player.health += missingHp;
        player.hunger -= missingHp/2;
    }
    console.log(player);
    // Fix Stats
    if (player.health > settings.stat_limit) {
        player.health = settings.stat_limit;
    }
    if (player.strength > settings.stat_limit) {
        player.strength = settings.stat_limit;
    }
    if (player.hunger > settings.stat_limit) {
        player.hunger = settings.stat_limit;
    }
    if (player.hunger < 0) {
        player.health += player.hunger;
        player.mental_health += player.hunger;
        player.hunger = 0;
    }
    if (player.mental_health > settings.stat_limit) {
        player.mental_health = settings.stat_limit;
    }
    if (player.mental_health < 0) {
        player.health += player.mental_health;
        player.mental_health = 0;
    }
    if (player.intelligence > settings.stat_limit) {
        player.intelligence = settings.stat_limit;
    }
    if (player.intelligence < 0) {
        player.intelligence = 0;
    }
    if (player.strength < 0) {
        player.strength = 0; // TODO: If strength too low, you hurt yourself becayuse taj is stoopid
    }
    healthChange = oldPlayer.health - player.health;
    if (healthChange >= 0) {
        player.lost[0] = healthChange;
    }
    mentalChange = oldPlayer.mental_health - player.mental_health;
    if (mentalChange >= 0) {
        player.lost[1] = mentalChange;
    }
    hungerChange = oldPlayer.hunger - player.hunger;
    if (hungerChange >= 0) {
        player.lost[2] = hungerChange;
    }
    intelligenceChange = oldPlayer.intelligence - player.intelligence;
    if (intelligenceChange >= 0) {
        player.lost[3] = intelligenceChange;
    }
    console.log(player);
    return player

};

async function simulateAttack(attacker, defenders, attack=null, isPlayer=false) { // TODO: Fix This
    console.log('simulating attack');
    console.log(attack);
    if (attack != null && attack.type == 'throwable') {
        if (attack.damageType == 'splash') {
            for (let i = 0; i < defenders.length; i++) {
                if (defenders[i].armour[physical].durability > 0) {
                    defenders[i].armour[physical].durability -= damage;
                    damage -= defenders[i].armour[physical].resistance;
                    if (damage < 0) {
                        damage = 0;
                    }
                }
                defenders[i].health -= damage; 
            }
        } else if (attack.damageType == 'true') {
            defenders[0].health -= damage;
        } else {
            if (defenders[0].armour[physical].durability > 0) {
                defenders[0].armour[physical].durability -= damage;
                damage -= defenders[0].armour[physical].resistance;
                if (damage < 0) {
                    damage = 0;
                }
            }
            defenders[0].health -= damage; 
        }
        await cutscene(`${attacker} threw a ${attack.name} at ${defender}!`);
    } else {
        console.log('simulating normal attack');
        if (!isPlayer) {
            defenders = [defenders];
        }
        defenders.push('ListEnd');
        let defenderNumber = 0;
        let defender = defenders[defenderNumber];
        if (attack === null) {
            console.log('chosing random attack');
            console.log(attacker);
            attack = randchoice(attacker.attacks);
        }
        let hitChance = 0; // initialise hitchance
        if (isPlayer) {
            //         Weapon base accuracy         enemy evasion
            hitChance = attack.baseAccuracy/100 * defender.evasionChance;
        } else {
            //         Weapon base accuracy         player evasion (calculation is weird)
            console.log(attack.baseAccuracy/100);
            console.log(defender.intelligence);
            console.log(defender);
            hitChance = attack.baseAccuracy/100 - (((defender.intelligence)/settings.stat_limit)-0.5)/2;
        }
        console.log('simulating hit chance');
        console.log(hitChance);
        if (randint(1,500) <= hitChance*1000) { // attacker hits defender
            console.log('attacker hit');
            let attackResults = [0,0];
            let continueAttacking = true;
            var totalAttacks = 0;
            while (continueAttacking) {
                let damage = randint(attack.damage[0],attack.damage[1]);
                damage *= attacker.strength;
                console.log(damage);
                if (attack.type == mental && !(isPlayer)) {
                    attackResult[1] = -damage;
                } else {
                    // Calculate armour
                    if (attack.type != mental || attack.type != piercing) {
                        if (defender.armour[attack.type].durability > 0) {
                            defender.armour[attack.type].durability -= damage;
                            damage -= defender.armour[attack.type].resistance;
                            if (damage < 0) {
                                damage = 0;
                            }
                        }
                    }
                    if (attack.type == piercing) {
                        defender.armour[physical].durability -= damage*5;
                        damage = damage-(defender.armour[physical].resistance/2);
                    }
                    attackResults[0] = -damage;
                }
                
                // Check if defender died
                console.log('checking defender alive');
                var defenderDied = false;
                if (isPlayer) {
                    defender.health += attackResults[0];
                    defender.lost -= attackResults[0];
                    if (defender.health <= 0) {
                        defenderDied = true;
                        if (defenders[defenderNumber+1] != 'ListEnd') {
                            defenderNumber++;
                        } else {
                            break;
                        }
                    }
                } else {
                    defender = updatePlayer(defender, attackResults[0], 0, attackResults[1], 0, 0, false);
                    if (defender.health <= 0) {
                        defenderDied = true;
                    }
                }

                // Attack again?
                console.log('checkign if attack again');
                if (isPlayer && totalAttacks < attack.rapidfire[1] && randint(1,100) <= attack.rapidfire[0]) {
                    totalAttacks++;
                } else {
                    continueAttacking = false;
                }
            }

            // Log Messages
            console.log('logging messages');
            if (defenderDied) {
                let msg = randchoice(attack.attack_description.KO);
                msg = msg.replace('[attacker]', attacker.name);
                msg = msg.replace('[defender]', defender.name);
                msg = msg.replace('[strong]', randchoice(descriptions.strong));
                msg = msg.replace('[description]', randchoice(descriptions.general));
                msg = msg.replace('[natrualHazard]', randchoice(descriptions.naturalHazard));
                msg = msg.replace('[body]', randchoice(descriptions.bodyParts));
                await cutscene(msg);
                await cutscene(`${defender.name} has been defeated!`);
            } else if (totalAttacks = 1) {
                let msg = randchoice(attack.attack_description.single);
                msg = msg.replace('[attacker]', attacker.name);
                msg = msg.replace('[defender]', defender.name);
                msg = msg.replace('[strong]', randchoice(descriptions.strong));
                msg = msg.replace('[description]', randchoice(descriptions.general));
                msg = msg.replace('[natrualHazard]', randchoice(descriptions.naturalHazard));
                msg = msg.replace('[body]', randchoice(descriptions.bodyParts));
                await cutscene(msg);
            } else if (totalAttacks > 1) {
                let msg = randchoice(attack.attack_description.multi);
                msg = msg.replace('[attacker]', attacker.name);
                msg = msg.replace('[defender]', defender.name);
                msg = msg.replace('[strong]', randchoice(descriptions.strong));
                msg = msg.replace('[description]', randchoice(descriptions.general));
                msg = msg.replace('[natrualHazard]', randchoice(descriptions.naturalHazard));
                msg = msg.replace('[body]', randchoice(descriptions.bodyParts));
                await cutscene(msg);
            }
        } else {
            console.log('attacker missed');
            console.log(attack)
            let msg = randchoice(attack.attack_description.miss);
            msg = msg.replace('[attacker]', attacker.name);
            msg = msg.replace('[defender]', defender.name);
            msg = msg.replace('[strong]', randchoice(descriptions.strong));
            msg = msg.replace('[description]', randchoice(descriptions.general));
            msg = msg.replace('[natrualHazard]', randchoice(descriptions.naturalHazard));
            msg = msg.replace('[body]', randchoice(descriptions.bodyParts));
            await cutscene(msg);
        }
        defenders.pop();
    }
    if (!isPlayer) {
        defenders = defenders[0];
    }
    return [attacker, defenders];
};

async function useItem(player, enemies, itemID) {
    console.log(itemID);
    console.log(player);
    if (player.inventory.items[itemID].type == 'consumable') {
        player = updatePlayer(player, randint(player.inventory.items[itemID].healthRegen[0],player.inventory.items[itemID].healthRegen[1]), randint(player.inventory.items[itemID].hungerRegen[0],player.inventory.items[itemID].hungerRegen[2]), randint(player.inventory.items[itemID].mentalRegen[0],player.inventory.items[itemID].mentalRegen[1]), randint(player.inventory.items[itemID].intelligenceIncrease[0],player.inventory.items[itemID].intelligenceIncrease[1]), randint(player.inventory.items[itemID].strengthChange[0],player.inventory.items[itemID].strengthChange[1]), false);
        await cutscene(`You consume the ${player.inventory.items[itemID].name}.`);
    } else if (player.inventory.items[itemID].type == 'throwable') {
        await cutscene(`You throw the ${player.inventory.items[itemID].name} towards your enemies.`);
        let result = await simulateAttack(player, enemies, player.inventory.items[itemID], true);
        player = result[0];
        enemy = result[1];
    }
    console.log(player);
    let quickConsume = player.inventory.items[itemID].quickConsume;
    player.inventory.items[itemID].quantity--;
    if (player.inventory.items[itemID].quantity == 0) {
        player.inventory.items.splice(itemID, 1);
    }
    
    return [player, enemies, quickConsume];
};

async function playerTurn(player, enemies) {
    console.log(player);
    // Show player controlls
    const actions = ['attack', 'item', 'talk'];
    let canAttack = true;
    while (canAttack) {
        switch (await choice(`Your Turn: `, actions, false, false, false)) {
            case 0:
                console.log('attacking');
                let attacks = [player.inventory.weapons.hands, player.inventory.weapons.feet, player.inventory.weapons.main1, player.inventory.weapons.main2, player.inventory.weapons.secondary];
                let action =  await choice(`Choose Attack: `, attacks, true, true);
                console.log(action);
                if (action != -1) {
                    console.log('start attack')
                    let attackResult = await simulateAttack(player, enemies, action, true);
                    player = attackResult[0];
                    enemy = attackResult[1];
                    canAttack = false;
                    console.log('finished attack');
                }
                break;
            case 1:
                console.log(`${String(await showInventory(player))} <br> Use item:`);
                let item = await choice(`${String(await showInventory(player))} <br> Use item:`,player.inventory.items,true,false,true,false);
                if (item != -1) {
                    console.log(player);
                    let itemResult = await useItem(player, enemies, item);
                    player = itemResult[0];
                    enemies = itemResult[1];
                    canAttack = itemResult[2];
                }
                break;
            case 2:
                let speech = await choice(`What do you say:`, ['insult', 'compliment', 'bribe']);
                if (speech != -1) {
                    switch (speech) {
                        case 0:
                            await cutscene(`You enrage ${enemies[0].name} with a witty insult. (${randchoice(descriptions.insults)})`);
                            break;
                        case 1:
                            await cutscene(`You compliment ${enemies[0].name} and hopefully weakens his will to fight.`);
                            break;
                        case 2:
                            await cutscene(`You offer ${enemies[0].name} a stick you found on the ground. ${enemies[0].name} is not impressed.`);
                            break;
                        default:
                            break;
                    }
                    canAttack = false;
                } else{ 
                    canAttack = true;
                }
                break;
            default:
                canAttack = true;
                break;
        }
    }
    return [player, enemies];
};

async function enemyTurn(player, enemies) { // Enemy attacks Player (TODO: Enemy should react to player talking)
    console.log(enemies)
    for (let i=0; i<enemies.length; i++) {
        enemy = enemies[i];
        if (settings.taunting && !(randint(0,5))) {
            console.log('enemy taunts');
            console.log(enemy);
            let taunt = randchoice(enemy.quotes); 
            let prep = randchoice(descriptions.enemyPrep);
            let enemyLine = `${enemy.name} shouts "${taunt}" as he ${prep}`;
            await cutscene(enemyLine); // TODO: Enemy needs better lines to say
        } else {
            // Enemy Attacks
            let result = await simulateAttack(enemy, player);
            player = result[1];
            enemy = result[0];
        }
    }
    return [player, enemies];
};

function isDead(character) {
    if (character.health <= 0) {
        return 1;
    }
    return 0;
};

async function LBozo(player) {
    await cutscene(`LMAO U DIED!! TRASH!!! Now you have ${randint(10,99)} viruses on your computer. Lmao L Bozo. Imagine dying, can't relate. What a ${player_name} moment.`); // TODO: Add more insults
    await cutscene(`GG ${player_name}, you died to a lowly grunt and didn't even get to see Terrorist Taj (looks like I coded that boss fight for nothing). You got ending 1 out of 3 which is the noob ending. Reload the page to play again.`);
    await cutscene(`BTW: you don't actually have viruses on your computer, I was joking.`);
    await cutscene(`Reload the game now, there is nothing more to see. You will get nowhere by pressing continue.`);
    await cutscene(`Reload the game now, there is nothing more to see. You will get nowhere by pressing continue.`);
    await cutscene(`Reload the game now, there is nothing more to see. You will get nowhere by pressing continue.`);
    await cutscene(`Reload the game now, there is nothing more to see. You will get nowhere by pressing continue.`);
    await cutscene(`Reload the game now, there is nothing more to see. You will get nowhere by pressing continue.`);
    await cutscene(`There is nothing more to see. Stop clicking continue`);
    await cutscene(`Stop clicking continue`);
    await cutscene(`Stop`);
    await cutscene(`Stop!`);
    await cutscene(`STOP`);
    await cutscene(`S T O P !`);
    await cutscene(`STOP!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!`);
    for (let i=0; i<=5; i++) {
        await cutscene(`Bet you wished you could skip cutscenes. Now you have to wait for this very long message to load. Surely you have better things to do with your life. THere is actually nothing more to see but if you don't believe me, you can keep clicking.`);
    }
    await cutscene(`How did you even see this! There was a forever loop infont of this. HACKS!!!!!!!!!!!`);
    await cutscene(`Enjoy another forever loop!`);
    for (let i=0; i<=5; i++) {
        await cutscene(`Bet you wished you could skip cutscenes. Now you have to wait for this very long message to load. Surely you have better things to do with your life. THere is actually nothing more to see but if you don't believe me, you can keep clicking.`);
    }
    await cutscene(`How did you escape another forever loop! HAX!!!!!!!!!!!!`);
    await cutscene(`FIne, you can keep playing`);
    player.health = settings.stat_limit;
    player.mental_health = settings.stat_limit;
    player.hunger = settings.stat_limit;
    player.intelligence = settings.stat_limit;
    return player;
};

async function fight(player, enemy) {
    // Create list with enemies to fight
    console.log("starting fight");
    console.log(player);
    console.log(enemy);
    // F i g h t
    let plural = '';
    if (enemy.length > 1) {
        plural = 's';
    }
    await cutscene(`${enemy.length} ${enemy[0].name}${plural} ${randchoice(descriptions.enemyAppeared)}`);
    updateEnemy(enemy);
    while (1) {
        console.log('starting round');
        console.log(player);
        let result = await playerTurn(player, enemy);
        console.log(result)
        player = result[0];
        enemy = result[1];
        console.log('Player turn done!');
        updateStats(player);
        updateEnemy(enemy);
        console.log(player);
        console.log(enemy);
        for (let i=0; i<enemy.length; i++) {
            if (isDead(enemy[i])) {
                enemy.splice(i, 1);
            }
        }
        if (enemy.length == 0) {
            return player;
        }
        console.log('enemy turn');
        result = await enemyTurn(player, enemy);
        player = result[0];
        enemy = result[1];
        updateStats(player);
        updateEnemy(enemy);
        if (isDead(player)) {
            player = await LBozo(player); // player can revive if they are dedicated
        }
        player = updatePlayer(player, 0, -10, 0, 0, 0, true);
        console.log('player:');
        console.log(player);
    }
};

async function block(time, chance=1, type) {
    console.log(type);
    let choices = [];
    if (type == 1) {
        for(let i=0;i<20;i++) {
            choices.push(randchoice(['blok', 'bloock', 'bl0ck', 'bock', 'b lock', 'b1ock', 'blokc']));
        }
        for(let i=0;i<chance;i++) {
            choices[randint(0,19)] = 'block';
        }
    } else {
        for(let i=0;i<20;i++) {
            choices.push(' ');
        }
        /* Intensive planning
        0 0 0 0 0
        0 0 0 0 0
        0 0 0 0 0
        0 0 0 0 0

        Assume blast radius 2
        0 0 1 0 0
        0 1 1 1 0
        0 0 1 0 0
        0 0 0 0 0

        0 1 2 3 4
        5 6 7 8 9
        0 1 2 3 4
        5 6 7 8 9
        */
        for(let i=0;i<chance;i++) { // drop chance number of bombs on the player
            let coords = randint(0,19);
            choices[coords] = 'x'
            if (coords+1 % 5 != 0) { // left
                choices[coords+1] = 'x'
            }
            if (coords % 5 != 0) { // right
                choices[coords-1] = 'x'
            }
            if (coords > 4) { // top
                choices[coords-5] = 'x'
            }
            if (coords < 15) { // bottom
                choices[coords+5] = 'x'
            }
        }
    }
    console.log(choices);
    let current = new Date();
    let startTime = [current.getDate(),current.getHours(),current.getMinutes(),current.getSeconds()];
    let msg = (type) ? 'BLOCK' : 'DODGE';
    let decision = await choice(`<p id="strong">${msg}!</p>`,choices,false,true,false,false);
    console.log(decision);
    current = new Date();
    let endTime = [current.getDate(),current.getHours(),current.getMinutes(),current.getSeconds()];
    for(let i=0;i<2;i++) {
        if(endTime[i]!=startTime[i]) {
            return 'too slow';
        }
    }
    if (endTime[3]-startTime[3] > time) {
        return 'too slow';
    } else {
        if (decision == 'block' || decision == ' ') {
            return 'blocked';
        } else {
            return 'miss'
        }
    }


}

async function blockCalc(player,a,b,type=1) {
    let result = await block(a, b,type);
    let success = true;
    switch (result) {
        case 'too slow':
            let msg1 = (type) ? `You raise your arms to block but you are too slow!` : `You fail to escape the blast radius of the missiles!`;
            await cutscene(msg1);
            success = false;
            break;
        case 'miss':
            let msg2 = (type) ? `You try to block Taj's attack but you miss!` : `You fail to escape the blast radius of the missiles!`;
            await cutscene(msg2);
            success = false;
            break;
        case 'blocked':
            if (type) {
                if (player.strength < 5) {
                    await cutscene(`Taj's fist connects with your block, shattering some of your bones!`);
                    success = false;
                } else {
                    await cutscene(`You manage to stop one of Taj's punches!`);
                }
            } else {
                await cutscene("You avoid some of Taj's tomahawk crusie missiles!");
            }
            break;
        default:
            console.log('bruh it broke again');
    }
    return success;
}

async function intro(player) {
    if (await choice(`skip intro?`, ['yes','no'], false, false, false)) {
        await cutscene(`You painfully open your bruised eyes as pain shoots through your nerves like lightning. Fireworks exploded between your troubled neurons (are you proud of me Henry?) as your woefully indaequate brain struggled to comprehend your situation.`);
        await cutscene(`"Where am I?" you whisper to yourself, staring into the endless void around you as you struggled to recall your final moments, "Did I die?"`);
        await cutscene(`Your battered body collapses onto the jagged granite floor as incomprehensible agony tore at your mind.`);
        await cutscene(`Decades old memories resurface, blurry images flash through your mind, too breif and unclear for you to understand. However, one memory stands out from all the others.`);
        await cutscene(`You bearly manage to recall a towering figure excluding an oppressive aura. The rest of their appearance evades your memory but his name is engraved into your mind in jagged red letters.`);
        await cutscene(`<p id="strong">Taj the Terrorist</p>`,false);
        await cutscene(`You do not recall why, but the thought of him fills you with determination and bloodlust.`);
        await cutscene(`There is only one thing you desire...`);
        await cutscene(`<p id="strong">REVENGE</p>`,false);
        //await cutscene(`You painfully open your bruised eyes as pain shoots through your nerves like lightning. Silence envelops you as you stare into the endless dark void around you. Your battered body collapses beneath you as a dull throbbing pain fills your mind. Decades old memories resurface, blurry images flash through your mind, too breif and unclear for you to understand. However, one memory stands out from all the others. You bearly manage to recall a towering figure excluding an aura of power. The rest of their appearance evades you but his name is engraved into your mind in jagged red letters. "Taj the Terrorist." You do not recall why, but the thought of him fills you with determination and bloodlust. There is only one thing you desire: REVENGE!<br>`);
        if (player.isTerrorist) {
        await cutscene(`In reality, ${player.name} is a wanted terrorist, responsible for thousands of deaths. Even Taj the Terrorist, the most evil, cruel and psychopatic terrorist, despises you. Lmao Noob<br>`);
        }
    }
};

async function level1(player) { // First level (get some starting items and escape the starting room, you alos get some backstory)
    const searchFails = [
        `Your grope around on the darknes but you can only feel the course stone floor and the occasional patch of moss rubbing against the palms of your hands.`,
        `You slowly crawl across the cold stone floor, searching for anything that could help you. However, your efforts were proven to be futile as you did not locate anything of use.`,
        `You crawn through the room and bump your head on a wall. Classic ${player_name} moment. You give up searching for now and lie down on the ground to recover.`,
        `You explore the room until you are exhausted but your search yields no results.`,
        `You run through the darkness like a wild ${player_name} and trip over a ${randchoice(descriptions.naturalHazard)}.`,
        `You get increaingly paranoid as you creep through the darkness before succumbing to a heart attack. Nice one, ${player_name}! Also, you did not die. You do not deserve death, you deserve worse.`
    ];
    const nextLevel = [
        'You find entrance to next room', // somebody reword this and add more options!!!!!!
    ];
    const talk = [
        `"Hello!" you shout into the darkness, "Is there anybody there?" However, there is no response.`, // somebody add more!!!!!!!!!!!
    ];
    let possibleActions = [
        'search room', 
        'check posessions',
        'think',
        'look for exit',
        'talk'
    ];
    let backstoryFragments = [ // somebody make up backstory
        'no backstory for u',
        '404 backstory not found',
        'pay $10 to unlock the backstory of this game. What do you mean? This is not P2W!',
    ];
    await cutscene(`As the pain in your limbs slowly fades into the background, you contemplate your choices.`);
    while (1) {
        console.log(player);
        switch (await choice(`What do you do, ${player_name}?`, possibleActions, false, false, false)) {
            case 0:
                if (randint(0, 3)) { // 66% chance to get stuff
                    if (randint(0, 3)) { // 66% change to get items 33% change to get weapons
                        player = await giveItem(player, null, startingItems);
                        console.log(player);
                    } else {
                        console.log(weapons.teir1);
                        player = await giveWeapon(player, null, weapons.tier1);
                        console.log(player);
                    }
                } else {
                    await cutscene(randchoice(searchFails));
                }
                break;
            case 1:
                await showInventory(player, true);
                break;
            case 2:
                if (backstoryFragments.length > 0) {
                    console.log('printing backstory');
                    let result = randchoice(backstoryFragments, true);
                    let backstory = result[0];
                    backstoryFragments = result[1];
                    console.log(backstory);
                    console.log(backstoryFragments);
                    await cutscene(backstory);
                } else {
                    console.log("no more backstories");
                    await cutscene("You can not remember anything else.");
                }
                break;
            case 3:
                await cutscene(randchoice(nextLevel));
                return player;
            case 4:
                await cutscene(randchoice(talk));
                break;
            default:
                return 1;
        }
    }
};

async function level(character, fights, enemiesList, description, itemList, weaponList) {
    console.log(weaponList)
    console.log('Starting Level');
    let player = character;
    console.log(player);
    await cutscene(description[0]);
    updateStats(player);
    for (let i=0; i<fights; i++) {
        if (randint(0,5)) { // † Debug
            let enemyType = randchoice(enemiesList);
            console.log("chosen enemy:");
            console.log(enemyType);
            let enemyNum = randint(enemyType.quantity[0],enemyType.quantity[1]);
            let enemyList = [];
            for (let j=0; j<enemyNum; j++) {
                enemyList.push(JSON.parse(JSON.stringify(enemyType)));
            }
            console.log("Enemy list:");
            console.log(enemyList);
            player = await fight(player, enemyList);
        } else {
            let a = [`You discover a deserted area with some useful items scattered about.`, `You find a deserted warehouse which still contains some items`, `you locate a store room containing some valuable items`];
            await cutscene(randchoice(a));
            let numItems = randint(2,5);
            for (let i=0;i<numItems;i++) {
                if (randint(0, 4)) { // 75% change to get items 25% change to get weapons
                    if (randint(0, 3)) { // 66% item 33% armour
                        player = await giveItem(player, null, itemList);
                        console.log(player);
                    } else {
                        player = await equipArmour(player);
                        console.log(player);
                    }
                } else {
                    console.log(weaponList);
                    player = await giveWeapon(player, null, weaponList);
                    console.log(player);
                }
            }
        }
    }
    await cutscene(description[1]);
    console.log('Level Complete');
    console.log(player);
    return player;
};

async function bossBattle(player) {
    await cutscene(`You arrive in Taj the Terrorist's throne room.`);
    console.log(player);
    console.log(enemies.taj[0]);
    updateStats(player);
    updateEnemy([enemies.taj[0]]);
    await cutscene(`"Hello there," says Taj as he looks up from his Conflict of Nations game, "I have been expecting you,"`);
    await cutscene(`${randchoice(descriptions.rage)} you scream vehemently as you charge towards Taj the Terrorist.`);
    const actions = ['attack', 'attack', 'attack', 'attack', 'attack'];
    await choice(`Your Turn: `, actions, false, false, false); // Lmao you think you stand a chance against Taj
    if (player.intelligence < settings.stat_limit) {
        await cutscene(`Before you can react, Taj disappears from your vision as your puny mortal brain struggles to comprehend what happened. (what do you mean you're smarter than that, your a ${player_name}!)`);
    } else {
        await cutscene(`Before you can attack, you see a fist headding straight for your chest!`);
        switch (await block(5, 5, 1)) {
            case 'too slow':
                await cutscene(`You raise your arms to block but it is too late!`);
                console.log(weapons.taj.punch);
                let r1 = await simulateAttack(enemies.taj[0], player, weapons.taj.strPunch);
                player = r1[1];
                break;
            case 'miss':
                await cutscene(`You try to block Taj's attack but you miss!`);
                let r2 = await simulateAttack(enemies.taj[0], player, weapons.taj.strPunch);
                player = r2[1];
                break;
            case 'blocked':
                if (player.strength < 5) {
                    await cutscene(`Taj's fist connects with your block, shattering every bone in your arms!`);
                    let result = await simulateAttack(enemies.taj[0], player, weapons.taj.strPunch);
                    player = result[1];
                } else {
                    await cutscene(`You manage to stop Taj's attack!`);
                    await cutscene(`"Not bad," says Taj, "however, you shall die now!"`);
                    await cutscene(`Taj launches a barrage of punches at you!`);
                    let numAttacks = randint(3,6);
                    let success = true;
                    for (let i=0; i<numAttacks; i++) {
                        success = await blockCalc(player,3,2);
                        if (success != true) {
                            let result = await simulateAttack(enemies.taj[0], player, weapons.taj.punch);
                            player = result[1];
                            if (isDead(player)) {
                                break;
                            }
                        }
                    }
                    if (!isDead(player)) {
                        await cutscene(`"DIE!" Taj roars in anger.`);
                        await cutscene(`Taj stops his barrage of punches and charges up a massive energy blast!`);
                        const actions = ['attack', 'run', 'stand still', 'block'];
                        await choice(`What do you do: `, actions, false, false, false);
                        let result = await simulateAttack(enemies.taj[0], player, weapons.taj.ultimateBlast);
                        player = result[1];
                        if (isDead(player)) {
                            await cutscene(`You Died.`);
                            await cutscene(`GG ${player_name}, you almost reached the end.`);
                            await cutscene(`Epilogue:`);
                            await cutscene(`"Another one bites the dust..." Taj thinks to himself as he stares at your remains with contempt before turning back to his game.`);
                            await cutscene(`Taj's computer screen showed only two words: You Died! "NOOOOOOOOOOOOO" screams Taj as he throws another tantrum.`);
                            await cutscene(`You reached ending 2 out of 3. Reload the page to play again.`);
                            return;
                        } else {
                            await cutscene(`You survive Taj's energy attack!`);
                            await cutscene(`"You have survived for far too long!" roared Taj the Terrorist as he pulled out a remote controller.`);
                            await cutscene(`"Feel the power of my Tomahawk missiles!" Taj screams as he slams hishand onto a big red button.`);
                            let duration = randint(2,8);
                            for (let i=0; i<duration; i++) {
                                success = await blockCalc(player,1,randint(2,4),0);
                                if (success != true) {
                                    let result = await simulateAttack(enemies.taj[0], player, weapons.taj.tomahawk);
                                    player = result[1];
                                    if (isDead(player)) {
                                        break;
                                    }
                                }
                            }
                            if (isDead(player)) {
                                await cutscene(`You Died.`);
                                await cutscene(`GG ${player_name}, dying by cruise missiles isn't such a bad way to go.`);
                                await cutscene(`Epilogue:`);
                                await cutscene(`"Another one bites the dust..." Taj thinks to himself as he stares at the massive craters in his room before turning back to his game.`);
                                await cutscene(`Taj's eyes widened in horror as he stared at the piece of metal sticking out of his computer. "NOOOOOOOO" Taj screams as he throws another tantrum.`);
                                await cutscene(`You reached ending 2 out of 3. Reload the page to play again.`);
                                return;
                            } else {
                                await cutscene(`Taj looks tired and collapses onto the ground, breahting heavilly!`);
                                await cutscene(`You advance towards Taj, raising a sword you found on the ground.`);
                                await cutscene(`"Think about what you are doing!" Taj cried out, "You don't have to do this! This isn't the only way!"`);
                                const actions = ['kill Taj', 'spare Taj'];
                                let decision = await choice(`What do you do to Taj: `, actions, false, false, false); // Lmao you think you stand a chance against Taj
                                if (decision) {
                                    await cutscene(`You spare Taj and choose not to kill him.`);
                                    await cutscene(`Taj stabs you in the back once you turn away!`);
                                    player.lost[0] +=player.health;
                                    player.health = 0;
                                    updateStats(player);
                                    await cutscene(`You Died.`);
                                    await cutscene(`GG ${player_name}, so close yet so far...`);
                                    await cutscene(`You reached ending 2 out of 3. Reload the page to play again.`);
                                    return;
                                } else {
                                    await cutscene(`You choose to kill Taj!`);
                                    await cutscene(`"Please!" screamed Taj, "You will break the balance of the world by killing me!"`);
                                    await cutscene(`"Think about the consequences!" shouted Taj as you swung your sword."`);
                                    updateEnemy([enemies.taj[1]]);
                                    await cutscene(`You watch Taj's dead body collapse on the ground as your mind starts to clear.`);
                                    await cutscene(`No longer blinded by rage, doubt starts to creep into your mind.`);
                                    await cutscene(`"What has he ever done to me?" you wonder, "Why do I hate him so much?"`);
                                    await cutscene(`console.log(moreBackstory());`);
                                    await cutscene(`GG ${player_name}, you have reached ending 3 out of 3, the only ending where you survive. You can reload the game to play again and try to find all the secret areas in the game.`);
                                    return;
                                }
                            }
                        }
                    }
                }
        }
        
            
        
    }
    await cutscene(`A sharp pain erupts form your stomach as you spit out blood. A bloddy arm protrudes out of your chest as darkness obscures your vision.`);
    await cutscene(`You feel nothing as your broken body falls onto Taj's luxurious carpet, staining it with your blood. As your consciousness fades, you finally see the truth.`);
    await cutscene(`You were never strong enough, your mortal body was too fragile, your underdeveloped mind was too weak. Taj the terrorist is far stronger than you can comprehend.`);
    await cutscene(`"I was a fool to have chalenged him," you think to yourself as you close your eyes for the last time.`);
    await cutscene(`GG ${player_name}, you did well to make it this far.`);
    await cutscene(`Epilogue:`);
    await cutscene(`"Another one bites the dust..." Taj thinks to himself as he stares at your broken body with contempt before turning back to his game.`);
    await cutscene(`Taj's computer screen showed only two words: You Died! "NOOOOOOOOOOOOO" screams Taj as he throws another tantrum.`);
    await cutscene(`You reached ending 2 out of 3. Reload the page to play again.`);
};

async function game(character) {
    console.log('game started!');
    let player = character;
    console.log(player);
    await intro(player);
    console.log('intro done!');
    // Level 1 (Leave the starting room)
    player = await level1(player);
    console.log('starting room escaped!');
    let stay = true;
    while (stay) {
        console.log(weapons.tier1)
        player = await level(player, randint(4,6), enemies.innovations, ['You find yourself on the island of innovations','You see an entrance to the next area'], t1Items, weapons.tier1);
        stay = await choice(`Do you exit the current area?`, ['yes','no'],false,false,false,true);
        console.log(stay);
    }
    stay = true;
    while (stay) {
        player = await level(player, randint(2,3), enemies.religious, ['You find yourself in the Tajism church','You see an entrance to the next area'], t2Items, weapons.tier2);
        stay = await choice(`Do you exit the current area?`, ['yes','no'],false,false,false,true);
        console.log(stay);
    }
    stay = true;
    while (stay) {
        player = await level(player, randint(4,7), enemies.default, ["You find yourself within Taj's basement",'You see an entrance to the next area'], t3Items, weapons.tier3);
        stay = await choice(`Do you exit the current area?`, ['yes','no'],false,false,false,true);
        console.log(stay);
    }
    stay = true;
    while (stay) {
        player = await level(player, randint(1,2), enemies.spedlords, ["You find yourself in the Taj's bastion",'You see an entrance to the next area'], t4Items, weapons.tier4);
        stay = await choice(`Do you exit the current area?`, ['yes','no'],false,false,false,true);
        console.log(stay);
    }
    bossBattle(player);
};

async function runGame() {
    await game(player);
    console.log('game finished');
};

async function init() {
    console.log('initialising!');
    hideText("startScreen");
    hideText("console");
    hideText("controlPannel");
    showTitle(`<h1>The Taj Game</h1>`);
    console.log('starting game!');

    let boss = await choice('boss fight?', ['no', 'yes']);
    if (boss) {
        await bossBattle(bossPlayer);
        await cutscene('bossfight done!');
    }
    await runGame();
    return 0;
};

function load() {
    console.log('showed title screen');
    showTitle(`<h1>The Taj Game</h1>`);
    showButton(`<button onclick="init()">Start Game</button>`);
};

/*
------------------------------------------------------------Spedry------------------------------------------------------------<br>    health ▕█████████████████████████▏(1000/1000)       mental health ▕█████████████████████████▏(1000/1000)
    hunger ▕█████████████████████████▏(1000/1000)        intelligence ▕█████████████████████████▏(1000/1000)
*/
