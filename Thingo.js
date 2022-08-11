/*
Run window.localStorage.Name = "Tom" in web console for personal testing.
This is testing that will only run on your device.
Put any testing in the tomTesting() function

Info:
hit_chance = weapon_accuracy * player_intelligence/(statlimit/2) * enemy_evasion * randint(0.5,1.5)
enemy evasion lower means more likely to dodge

armour durability means how much damage an armour can take before breaking (damage of attack not damage blocked)
armour resistance means how much damage can be blocked on EACH attack, NOT each round
durability 0 means no armour, NOT infinite durability

Developing:
Somebody format the intro a bit better and make it sound better. Also somebody write a backstory.
- Tom

*/


// Damage Type
const physical = 'physical';
const fire = 'fire';
const energy = 'energy';
const magical = 'magical';
const poison = 'poison';
const mental = 'mental';
// Stats
const str = 'strength';
const intel = 'intelligence';

// Constants
var player_name = 'Widjaja';
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
    max_levels: 50,
    
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
const weapons = {
    none: {
        name: 'none',

        player_useable: false,
        damage: 0,
        type: physical,
        multiplier: str,
        
    },
    fist: {
        name: 'fist',
        player_useable: true,
        damage: 10,
        type: physical,
        multiplier: str,
    
    },
};

var player = {
    health: (settings.stat_limit/5),
    hunger: settings.stat_limit,
    mental_health: settings.stat_limit,
    intellignece: settings.stat_limit/2,
    strength: settings.stat_limit/2,










    inventory: {
        weapons: {
            slot1: "None",
            slot2: "None",
            slot3: "None"
        },
        items: {
            medicine: 10,
            food: 30,
            water: 50
        }
    }

}

var level = 0







if (player_name == 'Taj') {
    player.health = settings.stat_limit
}

if (player_name == 'Taj') {
    player.intelligence = settings.stat_limit/5;
}
    


//Functions
function init() {
    hideInventory()
    hideOptions()
    hideAttackOptions()
    hideWeapons()
    hideItems()


    return "Done"
}

const admin = window.localStorage.getItem('admin')
if (admin !== "true") {
    window.localStorage.setItem("playerName", "Taj")
    player_name = window.localStorage.getItem('playerName')
} else {
    player_name = window.localStorage.getItem('playerName')
}

function start() {
    document.getElementById("start").style.display = "none"
    game()
}

function hideText() {
    document.getElementById("text").innerHTML = ""
}


function hideInventory() {
    document.getElementById("inventory").style.display = "none"
    return "Done"
}

function showInventory() {
    document.getElementById("inventory").style.display = "block"
    return "Done"
}

function hideOptions() {
    document.getElementById("options").style.display = "none";
    return "Done"
}

function showOptions() {
    document.getElementById("options").style.display = "block";
    return "Done"
}

function hideAttackOptions() {
    document.getElementById("attackOptions").style.display = "none";
    return "Done"
}

function showAttackOptions() {
    document.getElementById("attackOptions").style.display = "block";
    return "Done"
}

function hideWeapons() {
    document.getElementById("weapons").style.display = "none";
    return "Done"
}

function showWeapons() {
    document.getElementById("weapons").style.display = "block";
    document.getElementById("weaponSlot1").innerHTML = player.inventory.weapons.slot1;
    document.getElementById("weaponSlot2").innerHTML = player.inventory.weapons.slot2;
    document.getElementById("weaponSlot3").innerHTML = player.inventory.weapons.slot3;
    return "Done"
}

function hideItems() {
    document.getElementById("items").style.display = "none";
    return "Done"
}

function showItems() {
    document.getElementById("items").style.display = "block";
    return "Done"
}


function pickupWeapon(weapon, slot) {
    if (slot == "slot1") {
        player.inventory.weapons.slot1 = weapon
    } else if (slot == "slot2") {
        player.inventory.weapons.slot2 = weapon
    } else if (slot == "slot3") {
        player.inventory.weapons.slot3 = weapon
    } else {
        console.log(`pickupWeapon() error. Weapon:, ${weapon}. Slot:, ${slot}`)
    }
}

function choice(description,choices) { // TODO: make inputs
    let numChoices = choices.length;
    // Display Description
    // Display choices on buttons
    // Detect when button is pressed
    return buttonPressed;
}


function intro() {
   
    document.getElementById("text").innerHTML = `You painfully open your bruised eyes. Pain shoots through your nerves like lightning as feel the rough stone ground with your bandaged hands. Slowly turning your head, you stare into the endless void around you. A dull throbbing pain fills your mind as you attempt to remember your past. Blurry images flash through your mind, too breif and unclear for you to understand. However, one memory stands out from all the others. You bearly manage to recall a towering figure excluding an aura of power. The rest of their appearance evades your tired mind but his name is engraved into your mind. "Henry Bird" You do not recall why, but the thought of him fills you with determination and bloodlust. There is only one thing you desire: REVENGE!<br>`;
    //pause
    if (player.isTerrorist) {
        document.getElementById("text").innerHTML = document.getElementById("text").innerHTML + `${player_name} is a wanted terrorist, responsible for thousands of deaths.<br>`;
    }
    
    /*
    Intro text */
    
    
}

function level1() {
    let possibleActions = {
        'search the room': 'find stuff',
        'check your posessions': 'show inventory',
        'think': 'get backstory part',
        'look for an exit': 'next level',
        'cry yourself to sleep': 'sleep'
        }
    while (1) {
        choice('',possibleActions)
    }
}

function playerTurn() {
    // Show player controlls
    return 0;
}

function enemyTurn(enemies) {
    for (enemy in enemies) {

    }
    return 0;
}

function game() {
    intro()
    // Level 1 (Leave the starting room)
    

    
}


function testing() {
    
}


function tajTesting() {

}

function tomTesting() {

}


// Read the info at the top of the document
if (window.localStorage.getItem("Name") == "Taj") {
    tajTesting()
} else if (window.localStorage.getItem("Name") == "Tom") {
    tomTesting()
}




init()

testing()
