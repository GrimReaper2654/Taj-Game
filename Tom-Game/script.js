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
const naturalHazard = ["stick", "crack", "Tom", "body", "blood", "magical forces", ""]



// Variables

var player = {
    name: "General Widjaja",
    health: 100,
    
}

var settings = {
    stat_limit: 1000,
    enable_shield: true,
    enable_hunger: true,
    rapid_regeneration: false,
    weapon_durability: false,
    secondary_ammo: true,
    taunting: true,
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



const enemies = [
    // Python:
    // ['Name [0]', 'Health [1]', 'Damage Multiplier [2]', ['Attacks [3]'], ['Quotes [4]'], 'Last Words [5]', 'Quantity [6]',
    // 'Can Die [7]', 'evasion [8]', ['Block description [9]'], [['physical armour [10][0][0]', 'durability [10][0][1]'],
    // ['heat armour [10][1][0]', 'durability [10][1][1]'], ['mental armour [10][2][0]', 'durability [10][2][1]']]],

    // JS Example
    /*
    {name: "Tom",
    health: 100,
    damage_multiplier: 1.5,
    attacks: [1,2,5],
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
            attacks: [],
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
            attacks: [],
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
            name: "Birdism Priest",
            health: 50,
            damage_multiplier: 1,
            attacks: [],
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
            name: "Birdism Cultist",
            health: 50,
            damage_multiplier: 0.5,
            attacks: [],
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
            name: "Birdism Bishop",
            health: 200,
            damage_multiplier: 1,
            attacks: [],
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
            attacks: [],
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
            attacks: [],
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
            attacks: [],
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
            attacks: [],
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
            attacks: [],
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
            attacks: [],
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
            attacks: [],
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
            attacks: [],
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
            name: "Spedlord Tom", // Tom is strong
            health: 50000,
            damage_multiplier: 1,
            attacks: [],
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
            damage: 50,
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
            damage: [100,300],
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
    }

}

var currentLevel = 0

var currentEnemies = []



const intro = `You wake up in a dark room. All you can remember is your name: ${player.name}.<br><br>`


// Functions

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
    showText("text", `You died.`)
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

function reload() {
    location.reload()
}


// Introduction related functions
function WeaponPickUp(weapon) {
    for (const i in playerInventory.weapons) {
        if (eval(`playerInventory.weapons.${i}`) == "empty") {
            introduction2(weapon)
            break
        }
    }
}

// Level 1 related functions
function level1Talk() {
    
}








function introduction() {
    let randweapon = randchoice(Object.keys(weapons.tier1))
    let randweaponName = eval(`weapons.tier1.${randweapon}.name`)
    addText("text", `You see a <b>${randweaponName}</b> on a table in front of you.<br>`)
    addText("text", `Do you want to pick it up?<br><br>`)

    addText("text", `<button id="introWeaponPickUp" onclick="WeaponPickUp('${randweapon}', 'introWeaponPickUp')">Yes</button><button id="introWeaponPickUp" onclick="introduction2()">No</button>`)
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
        addText("text", "You stupidly choose not to take the weapon. Classic Tom.<br><br>")
    }
    addText("text", `You enter the first room (level 1)<br>`)
    
    level1()    
}





function level1() {
    currentEnemies = [enemies[0].default[0], enemies[0].default[0], enemies[0].default[0]]
    addText("text", `You see three bodyguards loyal to Tom the Terrorist.<br><br>`)
    addText("text", "<h2><b>What do you do?</b></h2>")
}















































