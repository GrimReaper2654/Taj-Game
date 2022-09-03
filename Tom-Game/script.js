/*
INFO
Local Storage for Tom Game is under window.localStorage.tomGame



*/

// Constants
const physical = 'physical';
const fire = 'fire';
const energy = 'energy';
const magical = 'magical';
const poison = 'poison';
const mental = 'mental';     // damages mental health
const piercing = 'piercing'; // Extra damage to armour
// Stats
const str = 'strength';
const intel = 'intelligence';

const bodyParts = ["head", "shoulder", "knee", "toe", "arm", "hand", "chest", "foot", "hip", "wrist", "shin", "leg", "neck"]
const naturalHazard = ["stick", "crack", "Tom", "body", "blood", "magical forces"]
const insults = ['You smell bad.', 'You are stupid.', 'TOM - A!', 'You are a cruise missile.', 'TOM-A-HAWK!']
const missMessages = ['You missed.', 'Your attack missed.', 'Your attack was dodged', 'Your attack was evaded', `You tripped on ${randchoice(naturalHazard)}.`, `You stumbled on ${randchoice(naturalHazard)}.`]

// Variables

var player = {
    name: "Benry Hird",
    health: 10000,
    evasion_chance: 2,
    
}

var settings = {
    stat_limit: 1000,
    enable_shield: true, // Not implemented yet
    enable_hunger: true, // Not implemented yet
    rapid_regeneration: false, // Not implemented yet
    weapon_durability: false, // Not implemented yet
    secondary_ammo: true, // Not implemented yet
    taunting: true, // Not implemented yet
    intelligence: true,
    evasion: true,
    dmg_multilier: 1,
    heal_multiplier: 1,
    shield_protection_multiplier: 1,
    shield_durability_multiplier: 1, 
    enemy_intelligence_multiplier: 1,
    maxLevel: 10,
    
};

var turn = "player"

const bannedIPs = []

