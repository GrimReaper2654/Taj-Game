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

rapidfire works like this:
first number is % chance of attacking again if pervious attack hits enemy
second number is the maximum number of attacks in 1 turn

inventory system:
Limit of (strength/strengthLimit)*30+2 inventory slots, if inventory is too full items are ejected from the inventory


Developing:
Somebody format the intro a bit better and make it sound better. Also somebody write a backstory.
- Tom

*/

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
var player_name = 'Tom the Terrorist';
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
                    '[attacker]\' kick is blocked by [naturalHazard]!',
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
                    '[attacker] piered [defender]\' heart with a twig!', 
                    '[attacker] stabbed [defender]\' eyes with a twig!', 
                    '[defender] collapses after being whacked by a twig!', 
                    '[defender] flees after taking [strong] attack from [attacker]!',
                ],
                'single': [
                    '[attacker] whacked [defender]\' [body] with a twig!', 
                    '[attacker] stabbed [defender]\' [body] with a twig!', 
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
                    '[attacker] piered [defender]\' heart with a stick!', 
                    '[attacker] stabbed [defender]\' eyes with a stick!', 
                    '[defender] collapses after being whacked by a stick!', 
                    '[defender] flees after taking [strong] attack from [attacker]!',
                ],
                'single': [
                    '[attacker] whacked [defender]\' [body] with a stick!', 
                    '[attacker] stabbed [defender]\' [body] with a stick!', 
                    '[attacker] whipped [defender]\' [body] with a stick!', 
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
            name: 'treeBranch',
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
                    '[attacker] whacked [defender]\' [body] with a tree branch!', 
                    '[attacker] stabbed [defender]\' [body] with a tree branch!', 
                    '[attacker] whipped [defender]\' [body] with a tree branch!', 
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
                    '[attacker] bashed [defender]\' [body] with a log!', 
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
            name: 'sharpRock',
            player_useable: true,
            damage: [75,90],
            baseAccuracy: 80,
            type: physical,
            multiplier: str,
            rapidfire: [40,4],
            attack_description: {
                'KO': [
                    '[attacker] pierces [defender]\'s heart with a sharp rock!', 
                    '[defender] flees after being stabbled by [attacker]\'s sharp rock!',
                ],
                'single': [
                    '[attacker] slashed [defender]\' [body] with a sharp rock!', 
                    '[attacker] stabbed [defender]\' [body] with a sharp rock!', 
                ],
                'multi': [
                    '[attacker] landed [description] series of hits on [defender]!',
                    '[attacker] rapidly cuts [defender] with a sharp rock!',
                    '[attacker] rapidly slashes at [defender] with a sharp rock!',
                ],
                'miss': [
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

var player = {
    playerName: player_name,
    health: 50,
    hunger: 100,
    mental_health: 25,
    intellignece: 100,
    strength: 10,
    isTerrorist: false,

    inventory: {
        weapons: {
            hands: weapons.body.punch,
            feet: weapons.body.kick,
            main1: weapons.body.none,
            main2: weapons.body.none,
            secondary: weapons.body.none
        },
        items: [
            // Limit of (strength/strengthLimit)*40 inventory slots, if inventory is too full items are ejected from the inventory
            /* Format items like this:
            {
                name: 'Maceline™ Ice Tea',
                type: 'consumables',
                healthRegen: [20, 50],
                hungerRegen: [100, 250],
                mentalRegen: [300, 500],
                quickConsume: false,
                quantity: 1,
                stackSize: 10
            },
            */
            {
                name: 'Maceline™ Painkillers',
                type: 'consumable',
                healthRegen: [0, 0],
                hungerRegen: [0, 0],
                mentalRegen: [500, 500],
                quickConsume: true,
                quantity: 3,
                stackSize: 10
            },
            {
                name: '9mm bullets',
                type: 'ammunition',
                quantity: 10,
                stackSize: 10
            },
            {
                name: '.50cal bullets',
                type: 'ammunition',
                quantity: 3,
                stackSize: 3
            },
            {
                name: 'frag grenade',
                type: 'throwable',
                healthRegen: [0, 0],
                hungerRegen: [0, 0],
                mentalRegen: [0, 0],
                damage: [700, 1200],
                quickConsume: false,
                damageType: physical,
                quantity: 1,
                stackSize: 1
            },
            {
                name: 'small rock',
                type: 'throwable',
                healthRegen: [0, 0],
                hungerRegen: [0, 0],
                mentalRegen: [0, 0],
                damage: [50, 100],
                quickConsume: true,
                damageType: physical,
                quantity: 3,
                stackSize: 5
            },
            {
                name: 'medium rock',
                type: 'throwable',
                healthRegen: [0, 0],
                hungerRegen: [0, 0],
                mentalRegen: [0, 0],
                damage: [75, 150],
                quickConsume: false,
                damageType: physical,
                quantity: 1,
                stackSize: 3
            },
            {
                name: 'big rock',
                type: 'throwable',
                healthRegen: [0, 0],
                hungerRegen: [0, 0],
                mentalRegen: [0, 0],
                damage: [150, 300],
                quickConsume: false,
                damageType: physical,
                quantity: 1,
                stackSize: 1
            },
        ]
    }

}
const string = player_name;
const substring = 'Terrorist';
const index = string.indexOf(substring);
if (string.indexOf(substring) !== -1) {
  player.isTerrorist=true;
}

if (player_name == 'Taj') {
    player.health = settings.stat_limit
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

const admin =window.localStorage.getItem('admin')
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

function showText(text) {
    document.getElementById("text").innerHTML = text;
}
function addText(text) {
    document.getElementById("text").innerHTML = document.getElementById("text").innerHTML + text;
}

function give(player, item) {
    if (player.inventory.items.length < (player.strength/stat_limit)*30+2) { // player can hold more items
        let newPlayer = player;
        newPlayer.inventory.items.append(item);
        const pickup = ['You pick up [quantity] [item].'];
        let textToDisplay = randchoice(pickup);
        // TODO: replace placeholders with info
        showText(textToDisplay);
        return newPlayer;
    }
}

function playerTurn(player, enemies) { // TODO: make player do stuff
    // Show player controlls

    return player, enemies;
}

function enemyTurn(player, enemies) {
    for (enemy in enemies) {
        let enemyMove = randchoice(attacks);
    }
    return player, enemies;
}

function checkAlive(player, enemy) {
    return player, enemies;
}

function fight(player, enemy) {
    /*
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
    */

    // Create list with enemies to fight
    let enemies = [];
    for (let i = 0; i < randint(enemy.quantity[0],enemy.quantity[1]); i++) {
        enemies.append(enemy);
    }

    playerTurn(player, enemies);
    checkAlive(player, enemy);
    enemyTurn(player, enemies);
    checkAlive(player, enemy);


}

function intro() {
    showText(`You painfully open your bruised eyes as pain shoots through your nerves like lightning. Silence envelops you as you stare into the endless dark void around you. Your battered body collapses beneath you as a dull throbbing pain fills your mind. Decades old memories resurface, blurry images flash through your mind, too breif and unclear for you to understand. However, one memory stands out from all the others. You bearly manage to recall a towering figure excluding an aura of power. The rest of their appearance evades you but his name is engraved into your mind in jagged red letters. "Henry Bird" You do not recall why, but the thought of him fills you with determination and bloodlust. There is only one thing you desire: REVENGE!<br>`);
    //pause
    if (player.isTerrorist) {
       addText(`In reality, ${player_name} is a wanted terrorist, responsible for thousands of deaths. You are in prison for murder. Lmao imagine. Ur trash! L+Bozo <br>`);
    }
    
    /*
    Intro text */
    
    
}

function level1() { // First level (get some starting items and escape the starting room, you alos get some backstory)
    const searchFails = [
        `Your grope around on the darknes but you can only feel the course stone floor and the occasional patch of moss rubbing against the palms of your hands.`,
        `You slowly crawl across the cold stone floor, searching for anything that could help you. However, your efforts were proven to be futile as you did not locate anything of use.`,
        `You crawn through the room and bump your head on a wall. You give up searching for now and lie down on the ground to recover.`,
        `You explore the room until you are exhausted but your search yields no results.`
    ];
    const nextLevel = [
        'You find entrance to next room', // somebody reword this and add more options!!!!!!
    ];
    const talk = [
        `"Hello!" you shout into the darkness, "Is there anybody there?" However, there is no response.`, // somebody add more!!!!!!!!!!!
    ];
    let possibleActions = {
        'search the room': 'find stuff',
        'check your posessions': 'show inventory',
        'think': 'get backstory part',
        'look for an exit': 'next level',
        'talk': 'talk'
    };
    let backstoryFragments = [ // somebody make up backstory
        'backstory 1',
        'backstory 2',
        'backstory 3',
    ];
    while (1) {
        switch (choice(`As the pain in your limbs slowly fades into the background, you contemplate your choices. What do you do, ${player_name}?`, possibleActions)) {
            case 'find stuff':
                if (randint(0, 5)) { // 80% chance to get stuff
                    if (randint(0, 1)) { // 50% change to get items 50% change to get weapons
                        // give the player a random tier 1 weapon
                    } else {
                        // give the player some items
                    }
                } else {
                    showText(randchoice(searchFails));
                }
                break;
            case 'show inventory':
                showInventory();
                break;
            case 'get backstory part':
                let backstory = '';
                backstory, backstoryFragments = randchoice(backstoryFragments, true);
                showText(backstory);
                break;
            case 'next level':
                showText(randchoice(nextLevel));
                return 0;
            case 'talk':
                showText(randchoice(talk));
                break;
            default:
                return 1;
        }
    }
}

function level2() {

}

function level5() {

}

function bossBattle() {

}

function game() {
    intro();
    // Level 1 (Leave the starting room)
    level1();
    // Level 2 (Battle the Henry soldiers)
    level2();
    // Level 3 (Defeat the spedlord Henry)
    bossBattle(spedlordHenry);
    // Level 4 (Defeat the Henry Bird)
    bossBattle(henryBird);
    // Level 5 (escape and win the game)
    level5();
    outro();
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

