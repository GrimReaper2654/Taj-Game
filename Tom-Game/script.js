/*
INFO

*/


// Variables
const player = {
    name: "Terrorist Tom",
    
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
    maxLevel: 50,
    
};

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
   {
    default: [
        {
            name: "Bodyguard",
            health: 300,
            damage_multiplier: 1.5,
            attacks: [],
            quotes: ["I shall defend Henry with my life!", "Death to the enemies of Henry!", "I shall protect Henry!", "You shall not Pass!"],
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
            quotes: ["I serve Henry!", 'for Henry!'],
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
            quotes: ["Hail Henry Bird!", "For Henry Bird!", "I shall protect the lord!"],
            last_words: ["You shall not defeat the Henry Bird"],
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
            quotes: ["Hail Henry Bird!"],
            last_words: ["You shall not defeat the Henry Bird"],
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
            quotes: ["Hail Henry Bird!", "For Henry Bird!", "I shall protect the lord!", "die nonbeliever!"],
            last_words: ["You shall not defeat the Henry Bird"],
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
            name: "Spedlord Henry", // Henry is strong
            health: 50000,
            damage_multiplier: 1,
            attacks: [],
            quotes: ["Henry superiority"],
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



var playerStats = {
    health: 100,
}

var playerInventory = {
    weapons: {
        slot1: "empty",
        slot2: "empty",
        slot3: "empty",
        slot4: "empty",
    }

}

var currentLevel = 0




const intro = `You wake up in a dark room. All you can remember is your name: ${player.name}.<br><br>`


// Functions

// Initialization of the game
function init() {
    console.log("Game Initalization Started.")
    hideText("start")
    unhideText("game")
    showText("text", intro)


    console.log("Game Initalization Finished.")
}







function showText(id, text) {
    document.getElementById(id).innerHTML = text;
}
function addText(id, text) {
    document.getElementById(id).innerHTML = document.getElementById("text").innerHTML + text;
}
function hideText(id) {
    document.getElementById(id).style.display = "none"
}
function unhideText(id) {
    document.getElementById(id).style.display = "block"
}

function showOptions() {

}

function playerDeath(enemy){ // Need to finish death message and add an option to restart the game
    showText(`You were killed by ${enemy}`)
}





// Game functions
function playerTurn() {

}

function enemyTurn() {

    
    game()
}





function game() {
    if (playerStats.health > 0) {
        playerTurn()
        enemyTurn()
    } else if (currentLevel > player.maxLevels) { // Need to finish and also improve victory message
        console.log("You have finished the game!")
    } else {
        playerDeath()
    }
}







// Main code