const enemies = [
    /*
    // Python:
    // ['Name [0]', 'Health [1]', 'Damage Multiplier [2]', ['Attacks [3]'], ['Quotes [4]'], 'Last Words [5]', 'Quantity [6]',
    // 'Can Die [7]', 'evasion [8]', ['Block description [9]'], [['physical armour [10][0][0]', 'durability [10][0][1]'],
    // ['heat armour [10][1][0]', 'durability [10][1][1]'], ['mental armour [10][2][0]', 'durability [10][2][1]']]],

    // JS Example
    
    {name: "Tom",
    health: 100,
    damage_multiplier: 1.5,
    damage: [1,2,5],
    quotes: ["Hi BIRD-A", "TOMAHAWK"],
    last_words: "Goodbye, World!",
    quantity: 2,
    can_die: true,
    evasion_chance: 10,                          
    armour: {
        physical: {durability: 100},
        fire: {durability: 100},
        energy: {durability: 100},
        magical: {durability: 100}}
    }
    */

    // IMPORTANT! EXAMPLE: currentEnemies = [enemies[0].default[0]] to get the bodyguard
   {
    default: [
        {
            name: "Bodyguard",
            health: 300,
            damage_multiplier: 1.5,
            damage: [10,20],
            quotes: ["I shall defend Tom with my life!", "Death to the enemies of Tom!", "I shall protect Tom!", "You shall not Pass!"],
            last_words: null,
            quantity: [1,3],
            can_die: true,
            evasion_chance: 1,
            armour: {
                physical: {durability: 100, resistance: 10},
                fire: {durability: 50, resistance: 5},
                energy: {durability: 0, resistance: 0},
                magical: {durability: 0, resistance: 0}
            }
        },
        {
            name: "Servant",
            health: 100,
            damage_multiplier: 1,
            damage: [10, 30],
            quotes: ["I serve Tom!", 'for Tom!'],
            last_words: null,
            quantity: [1,2],
            can_die: true,
            evasion_chance: 1.5,
            armour: {
                physical: {durability: 0, resistance: 0},
                fire: {durability: 0, resistance: 0},
                energy: {durability: 0, resistance: 0},
                magical: {durability: 0, resistance: 0}
            }
        },
    ],
    religious: [
        {
            name: "Tomism Priest",
            health: 50,
            damage_multiplier: 1,
            damage: [15,30],
            quotes: ["Hail Tom Bird!", "For Tom Bird!", "I shall protect the lord!"],
            last_words: ["You shall not defeat the Tom Bird"],
            quantity: [5,10],
            can_die: true,
            evasion_chance: 0.9,
            armour: {
                physical: {durability: 0, resistance: 0},
                fire: {durability: 0, resistance: 0},
                energy: {durability: 0, resistance: 0},
                magical: {durability: 200, resistance: 50}
            }
        },
        {
            name: "Tomism Cultist",
            health: 50,
            damage_multiplier: 0.5,
            damage: [20,50],
            quotes: ["Hail Tom Bird!"],
            last_words: ["You shall not defeat the Tom Bird"],
            quantity: [10,30],
            can_die: true,
            evasion_chance: 100,
            armour: {
                physical: {durability: 0, resistance: 0},
                fire: {durability: 0, resistance: 0},
                energy: {durability: 0, resistance: 0},
                magical: {durability: 0, resistance: 0}
            }
        },
        {
            name: "Tomism Bishop",
            health: 200,
            damage_multiplier: 1,
            damage: [30,100],
            quotes: ["Hail Tom Bird!", "For Tom Bird!", "I shall protect the lord!", "die nonbeliever!"],
            last_words: ["You shall not defeat the Tom Bird"],
            quantity: [1,2],
            can_die: true,
            evasion_chance: 0.5,
            armour: {
                physical: {durability: 20, resistance: 10},
                fire: {durability: 50, resistance: 10},
                energy: {durability: 50, resistance: 10},
                magical: {durability: 500, resistance: 75}
            }
        },
    ],
    innovations: [
        {
            name: "Choyuni Farmer",
            health: 100,
            damage_multiplier: 0.75,
            damage: [10, 30],
            quotes: ["[Inaudible Muttering]", "[Grunt]"],
            last_words: null,
            quantity: [1,5],
            can_die: true,
            evasion_chance: 2,
            armour: {
                physical: {durability: 0, resistance: 0},
                fire: {durability: 0, resistance: 0},
                energy: {durability: 0, resistance: 0},
                magical: {durability: 0, resistance: 0}
            }
        },
        {
            name: "Choyuni Miner",
            health: 150,
            damage_multiplier: 1,
            damage: [20,50],
            quotes: ["[Inaudible Muttering]", "[Grunt]"],
            last_words: null,
            quantity: [1,3],
            can_die: true,
            evasion_chance: 5,
            armour: {
                physical: {durability: 0, resistance: 0},
                fire: {durability: 0, resistance: 0},
                energy: {durability: 0, resistance: 0},
                magical: {durability: 0, resistance: 0}
            }
        },
        {
            name: "Choyuni Soldier",
            health: 300,
            damage_multiplier: 1,
            damage: [50,100],
            quotes: ["[Inaudible Muttering]", "[Grunt]"],
            last_words: null,
            quantity: [1,2],
            can_die: true,
            evasion_chance: 1,
            armour: {
                physical: {durability: 50, resistance: 10},
                fire: {durability: 0, resistance: 0},
                energy: {durability: 0, resistance: 0},
                magical: {durability: 0, resistance: 0}
            }
        },
        {
            name: "Macelord",
            health: 2000,
            damage_multiplier: 1,
            damage: [100,300],
            quotes: ["I am the all mighty Mace!", "die peasants!"],
            last_words: null,
            quantity: [1],
            can_die: true,
            evasion_chance: 1,
            armour: {
                physical: {durability: 500, resistance: 50},
                fire: {durability: 0, resistance: 0},
                energy: {durability: 0, resistance: 0},
                magical: {durability: 0, resistance: 0}
            }
        },
        {
            name: "Witch doctor",
            health: 700,
            damage_multiplier: 1,
            damage: [30,70],
            quotes: [null],
            last_words: null,
            quantity: [1],
            can_die: true,
            evasion_chance: 1,
            armour: {
                physical: {durability: 0, resistance: 0},
                fire: {durability: 0, resistance: 0},
                energy: {durability: 100, resistance: 10},
                magical: {durability: 1000, resistance: 100}
            }
        },
    ],
    spedlords: [
        {
            name: "Spedlord Mace", // Mace uses splash damage and dodges attacks
            health: 5000,
            damage_multiplier: 2,
            damage: [100,150],
            quotes: ["Mace superiority"],
            last_words: null,
            quantity: [1],
            can_die: false,
            evasion_chance: 0.5,
            armour: {
                physical: {durability: 1000, resistance: 10},
                fire: {durability: 1000, resistance: 10},
                energy: {durability: 1000, resistance: 10},
                magical: {durability: 1000, resistance: 10}
            }
        },
        {
            name: "Spedlord Ethan", // Ethan is a tank with high health and damage
            health: 10000,
            damage_multiplier: 3,
            damage: [100,500],
            quotes: ["Ethan superiority"],
            last_words: null,
            quantity: [1],
            can_die: false,
            evasion_chance: 5,
            armour: {
                physical: {durability: 10000, resistance: 500},
                fire: {durability: 10000, resistance: 500},
                energy: {durability: 10000, resistance: 500},
                magical: {durability: 10000, resistance: 500}
            }
        },
        {
            name: "Spedlord Bento", // Bento is weak
            health: 1000,
            damage_multiplier: 1,
            damage: [10,20],
            quotes: ["Bento superiority"],
            last_words: null,
            quantity: [1],
            can_die: false,
            evasion_chance: 1,
            armour: {
                physical: {durability: 1000, resistance: 100},
                fire: {durability: 1000, resistance: 100},
                energy: {durability: 1000, resistance: 100},
                magical: {durability: 1000, resistance: 100}
            }
        },
        {
            name: "Terrorist Tom", // Tom is strong
            health: 50000,
            damage_multiplier: 1,
            damage: [150,500],
            quotes: ["Tom superiority"],
            last_words: null,
            quantity: [1],
            can_die: false,
            evasion_chance: 1000,
            armour: {
                physical: {durability: 5000, resistance: 1000},
                fire: {durability: 5000, resistance: 1000},
                energy: {durability: 5000, resistance: 1000},
                magical: {durability: 5000, resistance: 1000}
            }
        },
    ],
   }





]
const weapons = {
    body: {
        none: {
            name: 'none',
            player_useable: false,
            damage: [0,0],
            baseAccuracy: 0,
            type: null,
            multiplier: null,
            rapidfire: [0,0],
            attack_description: {'default':['If you see this, there is a problem']}
        },
        punch: {
            name: 'punch',
            player_useable: true,
            damage: [15,25],
            baseAccuracy: 80,
            type: physical,
            multiplier: str,
            rapidfire: [30,5],
            attack_description: {
                'KO': [
                    '[attacker] sent [defender] flying with [strong] blow!', 
                    '[defender] collapses after taking [strong] punch from [attacker]!', 
                    '[defender] flees after taking [strong] hit from [attacker]!',
                    '[attacker] kills [defender] with [strong] punch!',
                ],
                'single': [
                    '[attacker] landed [description] punch on [defender]!', 
                    '[attacker] punched [defender] in the [body]!',
                    '[attacker] karate chops [defender]!',
                    '[attacker] slaps [defender] in the face!'
                ],
                'multi': [
                    '[attacker] landed [description] series of punches on [defender]!',
                    '[attacker] unleashes a powerful martial arts technique on [defender]!',
                ],
                'miss': [
                    '[attacker]\'s punch misses [defender]!',
                    '[attacker] trips on [naturalHazard] and misses!',
                    '[attacker] swings wildly at [defender] and misses!',
                    '[defender] deflects [attacker]\'s punch with a martial arts parry!',
                    '[defender] blocks [attacker]\'s strike with a martial arts parry!',
                    '[defender] dodges to the side, avoiding [attacker]\'s punch with ease!',
                ]
            }
        },
        kick: {
            name: 'kick',
            player_useable: true,
            damage: [20,50],
            baseAccuracy: 60,
            type: physical,
            multiplier: str,
            rapidfire: [20,4],
            attack_description: {
                'KO': [
                    '[attacker] sent [defender] flying with [strong] kick!', 
                    '[defender] collapses after taking [strong] roundhouse kick from [attacker]!', 
                    '[defender] flees after taking [strong] kick from [attacker]!',
                    '[attacker] kills [defender] with [strong] kick!',
                ],
                'single': [
                    '[attacker] landed [description] kick on [defender]!', 
                    '[attacker] kicks [defender] in the [body]!',
                ],
                'multi': [
                    '[attacker] landed [description] series of kicks on [defender]!',
                    '[attacker] unleashes a powerful martial arts technique on [defender]!',
                ],
                'miss': [
                    '[attacker]\'s kick misses [defender]!',
                    '[attacker] trips on [naturalHazard] and misses!',
                    '[attacker]\'s kick is blocked by [naturalHazard]!',
                    '[attacker] kicks at [defender] and loses ballence, missing [defender] by a wide margin!',
                    '[defender] deflects [attacker]\'s kick with a martial arts parry!',
                    '[defender] blocks [attacker]\'s kick with a martial arts parry!',
                    '[defender] dodges to the side, avoiding [attacker]\'s kick with ease!',
                ]
            }
        },
    },
    tier1: {
        twig: {
            name: 'twig',
            player_useable: true,
            damage: [15,30],
            baseAccuracy: 90,
            type: physical,
            multiplier: str,
            rapidfire: [80,6],
            attack_description: {
                'KO': [
                    '[attacker] piered [defender]\'s heart with a twig!', 
                    '[attacker] stabbed [defender]\'s eyes with a twig!', 
                    '[defender] collapses after being whacked by a twig!', 
                    '[defender] flees after taking [strong] attack from [attacker]!',
                ],
                'single': [
                    '[attacker] whacked [defender]\'s [body] with a twig!', 
                    '[attacker] stabbed [defender]\'s [body] with a twig!', 
                ],
                'multi': [
                    '[attacker] landed [description] series of hits on [defender]!',
                    '[attacker] rapidly hits [defender] with a twig!',
                ],
                'miss': [
                    '[attacker] trips on [naturalHazard] and misses!',
                    '[attacker] swings his twig wildly at [defender] and misses!',
                    '[attacker] swipes at [defender] with a twig and misses!',
                    '[defender] dodges to the side, avoiding [attacker]\'s twig with ease!',
                ]
            }
        },
        stick: {
            name: 'stick',
            player_useable: true,
            damage: [20,35],
            baseAccuracy: 85,
            type: physical,
            multiplier: str,
            rapidfire: [80,7],
            attack_description: {
                'KO': [
                    '[attacker] piered [defender]\'s heart with a stick!', 
                    '[attacker] stabbed [defender]\'s eyes with a stick!', 
                    '[defender] collapses after being whacked by a stick!', 
                    '[defender] flees after taking [strong] attack from [attacker]!',
                ],
                'single': [
                    '[attacker] whacked [defender]\'s [body] with a stick!', 
                    '[attacker] stabbed [defender]\'s [body] with a stick!', 
                    '[attacker] whipped [defender]\'s [body] with a stick!', 
                ],
                'multi': [
                    '[attacker] landed [description] series of hits on [defender]!',
                    '[attacker] rapidly hits [defender] with a stick!',
                ],
                'miss': [
                    '[attacker] trips on [naturalHazard] and misses!',
                    '[attacker] thrusts his stick at [defender] and misses!',
                    '[attacker] swings his stick wildly at [defender] and misses!',
                    '[attacker] swipes at [defender] with a stick and misses!',
                    '[defender] dodges to the side, avoiding [attacker]\'s stick with ease!',
                ]
            }
        },
        treeBranch: {
            name: 'tree branch',
            player_useable: true,
            damage: [50,100],
            baseAccuracy: 75,
            type: physical,
            multiplier: str,
            rapidfire: [10,3],
            attack_description: {
                'KO': [
                    '[attacker] crushes [defender] with a tree branch!', 
                    '[attacker] sends [defender] flying with [strong] hit!', 
                    '[defender] collapses after being whacked by a tree branch!', 
                    '[defender] flees after taking [strong] attack from [attacker]!',
                ],
                'single': [
                    '[attacker] whacked [defender]\'s [body] with a tree branch!', 
                    '[attacker] stabbed [defender]\'s [body] with a tree branch!', 
                    '[attacker] whipped [defender]\'s [body] with a tree branch!', 
                ],
                'multi': [
                    '[attacker] landed [description] series of hits on [defender]!',
                    '[attacker] rapidly hits [defender] with a tree branch!',
                ],
                'miss': [
                    '[attacker] trips on [naturalHazard] and misses!',
                    '[attacker] thrusts his tree branch at [defender] and misses!',
                    '[attacker] swings his tree branch wildly at [defender] and misses!',
                    '[attacker] swipes at [defender] with a tree branch and misses!',
                    '[defender] dodges to the side, avoiding [attacker]\'s tree branch with ease!',
                ]
            }
        },
        log: {
            name: 'log',
            player_useable: true,
            damage: [50,100],
            baseAccuracy: 50,
            type: physical,
            multiplier: str,
            rapidfire: [0,0],
            attack_description: {
                'KO': [
                    '[attacker] crushes [defender] with a log!', 
                    '[attacker] sends [defender] flying with [strong] hit!', 
                    '[defender] collapses after being whacked by a log!', 
                    '[defender] is crushed under [attacker]\'s log!',
                ],
                'single': [
                    '[attacker] bashed [defender]\'s [body] with a log!', 
                ],
                'miss': [
                    '[attacker] trips on [naturalHazard] and misses!',
                    '[attacker] collapses under the weight of his log!',
                    '[attacker] thrusts his log at [defender] and misses!',
                    '[attacker] swings his log wildly at [defender] and misses!',
                    '[attacker] swipes at [defender] with a log and misses!',
                    '[defender] dodges to the side, avoiding [attacker]\'s log with ease!',
                ]
            }
        },
        sharpRock: {
            name: 'sharp rock',
            player_useable: true,
            damage: [75,90],
            baseAccuracy: 80,
            type: physical,
            multiplier: str,
            rapidfire: [40,4],
            attack_description: {
                KO: [
                    '[attacker] pierces [defender]\'s heart with a sharp rock!', 
                    '[defender] flees after being stabbled by [attacker]\'s sharp rock!',
                ],
                single: [
                    '[attacker] slashed [defender]\'s [body] with a sharp rock!', 
                    '[attacker] stabbed [defender]\'s [body] with a sharp rock!', 
                ],
                multi: [
                    '[attacker] landed [description] series of hits on [defender]!',
                    '[attacker] rapidly cuts [defender] with a sharp rock!',
                    '[attacker] rapidly slashes at [defender] with a sharp rock!',
                ],
                miss: [
                    '[attacker] trips on [naturalHazard] and misses!',
                    '[attacker] fumbles and almost drops his sharp rock!',
                    '[attacker] thrusts his sharp rock at [defender] and misses!',
                    '[attacker] swings his sharp rock wildly at [defender] and misses!',
                    '[attacker] swipes at [defender] with a sharp rock and misses!',
                    '[defender] dodges to the side, avoiding [attacker]\'s sharp rock with ease!',
                ]
            }
        },
    }
    
};




