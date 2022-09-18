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
    min_hunger_to_regen: 0.4,
    
};

var player = {
    playerName: 'spedry',
    name: 'spedry the terrorist',
    health: settings.stat_limit/4,  // Max 1000
    hunger: settings.stat_limit/2,
    mental_health: settings.stat_limit/6,
    intelligence: 250,
    strength: 1,
    isTerrorist: false,
    armour: {
        physical: {durability: 0, resistance: 0},
        fire: {durability: 0, resistance: 0},
        energy: {durability: 0, resistance: 0},
        magical: {durability: 0, resistance: 0},
        poison: {durability: 0, resistance: 0}
    },
    inventory: {
        /*
        weapons: {
            hands: weapons.body.punch,
            feet: weapons.body.kick,
            main1: weapons.body.none,
            main2: weapons.body.none,
            secondary: weapons.body.none
        },*/
        items: [
            // Limit of strength*5 inventory slots, if inventory is too full items are ejected from the inventory
        ],
        full: false
    }
};

function updatePlayer(player, healthChange=0, hungerChange=0, mentalChange=0, intelligenceChange=0, strengthChange = 0, regenerateion=false) {
    console.log('updating player');
    console.log(player);
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
        let regenCapacity = (hunger-settings.stat_limit*min_hunger_to_regen)/2;
        let missingHp = settings.stat_limit-player.health;
        let maxRegen = (settings.stat_limit-player.health)/settings.stat_limit*200;
        if (missingHp > maxRegen) {
            missingHp = maxRegen;
        }
        if (regenCapacity < missingHp) {
            missingHp = maxRegen;
        }
        player.health += missingHp;
        player.hunger -= missingHp*2;
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
    console.log(player);
    return player

};

updatePlayer(player)