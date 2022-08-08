
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
const player_name = 'Taj';
const settings = {
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
    quotes: ["Hi", "TOMAHAWK"],
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
const player_weapons = {
    fist: {
        damage: 10,
        type: physical,
        multiplier: str,
        

    },
};

function init() {
    hideInventory()
    hideOptions()
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







document.onload = init()
























testing()

function testing() {
    console.log("Hello")
}








document.cookie = "username=Tom";
document.cookie = "password=Terrorist";