var playerInventory = {
    weapons: {
        slot1: "empty",
        slot2: "empty",
        slot3: "empty",
        slot4: "empty",
        slot5: "empty",
    },
    items: {
        slot1: {
            name: "",
            num: 0,
        },
        slot2: {
            name: "",
            num: 0,
        },
        slot3: {
            name: "",
            num: 0,
        },
        slot4: {
            name: "",
            num: 0,
        },
        slot5: {
            name: "",
            num: 0,
        },
    },
}

var currentLevel = 0

var currentEnemies = []



const intro = `You wake up in a dark room. All you can remember is your name: ${player.name}.<br><br>`


// Functions
window.onload = function() {
    for (let i in bannedIPs) {
        console.log(i)
        if (localStorage.ip == bannedIPs[i]) {
            hacker()
        }
    }
  }

function randint(min, max) { // Randint returns random interger between min and max (both included)
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function randchoice(list, remove=false) { // chose 1 from a list and update list
    let length = list.length;
    let choice = randint(0, length-1);
    if (remove) {
        newList = list.splice(choice, choice)
        return list[choice], newList;
    }
    return list[choice];
}




// Initialization of the game
function init() {
    console.log("Game Initalization Started.")
    hideText("start")
    unhideText("game")
    showText("text", intro)
    hideText("choices")

    console.log("Game Initalization Finished.")
    introduction()
}







function showText(id, text) {
    document.getElementById(id).innerHTML = text
}
function addText(id, text) {
    document.getElementById(id).innerHTML = document.getElementById("text").innerHTML + text
}
function hideText(id) {
    document.getElementById(id).style.display = "none"
}
function unhideText(id) {
    document.getElementById(id).style.display = "block"
}

function deleteText(id) {
    document.getElementById(id).innerHTML = ''
}

function hideInventory() {
    document.getElementById("inventory").style.display = "none"
    return "Done"
}

function showInventory() {
    document.getElementById("inventory").style.display = "block"
    return "Done"
}


function showOptions() {

}


function playerDeath() { // Need to finish death message and add an option to restart the game
    showText("text", `You died.<br>`)
    addText("text", `<button onclick="reload()">Try again?</button>`)
}

function victory() {
    hideText("choices")
    showText("text", `<h2>You won!</h2>`)
}



function checkPlayer() {
    if (player.health <= 0) {
        playerDeath()
    } else if (currentLevel > settings.maxLevel) {
        victory()
    }
}



function checkEnemies() {
    // Need to finish
    // Use .shift() to remove first item in array
    
    try {
        let enemy = currentEnemies[0].name
        let health = currentEnemies[0].health
    
        if (health <= 0) {
            addText("text", `<br>${enemy} died.<br>`)
            currentEnemies.shift()
        }
    } catch {
        checkLevel()
    }
    

    
}

// Checks whether the level is finished
function checkLevel() { // Need to finish
    console.log("checkLevel()")
    console.log(currentEnemies.length)
    if (currentEnemies.length == 0) {
        console.log(`Level ${currentLevel} finished.`)
        if (currentLevel == 1) {
            level1End()
        }
    }
}

function hacker() {
    deleteText("text")
    addText("text", `STOP HACKING`)
    localStorage.setItem("player", true)
}

function reload() {
    location.reload()
}







// Evasion calculation
function evasionCalc(accuracy, evasionChance) {
        if (settings.evasion == true){
        if ((randint(1,3)+1) * accuracy > (randint(1,3)+1) * evasionChance) {
            return "hit"
        } else {
            return "evade"
        }
    }
}


// Damage calculation
function damageCalc(damage) {
    damage = randint(damage[0], damage[1])
    return damage
}







// Attack functions
function playerAttack(weapon) {
    deleteText("text")
    if (weapon == "punch") {
        if (evasionCalc(weapons.body.punch.baseAccuracy, player.evasion_chance) == "hit") {
            damage = damageCalc(weapons.body.punch.damage)
            currentEnemies[0].health -= damage
            addText("text", `You attack the ${currentEnemies[0].name} doing ${damage} damage.<br>`)
        } else {
            addText("text", randchoice(missMessages))
        }
    } else if (weapon == "kick") {
        if (evasionCalc(weapons.body.kick.baseAccuracy, player.evasion_chance) == "hit") {
            damage = damageCalc(weapons.body.kick.damage)
            currentEnemies[0].health -= damage
            addText("text", `You attacked the ${currentEnemies[0].name} doing ${damage} damage.<br><br>`)
        }
    } else {
        if (evasionCalc(weapons.tier1[weapon].baseAccuracy, player.evasion_chance) == "hit") {
            damage = damageCalc(weapons.tier1[weapon].damage)
            currentEnemies[0].health -= damage
            addText("text", `You attacked the ${currentEnemies[0].name} doing ${damage} damage.<br><br>`)
        }
    }

    checkEnemies()
    enemyTurn()
}

// Enemy Turn
function enemyTurn() {
    for (let i in currentEnemies) {
        tempDamage = damageCalc(currentEnemies[i].damage)
        player.health -= tempDamage
        addText("text", `${currentEnemies[i].name} attacked you doing ${tempDamage} damage.<br>`)
    }
    checkPlayer()
    checkEnemies()
    if (player.health > 0) {
        addText("text", `<br>You are on ${player.health} health.<br>`)
        addText("text", `<button onclick="level1()">Next Round</button>`)
        // switch (currentLevel) {     // Need to move
        //     case 1:
        //         addText("text", `<button onclick="level1()">Next Round</button>`)
        //         break
        //     case 2:
        //         addText("text", `<button onclick="level2(true)">Next Level</button>`)
        //         break
        
        // }
    }
    
}





// Introduction related functions
function introWeaponPickUp(weapon) {
    if (playerInventory.weapons.slot1 == "empty") {
        playerInventory.weapons.slot1 = weapon
        introduction2(weapon)
    } else if (playerInventory.weapons.slot1 != "empty") {
        hacker()
    }
}

// Level 1 related functions
function level1Talk() {
    deleteText("text")
    addText("text", `You say: "${randchoice(insults)}"<br>The bodyguards aren't impressed.<br>`)
    enemyTurn()
}

function level1Use() {
    deleteText("text")
    if (playerInventory.items.slot1.name == "") {
        addText("text", `You have no available items.<br>`)
        addText("text", `<button onclick="level1()">back</button>`)
    } else {
        hacker()
    }
}

function level1Attack() {
    deleteText("text")
    addText("text", `<h2>What weapon do you use?</h2><br>`)
    if (playerInventory.weapons.slot1 != "empty") {
        addText("text", `<button onclick="playerAttack('${playerInventory.weapons.slot1}')">${playerInventory.weapons.slot1}</button>`)
    }
    if (playerInventory.weapons.slot2 != "empty") {
        hacker()
    }
    if (playerInventory.weapons.slot3 != "empty") {
        hacker()
    }
    if (playerInventory.weapons.slot4 != "empty") {
        hacker()
    }
    if (playerInventory.weapons.slot5 != "empty") {
        hacker()
    }

    addText("text", `<button onclick="playerAttack('punch')">punch</button>`)
    addText("text", `<button onclick="playerAttack('kick')">kick</button>`)
}

function level1End() {
    addText("text", `You have successfully finished the first level. You are so close to the end (not really).<br><br>Enjoy :)<br><br>`)
    addText("text", `<button onclick="level2(true)">Next Level</button>`)
}







function introduction() {
    if (localStorage.player != "true") {
        let randweapon = randchoice(Object.keys(weapons.tier1))
        let randweaponName = eval(`weapons.tier1.${randweapon}.name`)
        deleteText("text")
        addText("text", `You see a <b>${randweaponName}</b> on a table in front of you.<br>`)
        addText("text", `Do you want to pick it up?<br><br>`)
        addText("text", `<button id="introWeaponPickUp" onclick="introWeaponPickUp('${randweapon}', 'introWeaponPickUp')">Yes</button><button id="introWeaponPickUp" onclick="introduction2()">No</button>`)

    } else {
        deleteText("text")
        addText("text", `YOU ARE BANNED. STOP TRYING TO HACK THIS GAME.`)
    }
}

function introduction2(weapon=false) {
    deleteText("text")
    if (weapon) {
        if (weapon == "sharpRock") {
            addText("text", `You pick up the sharp rock.`)
        } else if (weapon == "treeBranch") {
            addText("text", `You pick up the tree branch.`)
        } else {
            addText("text", `You pick up the ${weapon}.`)
        }
        addText("text", "<br><br>")
    } else {
        addText("text", `You stupidly choose not to take the weapon. Classic ${player.name}.<br><br>`)
    }
    addText("text", `You enter the first room (level 1)<br>`)
    
    level1(true)    
}



// Level functions

function level1(firstTime=false) {
    if (firstTime == true) {
        currentLevel = 1
        let tempEnemy1 = {...enemies[0].default[0]}
        let tempEnemy2 = {...enemies[0].default[0]}
        let tempEnemy3 = {...enemies[0].default[0]}
        currentEnemies = [tempEnemy1, tempEnemy2, tempEnemy3]
        addText("text", `You see three bodyguards loyal to Tom the Terrorist.<br><br>`)
    } else {
        deleteText("text")
    }

    // if (checkEnemies) // WHAT WAS I DOING HERE? CANNOT REMEMBER - LOOK AT LATER

    addText("text", "<h2><b>What do you do?</b></h2><br>")
    addText("text", `<button onclick='level1Talk()'>Talk</button>  `) // Talk button
    addText("text", `<button onclick='level1Use()'>Use Item</button>  `)  // Use item button
    addText("text", `<button onclick='level1Attack()'>Attack</button>`) // Attack button
}



function level2(firstTime=false) {
    console.log("Level 2")
    if (firstTime == true) {
        currentLevel = 2
        let tempEnemy1 = {...enemies[0].religious[0]}
        let tempEnemy2 = {...enemies[0].religious[1]}
        let tempEnemy3 = {...enemies[0].religious[2]}
        currentEnemies = [tempEnemy1, tempEnemy2, tempEnemy3]
        deleteText("text")
        addText("text", `You see a priest, cultist and bishop from the Tomism Church™<br><br>`)
    }

    addText("text", "<h2><b>What do you do?</b></h2><br>")
    addText("text", `<button onclick='level1Talk()'>Talk</button>  `) // Talk button
    addText("text", `<button onclick='level1Use()'>Use Item</button>  `)  // Use item button
    addText("text", `<button onclick='level1Attack()'>Attack</button>`) // Attack button


}















































