/*
Run window.localStorage.Name = "Tom" in web console for personal testing.
This is testing that will only run on your device.
Put any testing in the tomTesting() function

Map
*/


// Damage Type
const fire = 'fire';
const energy = 'energy';
const magical = 'magical';
const poison = 'poison';
const mental = 'mental';
// Stats
const str = 'strength';
const intel = 'intelligence';

// Constants
var player_name = 'Taj';
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
    evasion_description: [''],
    armour: {physical: {durability: 100},
        fire: {durability: 100},
        energy: {durability: 100},
        magical: {durability: 100}}
    }
    */
    {name: "Bodyguard",
    health: 300,
    damage_multiplier: 1.5,
    attacks: [1,2,5],
    quotes: ["I will defend henry with my life!", "Death to the enemies of henry!", "I shall protect henry!"],
    last_words: false,
    quantity: 3,
    can_die: true,
    evasion_chance: 0,
    evasion_description: ['The attack is blocked by his baseball bat', 'The attack fails to penetrate his armour'],
    armour: {physical: {durability: 100, resistance: 10},
        fire: {durability: 100, resistance: 10},
        energy: {durability: 100, resistance: 10},
        magical: {durability: 100}, resistance: 10}
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
    intellignece: 1,
    strength: 1,










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


if (player_name == 'Taj') {
    player.health = settings.stat_limit
}

if (player_name == 'Taj') {
    player.intelligence = settings.stat_limit/5;
}
    


//Functions
function init() {
    hideText()
    hideInventory()
    hideOptions()
    hideAttackOptions()
    hideWeapons()
    hideItems()


    return "Done"
}

const admin = window.localStorage.getItem('admin')
if (admin !== "true") {
    window.localStorage.setItem("playerName", "Tom")
    player_name = window.localStorage.getItem('playerName')
} else {
    player_name = window.localStorage.getItem('playerName')
}

function start() {
    document.getElementById("start").style.display = "none"
    game()
}

function hideText() {
    document.getElementById("text").style.display = "none"
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
        console.log("pickupWeapon() error. Weapon:", weapon, "Slot:", slot)
    }
}


function intro() {
    document.getElementById("text").innerHTML = `${player_name} wakes up in a dark room.<br>`
    document.getElementById("text").innerHTML = document.getElementById("text").innerHTML + `${player_name} is a wanted terrorist, responsible for thousands of deaths.<br>`
    /*
    Intro text
    An endless wall of white marble towers above you, radiating an aura of power. [more description] You stare hatefully at the residence of Henry Bird.
    */
    
}


function playerTurn() {
    return 0;
}

function enemyTurn() {
    return 0;
}

function game() {
    intro()
    while (0) {
        playerTurn();
        enemyTurn();
    };
    return 0;
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
