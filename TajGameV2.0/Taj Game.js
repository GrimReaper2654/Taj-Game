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

function randomWeapon (obj) {
    var keys = Object.keys(obj);
    return obj[keys[ keys.length * Math.random() << 0]];
};

// Damage Type
const physical = 'physical';
const fire = 'fire';
const energy = 'energy';
const magical = 'magical';
const poison = 'poison';
const mental = 'mental';     // damages mental health
const piercing = 'piercing'; // Extra damage to armour
const single = 'single';
const splash = 'splash';
// Stats
const str = 'strength';
const intel = 'intelligence';

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
        stumble: {
            name: 'stumble',
            player_useable: true,
            damage: [0,0],
            baseAccuracy: 0,
            type: physical,
            multiplier: str,
            rapidfire: [0,0],
            attack_description: {
                KO: [
                    '[attacker] tripped over, falling onto [defender] and crushed him!',
                ],
                single: [
                    '[attacker] tripped over, falling face first into the ground!',
                    '[attacker] tripped on a [naturalHazard]!',
                ],
                miss: [
                    '[attacker] tripped over, falling face first into the ground!',
                    '[attacker] tripped on a [naturalHazard]!',
                    '[defender] laughed as [attacker] pathetically tripped on a [naturalHazard]!',
                    '[defender] laughed as [attacker] pathetically flailed his arms, trying to attack him!',
                ]
            }
        },
        punch: {
            name: 'punch',
            player_useable: true,
            damage: [10,18],
            baseAccuracy: 95,
            type: physical,
            multiplier: str,
            rapidfire: [80,5],
            attack_description: {
                KO: [
                    '[attacker] sent [defender] flying with [strong] blow!', 
                    '[defender] collapses after taking [strong] punch from [attacker]!', 
                    '[defender] flees after taking [strong] hit from [attacker]!',
                    '[attacker] kills [defender] with [strong] punch!',
                ],
                single: [
                    '[attacker] landed [description] punch on [defender]!', 
                    '[attacker] punched [defender] in the [body]!',
                    '[attacker] karate chops [defender]!',
                    '[attacker] slaps [defender] in the face!'
                ],
                multi: [
                    '[attacker] landed [description] series of punches on [defender]!',
                    '[attacker] unleashes a powerful martial arts technique on [defender]!',
                ],
                miss: [
                    '[attacker]\'s punch misses [defender]!',
                    '[attacker] trips on [naturalHazard] and misses!',
                    '[attacker] swings wildly at [defender] and misses!',
                    '[defender] dodges to the side, avoiding [attacker]\'s punch with ease!',
                ]
            }
        },
        kick: {
            name: 'kick',
            player_useable: true,
            damage: [30,50],
            baseAccuracy: 75,
            type: physical,
            multiplier: str,
            rapidfire: [60,4],
            attack_description: {
                KO: [
                    '[attacker] sent [defender] flying with [strong] kick!', 
                    '[defender] collapses after taking [strong] roundhouse kick from [attacker]!', 
                    '[defender] flees after taking [strong] kick from [attacker]!',
                    '[attacker] kills [defender] with [strong] kick!',
                ],
                single: [
                    '[attacker] landed [description] kick on [defender]!', 
                    '[attacker] kicks [defender] in the [body]!',
                ],
                multi: [
                    '[attacker] landed [description] series of kicks on [defender]!',
                    '[attacker] unleashes a powerful martial arts technique on [defender]!',
                ],
                miss: [
                    '[attacker]\'s kick misses [defender]!',
                    '[attacker] trips on [naturalHazard] and misses!',
                    '[attacker]\'s kick is blocked by [naturalHazard]!',
                    '[attacker] kicks at [defender] and loses ballence, missing [defender] by a wide margin!',
                    '[defender] dodges to the side, avoiding [attacker]\'s kick with ease!',
                ]
            }
        },
        headbut: {
            name: 'headbut',
            player_useable: false,
            damage: [15,30],
            baseAccuracy: 50,
            type: physical,
            multiplier: str,
            rapidfire: [0,0],
            attack_description: {
                KO: [
                    '[defender] collapses after taking [strong] headbut from [attacker]!', 
                ],
                single: [
                    '[attacker] landed [description] headbut on [defender]!', 
                    '[attacker] headbutted [defender]!',
                ],
                miss: [
                    '[attacker]\'s headbut misses [defender]!',
                    '[attacker] trips on [naturalHazard] and misses!',
                    '[attacker] charges straight past [defender]!',
                    '[defender] dodges to the side, avoiding [attacker]\'s headbut with ease!',
                ]
            }
        },
        bodyslam: {
            name: 'bodyslam',
            player_useable: false,
            damage: [30,50],
            baseAccuracy: 75,
            type: physical,
            multiplier: str,
            rapidfire: [0,0],
            attack_description: {
                KO: [
                    '[defender] is flattened by [attacker]\'s bodyslam!', 
                    '[defender] faints after being bodyslamed by [attacker]\'s!', 
                ],
                single: [
                    '[attacker] landed [description] bodyslam on [defender]!', 
                    '[attacker] rams into [defender]!',
                ],
                miss: [
                    '[attacker]\'s bodyslam misses [defender]!',
                    '[attacker] trips on [naturalHazard] and misses!',
                    '[attacker] charges straight past [defender]!',
                    '[defender] dodges to the side, avoiding [attacker]\'s bodyslam with ease!',
                ]
            }
        },
    },
    enemy: {
        baseballBat: {
            name: 'baseball bat',
            player_useable: false,
            damage: [30,50],
            baseAccuracy: 60,
            type: physical,
            multiplier: str,
            rapidfire: [0,0],
            attack_description: {
                KO: [
                    '[attacker] knocks [defender] unconscious with a baseball bat!', 
                ],
                single: [
                    '[attacker] hit [defender]\'s [body] with a baseball bat!', 
                    '[attacker] swung a baseball bat into [defender]\'s [body]!', 
                ],
                miss: [
                    '[attacker] trips on [naturalHazard] and misses!',
                    '[attacker] swings his baseball bat wildly at [defender] and misses!',
                    '[defender] dodges to the side, avoiding [attacker]\'s baseball bat with difficulty!',
                ]
            }
        },
        magicBeam: {
            name: 'magic beam',
            player_useable: false,
            damage: [10,100],
            baseAccuracy: 90,
            type: magical,
            multiplier: intel,
            rapidfire: [0,0],
            attack_description: {
                KO: [
                    '[attacker] desintigrates [defender] with a blast of magic!', 
                    '[attacker] deatomises [defender] with a ball of destructive magic!', 
                ],
                single: [
                    '[attacker] fires a beam of magic at [defender]\'s [body]!', 
                    '[attacker] hits [defender]\'s [body] with a ball of destructuve magic!', 
                    '[attacker] fires magical beams at [defender]!', 
                ],
                miss: [
                    '[attacker]\'s magical beam hits a [naturalHazard] and is deflected!',
                    '[attacker]\'s concentration is broken by a [naturalHazard] falling onto his head!',
                    '[defender] dodges to the side, avoiding [attacker]\'s blast of magic with difficulty!',
                ]
            }
        },
        flamesOfTerrorism: {
            name: 'flames of terrorism',
            player_useable: false,
            damage: [75,150],
            baseAccuracy: 95,
            type: fire,
            multiplier: intel,
            rapidfire: [0,0],
            attack_description: {
                KO: [
                    '[attacker] incinerates [defender] with Taj\'s holy flames of terrorism!', 
                    '[defender] is burnt to a crisp by [attacker]\'s holy flames of terrorism!', 
                ],
                single: [
                    '[attacker] shoots a fireball at [defender]\'s [body]!', 
                    '[attacker] invokes Taj\'s flames of terrorism to attack [defender]!', 
                ],
                miss: [
                    '[attacker] trips on [naturalHazard] and misses!',
                    '[attacker] swings his sword into a [naturalHazard] and misses!',
                    '[defender] dodges to the side, avoiding [attacker]\'s fire attack with great difficulty!',
                ]
            }
        },
        swordOfTerrorism: {
            name: 'sword of terrorism',
            player_useable: false,
            damage: [50,100],
            baseAccuracy: 75,
            type: magical,
            multiplier: intel,
            rapidfire: [0,0],
            attack_description: {
                KO: [
                    '[attacker] decapitates [defender] with Taj\'s sword of terrorism!', 
                    '[defender] is desintigrated by [attacker]\'s sword of terrorism!', 
                ],
                single: [
                    '[attacker] slashes at [defender]\'s [body] with Taj\'s sword of terrorism!', 
                    '[attacker] stabbes at [defender]\'s [body] with Taj\'s sword of terrorism!', 
                ],
                miss: [
                    '[attacker] trips on [naturalHazard] and misses!',
                    '[attacker] swings his sword of terrorism into a [naturalHazard] and misses!',
                    '[defender] dodges to the side, avoiding [attacker]\'s swing with great difficulty!',
                ]
            }
        },
        chant: {
            name: 'cultist chant',
            player_useable: false,
            damage: [30,100],
            baseAccuracy: 75,
            type: mental,
            multiplier: intel,
            rapidfire: [0,0],
            attack_description: {
                KO: [
                    '[attacker] corrupts [defender]\'s mind with Taj\'s terrorist ideology!', 
                    '[defender] falls into despair after hearing [attacker]\'s cultist chant!', 
                ],
                single: [
                    '[attacker] does a creepy ritual that scares [defender]!', 
                    '[attacker] scares [defender] with a cultist chant!', 
                    '[attacker] scares [defender] with a cultist dance!', 
                ],
                miss: [
                    '[attacker] trips on [naturalHazard] and makes a fool of himself!',
                ]
            }
        },
        insult: {
            name: 'insult',
            player_useable: false,
            damage: [50,150],
            baseAccuracy: 100,
            type: mental,
            multiplier: intel,
            rapidfire: [0,0],
            attack_description: {
                KO: [
                    '[defender] falls onto the ground crying after hearing [attacker]\'s harsh insults!', 
                ],
                single: [
                    '[attacker] trashtalks [defender]!', 
                    '[attacker] uses some savage insults on [defender]!', 
                ],
                miss: [
                    '[defender] ignores [attacker]\'s verbal attack!',
                ]
            }
        },
        voodooMagic: {
            name: 'voodoo magic',
            player_useable: false,
            damage: [-50,50],
            baseAccuracy: 75,
            type: magical,
            multiplier: intel,
            rapidfire: [0,0],
            attack_description: {
                KO: [
                    '[defender] is killed by [attacker]\'s voodoo magic!', 
                ],
                single: [
                    '[attacker] throws a random potion at [defender]!', 
                    '[attacker] fires a random spell at [defender]!', 
                ],
                miss: [
                    '[defender] watches as [attacker]\'s spell flies harmlessly past him!',
                    '[attacker]\'s voodoo magic backfires, doing no damage to [defender]!',
                ]
            }
        },
        curry: {
            name: 'curry wave',
            player_useable: false,
            damage: [50,250],
            baseAccuracy: 1000,
            type: fire,
            multiplier: intel,
            rapidfire: [0,0],
            attack_description: {
                KO: [
                    '[defender] is burned alive by [attacker]\'s wave of burning curry!', 
                ],
                single: [
                    '[attacker] launches a tsunami of burning curry at [defender]!', 
                    '[attacker] slams a wall of curry into [defender]!', 
                ],
                miss: [
                    '[attacker] loses focus due to a [naturalHazard] falling onto his head!',
                ]
            }
        },
        footwork: {
            name: 'footwork',
            player_useable: false,
            damage: [75,100],
            baseAccuracy: 1000,
            type: physical,
            multiplier: str,
            rapidfire: [0,0],
            attack_description: {
                KO: [
                    '[attacker] sent [defender] flying with a [strong] punch!', 
                ],
                single: [
                    '[attacker] outmanoeuvered [defender] using his superiour footwork and landed a [description] punch to [defender]\'s [body]!', 
                    '[attacker] outmanoeuvered [defender] using his superiour footwork and landed a [description] kick to [defender]\'s [body]!', 
                ],
                miss: [
                    '[attacker] trips on a [naturalHazard] and no amount of footwork could prevent his fall!',
                ]
            }
        },
        maths: {
            name: 'maths',
            player_useable: false,
            damage: [100,150],
            baseAccuracy: 1000,
            type: physical,
            multiplier: str,
            rapidfire: [0,0],
            attack_description: {
                KO: [
                    '[attacker] sent [defender] flying with an accurately aimed punch!', 
                ],
                single: [
                    '[attacker] calculated [defender]\'s vector in the 4th dimension of spacetime using his superiour intelect, alowing [attacker] to land a [strong] kick to [defender]\'s [body]!', 
                    '[attacker] utilised calculus and triganometry to predict [defender]\'s angular momentum, alowing him to land a [description] kick to [defender]\'s [body]!', 
                    '[attacker] calculated [defender]\'s vector in the 4th dimension of spacetime using his superiour intelect, alowing [attacker] to land a [strong] punch to [defender]\'s [body]!', 
                    '[attacker] utilised calculus and triganometry to predict [defender]\'s angular momentum, alowing him to land a [description] punch to [defender]\'s [body]!', 
                ],
                miss: [
                    '[attacker] made a basic mathamatical error in his calculations and miscalculated the velosity of his attack, causing [attacker] to miss!',
                ]
            }
        },
        trip: {
            name: 'trip',
            player_useable: false,
            damage: [150,250],
            baseAccuracy: 1000,
            type: physical,
            multiplier: str,
            rapidfire: [0,0],
            attack_description: {
                KO: [
                    '[attacker] tripped on a [naturalHazard], creating a massive shockwave that annihilated [defender]\'s internal organs!', 
                ],
                single: [ 
                    '[attacker] tripped on a [naturalHazard], creating a massive shockwave aimed at [defender]!', 
                    '[attacker] tripped on a [naturalHazard], causing an earthquake under [defender]\'s feet!', 
                ],
                miss: [
                    '[attacker] forgot what he was doing and did not attack!',
                ]
            }
        },
        stumble: {
            name: 'stumble',
            player_useable: false,
            damage: [100,150],
            baseAccuracy: 1000,
            type: physical,
            multiplier: str,
            rapidfire: [0,0],
            attack_description: {
                KO: [
                    '[attacker] stumbled on a [naturalHazard], creating a massive shockwave that annihilated [defender]\'s internal organs!', 
                ],
                single: [ 
                    '[attacker] stumbled on a [naturalHazard], creating a massive shockwave aimed at [defender]!', 
                    '[attacker] stumbled on a [naturalHazard], causing an earthquake under [defender]\'s feet!', 
                ],
                miss: [
                    '[attacker] forgot what he was doing and did not attack!',
                ]
            }
        },
        bullshit: {
            name: 'bullshit',
            player_useable: false,
            damage: [100,300],
            baseAccuracy: 50,
            type: physical,
            multiplier: str,
            rapidfire: [0,0],
            attack_description: {
                KO: [
                    '[attacker] bullshitted the system, instantly reducing [defender]\'s health to 0!', 
                ],
                single: [ 
                    '[attacker] bullshitted the system, causing [defender] to take damage!', 
                    '[attacker] blatently hacked the stystem to make [defender] take damage!', 
                ],
                miss: [
                    '[attacker] tried to bullshit the system but failed!',
                ]
            }
        },
        MQ28GhostBat: {
            name: 'MQ-28 Ghost Bat',
            player_useable: false,
            damage: [50,150],
            baseAccuracy: 100,
            type: physical,
            multiplier: str,
            rapidfire: [0,0],
            attack_description: {
                KO: [
                    '[attacker] bullshitted the system, summoning a MQ-28 Ghost Bat to obliterate [defender] with machinegun fire!', 
                ],
                single: [ 
                    '[attacker] bullshitted the system, summoning a MQ-28 Ghost Bat to attack [defender]!', 
                    '[attacker] cheated the system, summoning a MQ-28 Ghost Bat crash into [defender]!', 
                ],
                miss: [
                    '[attacker]\'s bullshit proved ineffective against the system\'s firewalls!',
                ]
            }
        },
        sneak100: {
            name: 'sneak 100',
            player_useable: false,
            damage: [50,150],
            baseAccuracy: 50,
            type: mental,
            multiplier: intel,
            rapidfire: [0,0],
            attack_description: {
                KO: [
                    '[defender] falls onto the ground dead after [attacker] stabs them in the back!', 
                ],
                single: [
                    '[attacker] sneaks behind [defender] and taps him on the back, confusng [defender]!', 
                    '[attacker] sneakily steals [defender] water bottle, making [defender] cry!', 
                ],
                miss: [
                    '[attacker] tries to sneak behind [defender] but is noticed!',
                    '[attacker] trips on a [naturalHazard] and faceplants into a dog turd!',
                ]
            }
        },
        AK47: {
            name: 'AK-47',
            player_useable: false,
            damage: [250,500],
            baseAccuracy: 50,
            type: physical,
            multiplier: intel,
            rapidfire: [0,0],
            attack_description: {
                KO: [
                    '[attacker] shoots [defender] dead with an AK-47!', 
                ],
                single: [
                    '[attacker] shot [defender] with his AK-47!', 
                ],
                miss: [
                    '[attacker] opened fire at [defender] but missed all his shots!',
                    '[attacker] tries to shoot [defender] but his gun is jamed!',
                ]
            }
        },
        nuke: {
            name: 'suicide bomb',
            player_useable: false,
            damage: [1500,2000],
            baseAccuracy: 1000,
            type: physical,
            multiplier: intel,
            rapidfire: [0,0],
            attack_description: {
                KO: [
                    '[attacker] suicide bombs [defender], killing them both in a massive explosion!', 
                ],
                single: [
                    '[attacker] suicide bombs [defender] but [defender] miraculously survives!', 
                ],
                miss: [
                    '[attacker] tries to suicide bomb [defender] but [defender] gets out of the blast radius in time!',
                ]
            }
        },
    },
    taj: {
        ultimateBlast: {
            name: 'ultimate blast',
            player_useable: false,
            damage: [1300,1300],
            baseAccuracy: 10000,
            type: physical,
            multiplier: str,
            rapidfire: [0,0],
            attack_description: {
                KO: [
                    '[attacker] obliterates [defender] with his ultimate energy blast!', 
                ],
                single: [
                    '[defender] manages to survive [attacker]\'s massive energy blast!', 
                ],
            }
        },
        tomahawk: {
            name: 'tomahawk cruise missile',
            player_useable: false,
            damage: [250,500],
            baseAccuracy: 10000,
            type: physical,
            multiplier: str,
            rapidfire: [0,0],
            attack_description: {
                KO: [
                    '[defender] is engulfed in a massive explosion!', 
                    '[defender] is annihilated by a Tomahawk cruise missile!', 
                ],
                single: [
                    '[defender] bearly manages to survive a Tomahawk cruise missile!', 
                    '[defender] tanks a Tomahawk cruise missile!', 
                ],
            }
        },
        strPunch: {
            name: 'punch',
            player_useable: false,
            damage: [1000000,1000000],
            baseAccuracy: 10000,
            type: physical,
            multiplier: str,
            rapidfire: [80,5],
            attack_description: {
                KO: [
                    '[attacker] sends a godly punch into [defender]\'s [body]!', 
                    '[attacker] sends a incredibly powerful punch into [defender]\'s [body]!', 
                ],
                single: [
                    '[attacker] sends a [strong] punch into [defender]\'s [body]!', 
                ],
            }
        },
        punch: {
            name: 'punch',
            player_useable: false,
            damage: [500,750],
            baseAccuracy: 10000,
            type: physical,
            multiplier: str,
            rapidfire: [80,5],
            attack_description: {
                KO: [
                    '[attacker] sends a godly punch into [defender]\'s [body]!', 
                    '[attacker] sends a incredibly powerful punch into [defender]\'s [body]!', 
                ],
                single: [
                    '[attacker] sends a [strong] punch into [defender]\'s [body]!', 
                ],
            }
        },
    },
    tier1: {
        twig: {
            name: 'twig',
            player_useable: true,
            damage: [15,30],
            baseAccuracy: 99,
            type: physical,
            multiplier: str,
            rapidfire: [95,15],
            attack_description: {
                KO: [
                    '[attacker] piered [defender]\'s heart with a twig!', 
                    '[attacker] stabbed [defender]\'s eyes with a twig!', 
                    '[defender] collapses after being whacked by a twig!', 
                    '[defender] flees after taking [strong] attack from [attacker]!',
                ],
                single: [
                    '[attacker] whacked [defender]\'s [body] with a twig!', 
                    '[attacker] stabbed [defender]\'s [body] with a twig!', 
                ],
                multi: [
                    '[attacker] landed [description] series of hits on [defender]!',
                    '[attacker] rapidly hits [defender] with a twig!',
                ],
                miss: [
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
            baseAccuracy: 95,
            type: physical,
            multiplier: str,
            rapidfire: [90,15],
            attack_description: {
                KO: [
                    '[attacker] piered [defender]\'s heart with a stick!', 
                    '[attacker] stabbed [defender]\'s eyes with a stick!', 
                    '[defender] collapses after being whacked by a stick!', 
                    '[defender] flees after taking [strong] attack from [attacker]!',
                ],
                single: [
                    '[attacker] whacked [defender]\'s [body] with a stick!', 
                    '[attacker] stabbed [defender]\'s [body] with a stick!', 
                    '[attacker] whipped [defender]\'s [body] with a stick!', 
                ],
                multi: [
                    '[attacker] landed [description] series of hits on [defender]!',
                    '[attacker] rapidly hits [defender] with a stick!',
                ],
                miss: [
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
            baseAccuracy: 90,
            type: physical,
            multiplier: str,
            rapidfire: [80,10],
            attack_description: {
                KO: [
                    '[attacker] crushes [defender] with a tree branch!', 
                    '[attacker] sends [defender] flying with [strong] hit!', 
                    '[defender] collapses after being whacked by a tree branch!', 
                    '[defender] flees after taking [strong] attack from [attacker]!',
                ],
                single: [
                    '[attacker] whacked [defender]\'s [body] with a tree branch!', 
                    '[attacker] stabbed [defender]\'s [body] with a tree branch!', 
                    '[attacker] whipped [defender]\'s [body] with a tree branch!', 
                ],
                multi: [
                    '[attacker] landed [description] series of hits on [defender]!',
                    '[attacker] rapidly hits [defender] with a tree branch!',
                ],
                miss: [
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
            damage: [200,500],
            baseAccuracy: 80,
            type: physical,
            multiplier: str,
            rapidfire: [0,0],
            attack_description: {
                KO: [
                    '[attacker] crushes [defender] with a log!', 
                    '[attacker] sends [defender] flying with [strong] hit!', 
                    '[defender] collapses after being whacked by a log!', 
                    '[defender] is crushed under [attacker]\'s log!',
                ],
                single: [
                    '[attacker] bashed [defender]\'s [body] with a log!', 
                ],
                miss: [
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
            baseAccuracy: 90,
            type: physical,
            multiplier: str,
            rapidfire: [80,5],
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
    },
    teir2: {
        rustyKnife: {
            name: 'rusty knife',
            player_useable: true,
            damage: [45,75],
            baseAccuracy: 90,
            type: physical,
            multiplier: str,
            rapidfire: [50,6],
            attack_description: {
                KO: [
                    '[attacker] piered [defender]\'s heart with a rusty knife!', 
                    '[attacker] stabbed [defender]\'s eyes with a rusty knife!', 
                    '[defender] collapses after being stabbed by a rusty knife!', 
                    '[defender] flees after taking [strong] attack from [attacker]!',
                ],
                single: [
                    '[attacker] slashed [defender]\'s [body] with a rusty knife!', 
                    '[attacker] stabbed [defender]\'s [body] with a rusty knife!', 
                ],
                multi: [
                    '[attacker] landed [description] series of slashes on [defender]!',
                    '[attacker] rapidly stabbed [defender] with a rusty knife!',
                ],
                miss: [
                    '[attacker] trips on [naturalHazard] and misses!',
                    '[attacker] swings his rusty knife wildly at [defender] and misses!',
                    '[attacker] swipes at [defender] with a rusty knife and misses!',
                    '[defender] dodges to the side, avoiding [attacker]\'s rusty knife with ease!',
                ]
            }
        },
        rustySword: {
            name: 'rusty sword',
            player_useable: true,
            damage: [60,100],
            baseAccuracy: 90,
            type: physical,
            multiplier: str,
            rapidfire: [60,5],
            attack_description: {
                KO: [
                    '[attacker] piered [defender]\'s heart with a rusty sword!', 
                    '[attacker] decapitates [defender] with a rusty sword!', 
                    '[defender] collapses after being stabbed by a rusty sword!', 
                    '[defender] flees after taking [strong] attack from [attacker]!',
                ],
                single: [
                    '[attacker] slashed [defender]\'s [body] with a rusty sword!', 
                    '[attacker] stabbed [defender]\'s [body] with a rusty sword!', 
                ],
                multi: [
                    '[attacker] landed [description] series of slashes on [defender]!',
                    '[attacker] rapidly stabbed [defender] with a rusty sword!',
                ],
                miss: [
                    '[attacker] trips on [naturalHazard] and misses!',
                    '[attacker] swings his rusty sword wildly at [defender] and misses!',
                    '[attacker] swipes at [defender] with a rusty sword and misses!',
                    '[defender] dodges to the side, avoiding [attacker]\'s rusty sword with ease!',
                ]
            }
        },
        axe: {
            name: 'axe',
            player_useable: true,
            damage: [125,175],
            baseAccuracy: 80,
            type: physical,
            multiplier: str,
            rapidfire: [25,2],
            attack_description: {
                KO: [
                    '[attacker] decapitates [defender] with an axe!', 
                    '[defender] collapses after being chopped by an axe!', 
                    '[defender] flees after taking [strong] attack from [attacker]!',
                ],
                single: [
                    '[attacker] slashed [defender]\'s [body] with an axr!', 
                    '[attacker] hit [defender]\'s [body] with an axe!', 
                ],
                multi: [
                    '[attacker] landed [description] series of hits on [defender]!',
                    '[attacker] rapidly cut [defender] with an axe!',
                ],
                miss: [
                    '[attacker] trips on [naturalHazard] and misses!',
                    '[attacker] swings his axe wildly at [defender] and misses!',
                    '[attacker] swipes at [defender] with an axe and misses!',
                    '[defender] dodges to the side, avoiding [attacker]\'s axe with ease!',
                ]
            }
        },
        mace: {
            name: 'mace',
            player_useable: true,
            damage: [40,60],
            baseAccuracy: 90,
            type: physical,
            multiplier: str,
            rapidfire: [90,8],
            attack_description: {
                KO: [
                    '[defender] collapses after being whacked by a mace!', 
                    '[attacker] knocks [defender] unconscious with a mace!', 
                    '[defender] flees after taking [strong] attack from [attacker]!',
                ],
                single: [
                    '[attacker] hit [defender]\'s [body] with a mace!', 
                    '[attacker] swing a mace into [defender]\'s [body]!', 
                ],
                multi: [
                    '[attacker] landed [description] series of hits on [defender]!',
                    '[attacker] wildly swing his mace, bashing [defender] multiple times!',
                    '[attacker] repeatedly bashed [defender] with a mace!',
                ],
                miss: [
                    '[attacker] trips on [naturalHazard] and misses!',
                    '[attacker] swings his mace wildly at [defender] and misses!',
                    '[defender] dodges to the side, avoiding [attacker]\'s mace with ease!',
                ]
            }
        },
        hammer: {
            name: 'hammer',
            player_useable: true,
            damage: [50,80],
            baseAccuracy: 60,
            type: piercing,
            multiplier: str,
            rapidfire: [60,5],
            attack_description: {
                KO: [
                    '[defender] collapses after being whacked by a hammer!', 
                    '[attacker] knocks [defender] unconscious with a hammer!', 
                    '[defender] flees after taking [strong] attack from [attacker]!',
                ],
                single: [
                    '[attacker] hit [defender]\'s [body] with a hammer!', 
                    '[attacker] swing a hammer into [defender]\'s [body]!', 
                ],
                multi: [
                    '[attacker] landed [description] series of hits on [defender]!',
                    '[attacker] wildly swings his hammer, bashing [defender] multiple times!',
                    '[attacker] repeatedly bashed [defender] with a hammer!',
                    '[attacker] hits the ground with his hammer, creating a devastating shockwave!', 
                ],
                miss: [
                    '[attacker] trips on [naturalHazard] and misses!',
                    '[attacker] swings his hammer wildly at [defender] and misses!',
                    '[defender] dodges to the side, avoiding [attacker]\'s hammer with ease!',
                ]
            }
        },
        pitchfork: {
            name: 'pitchfork',
            player_useable: true,
            damage: [60,90],
            baseAccuracy: 50,
            type: physical,
            multiplier: str,
            rapidfire: [60,3],
            attack_description: {
                KO: [
                    '[defender] collapses after being stabbled by a pitchfork!', 
                    '[attacker] knocks [defender] unconscious with a pitchfork!', 
                    '[defender] flees after taking [strong] attack from [attacker]!',
                ],
                single: [
                    '[attacker] jabs [defender]\'s [body] with a pitchfork!', 
                    '[attacker] stabs [defender]\'s [body] with a pitchfork!', 
                    '[attacker] swing a pitchfork into [defender]\'s [body]!', 
                ],
                multi: [
                    '[attacker] wildly swings his pitchfork, stabbing [defender] multiple times!',
                    '[attacker] repeatedly jabbed [defender] with a pitchfork!',
                ],
                miss: [
                    '[attacker] trips on [naturalHazard] and misses!',
                    '[attacker] swings his pitchfork wildly at [defender] and misses!',
                    '[defender] dodges to the side, avoiding [attacker]\'s pitchfork with ease!',
                ]
            }
        },
        pickaxe: {
            name: 'pickaxe',
            player_useable: true,
            damage: [50,90],
            baseAccuracy: 45,
            type: physical,
            multiplier: str,
            rapidfire: [50,3],
            attack_description: {
                KO: [
                    '[attacker] knocks [defender] unconscious with a pickaxe!', 
                    '[defender] flees after taking [strong] attack from [attacker]!',
                ],
                single: [
                    '[attacker] stabs [defender]\'s [body] with a pickaxe!', 
                    '[attacker] swing a pickaxe into [defender]\'s [body]!', 
                ],
                multi: [
                    '[attacker] wildly swings his pickaxe, hitting [defender] multiple times!',
                    '[attacker] repeatedly jabbed [defender] with a pickaxe!',
                ],
                miss: [
                    '[attacker] trips on [naturalHazard] and misses!',
                    '[attacker] swings his pickaxe wildly at [defender] and misses!',
                    '[defender] dodges to the side, avoiding [attacker]\'s pickaxe with ease!',
                ]
            }
        },
    },
    tier3: {
        sledgehammer: {
            name: 'sledgehammer',
            player_useable: true,
            damage: [150,200],
            baseAccuracy: 90,
            type: physical,
            multiplier: str,
            rapidfire: [10,2],
            attack_description: {
                KO: [
                    '[defender] collapses after being whacked by a sledgehammer!', 
                    '[attacker] knocks [defender] unconscious with a sledgehammer!', 
                    '[defender] flees after taking [strong] attack from [attacker]!',
                ],
                single: [
                    '[attacker] hit [defender]\'s [body] with a sledgehammer!', 
                    '[attacker] swing a sledgehammer into [defender]\'s [body]!', 
                ],
                multi: [
                    '[attacker] wildly swing his sledgehammer, bashing [defender] multiple times!',
                    '[attacker] repeatedly bashed [defender] with a sledgehammer!',
                ],
                miss: [
                    '[attacker] trips on [naturalHazard] and misses!',
                    '[attacker] swings his sledgehammer wildly at [defender] and misses!',
                    '[defender] dodges to the side, avoiding [attacker]\'s sledgehammer with ease!',
                ]
            }
        },
        katana: {
            name: 'katana',
            player_useable: true,
            damage: [50,70],
            baseAccuracy: 90,
            type: physical,
            multiplier: str,
            rapidfire: [95,10],
            attack_description: {
                KO: [
                    '[defender] was decapitated by [attacker!', 
                    '[attacker] kills [defender] with a katana!',
                    '[defender] flees after taking [strong] attack from [attacker]!',
                ],
                single: [
                    '[attacker] slashed [defender]\'s [body] with a katana!', 
                ],
                multi: [
                    '[attacker] landed [description] series of hits on [defender]!',
                    '[attacker] wildly swing his katana, cutting [defender] multiple times!',
                    '[attacker] repeatedly cut [defender] with a katana!',
                ],
                miss: [
                    '[attacker] trips on [naturalHazard] and misses!',
                    '[attacker] swings his katana wildly at [defender] and misses!',
                    '[defender] dodges to the side, avoiding [attacker]\'s katana with ease!',
                ]
            }
        },
        bow: {
            name: 'bow',
            player_useable: true,
            damage: [90,125],
            baseAccuracy: 100,
            type: physical,
            multiplier: str,
            rapidfire: [25,3],
            attack_description: {
                KO: [
                    '[attacker] pierced [defender\'s heart with an arrow!',
                    '[defender] flees after being shot full of arrows!',
                ],
                single: [
                    '[attacker] shot an arrow into [defender]\'s [body]!', 
                ],
                multi: [
                    '[attacker] repeatedly shot [defender] using his bow!',
                ],
                miss: [
                    '[attacker] shoots at [defender] and misses!',
                    '[defender] dodges to the side, avoiding [attacker]\'s arrow with ease!',
                ]
            }
        },
        spear: {
            name: 'spear',
            player_useable: true,
            damage: [10,150],
            baseAccuracy: 95,
            type: physical,
            multiplier: str,
            rapidfire: [75,5],
            attack_description: {
                KO: [
                    '[attacker] pierced [defender\'s heart with a spear!',
                    '[defender] flees after being stabbed by [attacker]!',
                ],
                single: [
                    '[attacker] stabbed [defender]\'s [body] with a spear!', 
                ],
                multi: [
                    '[attacker] repeatedly stabbed [defender] with a spear!',
                    '[attacker] repeatedly stabbed [defender]\'s [body] with a spear!',
                    '[attacker] landed consecutive attacks on [defender] with a spear!',
                ],
                miss: [
                    '[attacker] charges at [defender] and misses!',
                    '[defender] dodges to the side, avoiding [attacker]\'s spear with ease!',
                ]
            }
        },
    }
    
};

const secondaries = {
    longbow: {
        name: 'longbow',
        player_useable: true,
        damage: [200,250],
        baseAccuracy: 75,
        type: physical,
        ammo: 'arrow',
        consumption: 1,
        attack_description: {
            KO: [
                '[attacker] shot [defender] in the head, instantly killing him!',
            ],
            single: [
                '[attacker] fired an arrow at [defender]!',
                '[attacker] shot at [defender] with his bow!',
            ],
            miss: [
                '[attacker] fired at [defender] but missed!',
                '[attacker]\'s arrow sailed harmlessly past [defender]!',
            ]
        }
    },
    crossbow: {
        name: 'crossbow',
        player_useable: true,
        damage: [150,300],
        baseAccuracy: 90,
        type: physical,
        ammo: 'arrow',
        consumption: 1,
        attack_description: {
            KO: [
                '[attacker] shot [defender] in the head, instantly killing him!',
            ],
            single: [
                '[attacker] fired an arrow at [defender]!',
                '[attacker] shot at [defender] with his crossbow!',
            ],
            miss: [
                '[attacker] fired at [defender] but missed!',
                '[attacker]\'s arrow sailed harmlessly past [defender]!',
            ]
        }
    },
    pistol: {
        name: 'pistol',
        player_useable: true,
        damage: [90,125],
        baseAccuracy: 90,
        type: physical,
        ammo: '9mm bullets',
        consumption: 3,
        attack_description: {
            KO: [
                '[attacker] shot [defender] in the head, instantly killing him!',
            ],
            single: [
                '[attacker] fired an bullet at [defender]!',
                '[attacker] shot at [defender] with his pistol!',
            ],
            miss: [
                '[attacker] fired at [defender] but missed!',
                '[attacker]\'s bullet sailed harmlessly past [defender]!',
            ]
        }
    },
    AK47: {
        name: 'AK-47',
        player_useable: true,
        damage: [50,150],
        baseAccuracy: 50,
        type: physical,
        ammo: 'assault rifle magazine',
        consumption: 15,
        attack_description: {
            KO: [
                '[attacker] shot [defender] in the head, instantly killing him!',
            ],
            single: [
                '[attacker] fired an colley of bullets at [defender]!',
                '[attacker] shot at [defender] with his AK-47!',
            ],
            miss: [
                '[attacker] fired at [defender] but missed all his shots!',
                '[attacker]\'s bullets sailed harmlessly past [defender]!',
            ]
        }
    },
    sniper: {
        name: 'sniper rifle',
        player_useable: true,
        damage: [1500,2000],
        baseAccuracy: 100,
        type: physical,
        ammo: '.50cal bullets',
        consumption: 1,
        attack_description: {
            KO: [
                '[attacker] shot [defender] in the head, instantly killing him!',
            ],
            single: [
                '[attacker] fired an bullet at [defender]!',
                '[attacker] shot at [defender] with his pistol!',
            ],
            miss: [
                '[attacker] fired at [defender] but missed!',
                '[attacker]\'s bullet sailed harmlessly past [defender]!',
            ]
        }
    },
    GAU8Avenger: {
        name: 'GAU-8 Avenger',
        player_useable: true,
        damage: [5000,10000],
        baseAccuracy: 80,
        type: physical,
        ammo: '30mm depleted uranium rounds',
        consumption: 4200,
        attack_description: {
            KO: [
                '[attacker] annililated [defender] with a GAU-8 gattling gun!',
            ],
            single: [
                '[attacker] fired at [defender] with a GAU-8 gattling gun!',
            ],
            miss: [
                '[attacker] fired at [defender] but somehow missed all his shots!',
            ]
        }
    },
};

const enemies = {
    default: [
        {
            name: "Bodyguard",
            //         "_______________"
            shortName: "      Bodyguard",
            maxHealth: 500,
            health: 500,
            strength: 1.5,
            attacks: [weapons.enemy.baseballBat, weapons.body.punch, weapons.body.kick],
            quotes: ["I shall defend Taj with my life!", "Death to the enemies of Taj!", "I shall protect Taj!", "You shall not Pass!"],
            last_words: null,
            quantity: [1,1],
            can_die: true,
            evasionChance: 1,
            romance: -1,
            armour: {
                physical: {durability: 100, resistance: 10},
                fire: {durability: 50, resistance: 5},
                energy: {durability: 0, resistance: 0},
                magical: {durability: 0, resistance: 0}
            },
            lost: 0
        },
        {
            name: "Terrorist",
            //         "_______________"
            shortName: "      Terrroist",
            maxHealth: 200,
            health: 200,
            strength: 1,
            attacks: [weapons.body.punch, weapons.body.kick],
            quotes: ["Death to the enemies of Taj!", "For Taj!"],
            last_words: null,
            quantity: [1,3],
            can_die: true,
            evasionChance: 1,
            romance: -1,
            armour: {
                physical: {durability: 100, resistance: 10},
                fire: {durability: 50, resistance: 5},
                energy: {durability: 0, resistance: 0},
                magical: {durability: 0, resistance: 0}
            },
            lost: 0
        },
        {
            name: "Gangster",
            //         "_______________"
            shortName: "       Gangster",
            maxHealth: 100,
            health: 100,
            strength: 1,
            attacks: [weapons.body.punch, weapons.body.kick],
            quotes: ["you shall die!", "For Taj!"],
            last_words: null,
            quantity: [2,5],
            can_die: true,
            evasionChance: 1,
            romance: 10,
            armour: {
                physical: {durability: 0, resistance: 0},
                fire: {durability: 0, resistance: 0},
                energy: {durability: 0, resistance: 0},
                magical: {durability: 0, resistance: 0}
            },
            lost: 0
        },
        {
            name: "Sped",
            //         "_______________"
            shortName: "           Sped",
            maxHealth: 1500,
            health: 1500,
            strength: 10,
            attacks: [weapons.body.punch, weapons.body.kick, weapons.body.headbut, weapons.body.bodyslam],
            quotes: ["die, enemy of Taj"],
            last_words: null,
            quantity: [1,1],
            can_die: true,
            evasionChance: 100,
            romance: 2,
            armour: {
                physical: {durability: 200, resistance: 50},
                fire: {durability: 50, resistance: 5},
                energy: {durability: 0, resistance: 0},
                magical: {durability: 0, resistance: 0}
            }
        },
        {
            name: "Servant",
            //         "_______________"
            shortName: "        Servant",
            maxHealth: 150,
            health: 150,
            strength: 1,
            attacks: [weapons.body.punch, weapons.body.kick],
            quotes: ["I serve Taj!", 'for Taj!'],
            last_words: null,
            quantity: [1,2],
            can_die: true,
            evasionChance: 1.5,
            romance: -1,
            armour: {
                physical: {durability: 0, resistance: 0},
                fire: {durability: 0, resistance: 0},
                energy: {durability: 0, resistance: 0},
                magical: {durability: 0, resistance: 0}
            },
            lost: 0
        },
        {
            name: "Anarchist",
            //         "_______________"
            shortName: "      Anarchist",
            maxHealth: 250,
            health: 250,
            strength: 1,
            attacks: [weapons.body.punch, weapons.body.kick, weapons.enemy.AK47],
            quotes: ["For anarchy!", 'down with the governemnt!'],
            last_words: null,
            quantity: [1,1],
            can_die: true,
            evasionChance: 1,
            romance: -1,
            armour: {
                physical: {durability: 200, resistance: 50},
                fire: {durability: 0, resistance: 0},
                energy: {durability: 0, resistance: 0},
                magical: {durability: 0, resistance: 0}
            },
            lost: 0
        },
        {
            name: "Suicide Bomber",
            //         "_______________"
            shortName: " Suicide Bomber",
            maxHealth: 0,
            health: 0,
            strength: 1,
            attacks: [weapons.enemy.nuke],
            quotes: ["DIE!", 'I will kill you!'],
            last_words: null,
            quantity: [1,1],
            can_die: true,
            evasionChance: 1,
            romance: -1,
            armour: {
                physical: {durability: 0, resistance: 0},
                fire: {durability: 0, resistance: 0},
                energy: {durability: 0, resistance: 0},
                magical: {durability: 0, resistance: 0}
            },
            lost: 0
        },
    ],
    religious: [
        {
            name: "Tajism Priest",
            //         "_______________"
            shortName: "  Tajism Priest",
            maxHealth: 100,
            health: 100,
            strength: 1,
            attacks: [weapons.enemy.magicBeam,weapons.enemy.flamesOfTerrorism,weapons.enemy.swordOfTerrorism],
            quotes: ["Hail Taj our lord and saviour!", "For Terrorist Taj!", "I shall protect the lord!"],
            last_words: ["You shall not defeat the Taj of Terrorism"],
            quantity: [2,5],
            can_die: true,
            evasionChance: 0.9,
            romance: -1,
            armour: {
                physical: {durability: 0, resistance: 0},
                fire: {durability: 0, resistance: 0},
                energy: {durability: 0, resistance: 0},
                magical: {durability: 200, resistance: 50}
            }
        },
        {
            name: "Tajism Cultist",
            //         "_______________"
            shortName: " Tajism Cultist",
            maxHealth: 50,
            health: 50,
            strength: 0.5,
            attacks: [weapons.enemy.swordOfTerrorism,weapons.enemy.chant,weapons.body.punch,weapons.body.kick],
            quotes: ["Hail Terrorist Taj!", "For Taj, our lord and saviour!"],
            last_words: ["You shall not defeat the Taj"],
            quantity: [4,6],
            can_die: true,
            evasionChance: 100,
            romance: -1,
            armour: {
                physical: {durability: 0, resistance: 0},
                fire: {durability: 0, resistance: 0},
                energy: {durability: 0, resistance: 0},
                magical: {durability: 0, resistance: 0}
            },
            lost: 0
        },
        {
            name: "Tajism Believer",
            //         "_______________"
            shortName: "Tajism Believer",
            maxHealth: 75,
            health: 75,
            strength: 0.5,
            attacks: [weapons.enemy.chant,weapons.body.punch,weapons.body.kick],
            quotes: ["Hail Terrorist Taj!", "For Taj, our lord and saviour!", "I believe in th power of Taj"],
            last_words: ["You shall not defeat the Taj"],
            quantity: [3,6],
            can_die: true,
            evasionChance: 10,
            romance: 7,
            armour: {
                physical: {durability: 0, resistance: 0},
                fire: {durability: 0, resistance: 0},
                energy: {durability: 0, resistance: 0},
                magical: {durability: 0, resistance: 0}
            },
            lost: 0
        },
    ],
    innovations: [
        {
            name: "Choyuni Farmer",
            //         "_______________"
            shortName: " Choyuni Farmer",
            maxHealth: 100,
            health: 100,
            strength: 0.75,
            attacks: [weapons.body.punch,weapons.body.kick,weapons.teir2.pitchfork],
            quotes: ["die"],
            last_words: null,
            quantity: [1,3],
            can_die: true,
            evasionChance: 2,
            romance: -1,
            armour: {
                physical: {durability: 0, resistance: 0},
                fire: {durability: 0, resistance: 0},
                energy: {durability: 0, resistance: 0},
                magical: {durability: 0, resistance: 0}
            },
            lost: 0
        },
        {
            name: "Choyuni Miner",
            //         "_______________"
            shortName: "  Choyuni Miner",
            maxHealth: 150,
            health: 150,
            strength: 1,
            attacks: [weapons.body.punch,weapons.body.kick,weapons.teir2.pickaxe],
            quotes: ["die"],
            last_words: null,
            quantity: [1,2],
            can_die: true,
            evasionChance: 5,
            romance: -1,
            armour: {
                physical: {durability: 0, resistance: 0},
                fire: {durability: 0, resistance: 0},
                energy: {durability: 0, resistance: 0},
                magical: {durability: 0, resistance: 0}
            },
            lost: 0
        },
        {
            name: "Choyuni Gold Digger",
            //         "_______________"
            shortName: "    Gold Digger",
            maxHealth: 10,
            health: 10,
            strength: 1,
            attacks: [weapons.body.punch,weapons.body.kick,weapons.teir2.pickaxe],
            quotes: ["die"],
            last_words: null,
            quantity: [1,2],
            can_die: true,
            evasionChance: 5,
            romance: 15,
            armour: {
                physical: {durability: 0, resistance: 0},
                fire: {durability: 0, resistance: 0},
                energy: {durability: 0, resistance: 0},
                magical: {durability: 0, resistance: 0}
            },
            lost: 0
        },
        {
            name: "Choyuni Soldier",
            //         "_______________"
            shortName: "Choyuni Soldier",
            maxHealth: 200,
            health: 200,
            strength: 1,
            attacks: [weapons.body.punch,weapons.body.kick,weapons.teir2.rustySword,weapons.teir2.rustyKnife],
            quotes: ["die, enemies of the choyuni nation!", "die"],
            last_words: null,
            quantity: [1,3],
            can_die: true,
            evasionChance: 1,
            romance: -1,
            armour: {
                physical: {durability: 50, resistance: 10},
                fire: {durability: 0, resistance: 0},
                energy: {durability: 0, resistance: 0},
                magical: {durability: 0, resistance: 0}
            },
            lost: 0
        },
        /*
        {
            name: "Mace",
            //         "_______________"
            shortName: "           Mace",
            maxHealth: 100,
            health: 100,
            strength: 1,
            attacks: [weapons.body.punch,weapons.body.kick,weapons.enemy.curry],
            quotes: ["I am the all mighty Mace!", "die peasants!"],
            last_words: ["I will be back..."],
            quantity: [1,1],
            can_die: false,
            evasionChance: 1,
            romance: 3,
            armour: {
                physical: {durability: 500, resistance: 50},
                fire: {durability: 0, resistance: 0},
                energy: {durability: 0, resistance: 0},
                magical: {durability: 0, resistance: 0}
            }
        },*/
        {
            name: "Witch doctor",
            //         "_______________"
            shortName: "   Witch doctor",
            maxHealth: 300,
            health: 300,
            strength: 1,
            attacks: [weapons.enemy.magicBeam,weapons.enemy.voodooMagic],
            quotes: ["die to my voodoo magic"],
            last_words: null,
            quantity: [1,1],
            can_die: true,
            evasionChance: 1,
            romance: -1,
            armour: {
                physical: {durability: 0, resistance: 0},
                fire: {durability: 0, resistance: 0},
                energy: {durability: 100, resistance: 10},
                magical: {durability: 1000, resistance: 100}
            },
            lost: 0
        },
    ],
    spedlords: [
        {
            name: "Spedlord Mace", 
            //         "_______________"
            shortName: "  Sp3dl0rd Mace",
            maxHealth: 1000,
            health: 1000,
            strength: 1,
            attacks: [weapons.body.punch,weapons.body.kick,weapons.enemy.insult,weapons.enemy.curry,weapons.teir2.mace],
            quotes: ["die peasants", "I am the GOAT", "you can not win", "your inferior inteligence can not defeat me", "I am the geatest html programmer", "you dingleberry", "you nigglefard"],
            last_words: ["I shall be back..."],
            quantity: [1,1],
            can_die: false,
            evasionChance: 0.5,
            romance: 100,
            armour: {
                physical: {durability: 1000, resistance: 10},
                fire: {durability: 1000, resistance: 10},
                energy: {durability: 1000, resistance: 10},
                magical: {durability: 1000, resistance: 10}
            },
            lost: 0
        },
        {
            name: "Spedlord Yape", 
            //         "_______________"
            shortName: "  Sp3dl0rd Yape",
            maxHealth: 5000,
            health: 5000,
            strength: 2,
            attacks: [weapons.body.punch,weapons.body.kick,weapons.enemy.footwork,weapons.enemy.maths],
            quotes: ["For geobears", "you can not defeat the perpendicular bisectors of the equilibrium of the photosynthesis!", "I have the power of the monomial derivitive of the trigonometry apothem", "you shall fall to the power of Unit 3&4 of maths specialist"],
            last_words: ["I will be back..."],
            quantity: [1,1],
            can_die: false,
            evasionChance: 5,
            romance: -1,
            armour: {
                physical: {durability: 10000, resistance: 500},
                fire: {durability: 10000, resistance: 500},
                energy: {durability: 10000, resistance: 500},
                magical: {durability: 10000, resistance: 500}
            },
            lost: 0
        },
        {
            name: "Spedlord jaT", 
            //         "_______________"
            shortName: "   Sp3dl0rd jaT",
            maxHealth: 1000,
            health: 1000,
            strength: 1,
            attacks: [weapons.body.punch,weapons.body.kick,weapons.enemy.bullshit,weapons.enemy.MQ28GhostBat,weapons.enemy.sneak100],
            quotes: ["I is very stronger than you", "you is dying to me"],
            last_words: ["me no die to you"],
            quantity: [1,1],
            can_die: false,
            evasionChance: 1,
            romance: -1,
            armour: {
                physical: {durability: 1000, resistance: 100},
                fire: {durability: 1000, resistance: 100},
                energy: {durability: 1000, resistance: 100},
                magical: {durability: 1000, resistance: 100}
            },
            lost: 0
        },
        {
            name: "Spedlord Bird", 
            //         "_______________"
            shortName: "  Sp3dl0rd B1rd",
            maxHealth: 1,
            health: 1,
            strength: 0.1,
            attacks: [weapons.body.punch,weapons.body.kick,weapons.enemy.stumble,weapons.enemy.trip],
            quotes: ["you idot"],
            last_words: ["I will be back..."],
            quantity: [1,1],
            can_die: false,
            evasionChance: 1000,
            romance: -1,
            armour: {
                physical: {durability: 0, resistance: 0},
                fire: {durability: 0, resistance: 0},
                energy: {durability: 0, resistance: 0},
                magical: {durability: 0, resistance: 0}
            },
            lost: 0
        },
        {
            name: "Ta-Ja",
            //         "_______________"
            shortName: "          Ta-JA", 
            maxHealth: 1500,
            health: 1500,
            strength: 1,
            attacks: [weapons.enemy.stumble,weapons.enemy.trip,weapons.enemy.bullshit,weapons.enemy.MQ28GhostBat,weapons.enemy.sneak100],
            quotes: ["Taj quote", "Taj quote 2"],
            last_words: ["I will be back"],
            quantity: [1,1],
            can_die: false,
            evasionChance: 1,
            romance: -1,
            armour: {
                physical: {durability: 1000, resistance: 100},
                fire: {durability: 1000, resistance: 100},
                energy: {durability: 1000, resistance: 100},
                magical: {durability: 1000, resistance: 100}
            },
            lost: 0
        },
    ],
    taj: [
        {
            name: "Terrorist Taj", 
            //         "_______________"
            shortName: "  Terrorist Taj",
            maxHealth: 1000,
            health: 1000,
            strength: 1,
            attacks: [],
            quotes: [],
            last_words: [],
            quantity: [1,1],
            can_die: false,
            evasionChance: 0,
            romance: -1,
            armour: {
                physical: {durability: 0, resistance: 0},
                fire: {durability: 0, resistance: 0},
                energy: {durability: 0, resistance: 0},
                magical: {durability: 0, resistance: 0}
            },
            lost: 0
        },
        {
            name: "Terrorist Taj", 
            //         "_______________"
            shortName: "  Terrorist Taj",
            maxHealth: 1000,
            health: 0,
            strength: 1,
            attacks: [],
            quotes: [],
            last_words: [],
            quantity: [1,1],
            can_die: false,
            evasionChance: 0,
            romance: -1,
            armour: {
                physical: {durability: 0, resistance: 0},
                fire: {durability: 0, resistance: 0},
                energy: {durability: 0, resistance: 0},
                magical: {durability: 0, resistance: 0}
            },
            lost: 1000
        },
    ]
};

const armours = [
    {
        name: 'suit of leather armour',
        armour: {
            physical: {durability: 500, resistance: 50},
            fire: {durability: 200, resistance: 10},
            energy: {durability: 0, resistance: 0},
            magical: {durability: 0, resistance: 0},
            poison: {durability: 0, resistance: 0}
        },
        strengthIncease: 0
    },
    {
        name: 'suit of rusty iron armour',
        armour: {
            physical: {durability: 1500, resistance: 100},
            fire: {durability: 500, resistance: 25},
            energy: {durability: 10, resistance: 1},
            magical: {durability: 0, resistance: 0},
            poison: {durability: 0, resistance: 0}
        },
        strengthIncease: -0.2
    },
    {
        name: 'suit of bronze armour',
        armour: {
            physical: {durability: 1000, resistance: 150},
            fire: {durability: 200, resistance: 40},
            energy: {durability: 20, resistance: 5},
            magical: {durability: 0, resistance: 0},
            poison: {durability: 0, resistance: 0}
        },
        strengthIncease: -0.1
    },
    {
        name: 'suit of chainmail armour',
        armour: {
            physical: {durability: 750, resistance: 125},
            fire: {durability: 0, resistance: 0},
            energy: {durability: 0, resistance: 0},
            magical: {durability: 0, resistance: 0},
            poison: {durability: 0, resistance: 0}
        },
        strengthIncease: 0
    },
    {
        name: 'suit of iron plate armour',
        armour: {
            physical: {durability: 2000, resistance: 200},
            fire: {durability: 500, resistance: 50},
            energy: {durability: 50, resistance: 10},
            magical: {durability: 0, resistance: 0},
            poison: {durability: 0, resistance: 0}
        },
        strengthIncease: -0.1
    },
    {
        name: 'bulletproof vest',
        armour: {
            physical: {durability: 1000, resistance: 420},
            fire: {durability: 100, resistance: 20},
            energy: {durability: 50, resistance: 10},
            magical: {durability: 0, resistance: 0},
            poison: {durability: 0, resistance: 0}
        },
        strengthIncease: 0
    },
    {
        name: 'suit of enchanted iron armour',
        armour: {
            physical: {durability: 4000, resistance: 400},
            fire: {durability: 1000, resistance: 100},
            energy: {durability: 100, resistance: 20},
            magical: {durability: 2000, resistance: 500},
            poison: {durability: 500, resistance: 10}
        },
        strengthIncease: 1
    },
    {
        name: 'Power Armour',
        armour: {
            physical: {durability: 10000, resistance: 690},
            fire: {durability: 20000, resistance: 720},
            energy: {durability: 5000, resistance: 500},
            magical: {durability: 1000, resistance: 100},
            poison: {durability: 100000, resistance: 100000}
        },
        strengthIncease: 3
    },
    {
        name: 'exoskeleton',
        armour: {
            physical: {durability: 10000, resistance: 720},
            fire: {durability: 20000, resistance: 980},
            energy: {durability: 5000, resistance: 980},
            magical: {durability: 1000, resistance: 250},
            poison: {durability: 100000, resistance: 100000}
        },
        strengthIncease: 5
    },
];

const sample_items = [
    {
        name: 'Maceline™ Painkillers',
        type: 'consumable',
        healthRegen: [0, 0],
        hungerRegen: [0, 0],
        mentalRegen: [500, 500],
        intelligenceIncrease: [0, 0],
        strengthChange: [0, 0],
        quickConsume: true,
        quantity: 3,
        stackSize: 10
    },
    {
        name: 'Maceline™ Steroids',
        type: 'consumable',
        healthRegen: [0, 0],
        hungerRegen: [0, 0],
        mentalRegen: [0, 0],
        intelligenceIncrease: [0, 0],
        strengthChange: [5, 10],
        quickConsume: true,
        quantity: 3,
        stackSize: 69
    },
    {
        name: 'rotten Flesh',
        type: 'consumable',
        healthRegen: [0, 0],
        hungerRegen: [50, 100],
        mentalRegen: [-10, -25],
        intelligenceIncrease: [0, 0],
        strengthChange: [0, 0],
        quickConsume: false,
        quantity: 3,
        stackSize: 5
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
        quantity: 1,
        stackSize: 1
    },
    {
        name: 'frag grenade',
        type: 'throwable',
        damage: [700, 1200],
        damageType: splash,
        quickConsume: false,
        damageType: physical,
        quantity: 1,
        stackSize: 1
    },
    {
        name: 'small rock',
        type: 'throwable',
        damage: [50, 100],
        damageType: single,
        quickConsume: true,
        damageType: physical,
        quantity: 3,
        stackSize: 5
    },
    {
        name: 'medium rock',
        type: 'throwable',
        damage: [75, 150],
        damageType: single,
        quickConsume: false,
        damageType: physical,
        quantity: 1,
        stackSize: 3
    },
    {
        name: 'big rock',
        type: 'throwable',
        damage: [150, 300],
        damageType: single,
        quickConsume: false,
        damageType: physical,
        quantity: 1,
        stackSize: 1
    },
];

const startingItems = [
    /*
    {
        name: '9mm bullets',
        type: 'ammunition',
        quantity: 5,
        stackSize: 10
    },
    {
        name: 'arrow',
        type: 'ammunition',
        quantity: 1,
        stackSize: 16
    },*/
    {
        name: 'small rock',
        type: 'throwable',
        damage: [50, 100],
        damageType: single,
        quickConsume: true,
        damageType: physical,
        quantity: 3,
        stackSize: 5
    },
    {
        name: 'medium rock',
        type: 'throwable',
        damage: [75, 150],
        damageType: single,
        quickConsume: false,
        damageType: physical,
        quantity: 1,
        stackSize: 3
    },
    {
        name: 'big rock',
        type: 'throwable',
        damage: [150, 300],
        damageType: single,
        quickConsume: false,
        damageType: physical,
        quantity: 1,
        stackSize: 1
    },
    {
        name: 'rotten Flesh',
        type: 'consumable',
        healthRegen: [0, 0],
        hungerRegen: [50, 100],
        mentalRegen: [-25, -10],
        intelligenceIncrease: [0, 0],
        strengthChange: [0, 0],
        quickConsume: false,
        quantity: 1,
        stackSize: 5
    },
    {
        name: 'apple',
        type: 'consumable',
        healthRegen: [0, 0],
        hungerRegen: [20, 30],
        mentalRegen: [0, 10],
        intelligenceIncrease: [0, 0],
        strengthChange: [0, 0],
        quickConsume: false,
        quantity: 1,
        stackSize: 5
    },
    {
        name: 'apple',
        type: 'consumable',
        healthRegen: [0, 0],
        hungerRegen: [20, 30],
        mentalRegen: [0, 10],
        intelligenceIncrease: [0, 0],
        strengthChange: [0, 0],
        quickConsume: false,
        quantity: 3,
        stackSize: 5
    },
    {
        name: 'bottle of milk',
        type: 'consumable',
        healthRegen: [10, 20],
        hungerRegen: [30, 50],
        mentalRegen: [0, 15],
        intelligenceIncrease: [0, 0],
        strengthChange: [0, 0],
        quickConsume: false,
        quantity: 1,
        stackSize: 1
    },
    {
        name: 'bandaid',
        type: 'consumable',
        healthRegen: [15, 25],
        hungerRegen: [0, 0],
        mentalRegen: [0, 0],
        intelligenceIncrease: [0, 0],
        strengthChange: [0, 0],
        quickConsume: true,
        quantity: 5,
        stackSize: 16
    },
    {
        name: 'Maceline™ Drugs',
        type: 'consumable',
        healthRegen: [-30, 30],
        hungerRegen: [0, 0],
        mentalRegen: [-25, 25],
        intelligenceIncrease: [0, 0],
        strengthChange: [-0.1, 0.1],
        quickConsume: true,
        quantity: 5,
        stackSize: 16
    },
];

const t1Items = [
    {
        name: '9mm bullets',
        type: 'ammunition',
        quantity: 10,
        stackSize: 10
    },
    {
        name: 'arrow',
        type: 'ammunition',
        quantity: 3,
        stackSize: 16
    },
    {
        name: 'voo doo medicine',
        type: 'consumable',
        healthRegen: [125,300],
        hungerRegen: [10, 25],
        mentalRegen: [0, 0],
        intelligenceIncrease: [0, 0],
        strengthChange: [0, 0],
        quickConsume: false,
        quantity: 1,
        stackSize: 1,
    },
    {
        name: 'sandy rock',
        type: 'throwable',
        damage: [50, 100],
        damageType: single,
        quickConsume: true,
        damageType: physical,
        quantity: 2,
        stackSize: 3
    },
    {
        name: 'raw fish',
        type: 'throwable',
        damage: [75, 125],
        damageType: single,
        quickConsume: true,
        damageType: physical,
        quantity: 5,
        stackSize: 16
    },
    {
        name: 'grilled fish',
        type: 'consumable',
        healthRegen: [25,50],
        hungerRegen: [150, 300],
        mentalRegen: [10, 30],
        intelligenceIncrease: [0, 0],
        strengthChange: [0, 0],
        quickConsume: false,
        quantity: 1,
        stackSize: 2,
    },
    {
        name: 'small rock',
        type: 'throwable',
        damage: [50, 100],
        damageType: single,
        quickConsume: true,
        damageType: physical,
        quantity: 3,
        stackSize: 5
    },
    {
        name: 'medium rock',
        type: 'throwable',
        damage: [75, 150],
        damageType: single,
        quickConsume: false,
        damageType: physical,
        quantity: 1,
        stackSize: 3
    },
    {
        name: 'big rock',
        type: 'throwable',
        damage: [150, 300],
        damageType: single,
        quickConsume: false,
        damageType: physical,
        quantity: 1,
        stackSize: 1
    },
    {
        name: 'rotten Flesh',
        type: 'consumable',
        healthRegen: [0, 0],
        hungerRegen: [50, 100],
        mentalRegen: [-25, -10],
        intelligenceIncrease: [0, 0],
        strengthChange: [0, 0],
        quickConsume: false,
        quantity: 1,
        stackSize: 5
    },
    {
        name: 'apple',
        type: 'consumable',
        healthRegen: [0, 0],
        hungerRegen: [20, 30],
        mentalRegen: [0, 10],
        intelligenceIncrease: [0, 0],
        strengthChange: [0, 0],
        quickConsume: false,
        quantity: 1,
        stackSize: 5
    },
    {
        name: 'apple',
        type: 'consumable',
        healthRegen: [0, 0],
        hungerRegen: [20, 30],
        mentalRegen: [0, 10],
        intelligenceIncrease: [0, 0],
        strengthChange: [0, 0],
        quickConsume: false,
        quantity: 3,
        stackSize: 5
    },
    {
        name: 'bottle of milk',
        type: 'consumable',
        healthRegen: [10, 20],
        hungerRegen: [30, 50],
        mentalRegen: [0, 15],
        intelligenceIncrease: [0, 0],
        strengthChange: [0, 0],
        quickConsume: false,
        quantity: 1,
        stackSize: 1
    },
    {
        name: 'small health potion',
        type: 'consumable',
        healthRegen: [25, 75],
        hungerRegen: [0, 0],
        mentalRegen: [0, 15],
        intelligenceIncrease: [0, 0],
        strengthChange: [0, 0],
        quickConsume: true,
        quantity: 1,
        stackSize: 5
    },
    {
        name: 'bandaid',
        type: 'consumable',
        healthRegen: [15, 25],
        hungerRegen: [0, 0],
        mentalRegen: [0, 0],
        intelligenceIncrease: [0, 0],
        strengthChange: [0, 0],
        quickConsume: true,
        quantity: 5,
        stackSize: 16
    },
    {
        name: 'Maceline™ Drugs',
        type: 'consumable',
        healthRegen: [-30, 30],
        hungerRegen: [0, 0],
        mentalRegen: [-25, 25],
        intelligenceIncrease: [0, 0],
        strengthChange: [-0.1, 0.1],
        quickConsume: true,
        quantity: 5,
        stackSize: 16
    },
];

const t2Items = [
    {
        name: '9mm bullets',
        type: 'ammunition',
        quantity: 10,
        stackSize: 10
    },
    {
        name: 'arrow',
        type: 'ammunition',
        quantity: 6,
        stackSize: 16
    },
    {
        name: 'assault rifle magazine',
        type: 'ammunition',
        quantity: 30,
        stackSize: 30
    },
    {
        name: 'Maceline™ Painkillers',
        type: 'consumable',
        healthRegen: [0, 0],
        hungerRegen: [0, 0],
        mentalRegen: [500, 500],
        intelligenceIncrease: [0, 0],
        strengthChange: [0, 0],
        quickConsume: true,
        quantity: 3,
        stackSize: 10
    },
    {
        name: 'Maceline™ Steroids',
        type: 'consumable',
        healthRegen: [0, 0],
        hungerRegen: [0, 0],
        mentalRegen: [0, 0],
        intelligenceIncrease: [0, 0],
        strengthChange: [5, 10],
        quickConsume: true,
        quantity: 3,
        stackSize: 69
    },
    {
        name: 'Maceline™ Instant Noodles',
        type: 'consumable',
        healthRegen: [0, 0],
        hungerRegen: [150, 250],
        mentalRegen: [25, 50],
        intelligenceIncrease: [0, 0],
        strengthChange: [0, 0],
        quickConsume: true,
        quantity: 1,
        stackSize: 6
    },
    {
        name: 'Maceline™ Instant Noodles',
        type: 'consumable',
        healthRegen: [0, 0],
        hungerRegen: [150, 250],
        mentalRegen: [25, 50],
        intelligenceIncrease: [0, 0],
        strengthChange: [0, 0],
        quickConsume: true,
        quantity: 2,
        stackSize: 6
    },
    {
        name: 'Maceline™ Health Potion',
        type: 'consumable',
        healthRegen: [100,250],
        hungerRegen: [0, 0],
        mentalRegen: [0, 0],
        intelligenceIncrease: [0, 0],
        strengthChange: [0, 0],
        quickConsume: true,
        quantity: 2,
        stackSize: 5,
    },
    {
        name: 'throwing knife',
        type: 'throwable',
        damage: [50, 100],
        damageType: single,
        quickConsume: true,
        damageType: physical,
        quantity: 2,
        stackSize: 5
    },
];

const t3Items = [
    {
        name: '9mm bullets',
        type: 'ammunition',
        quantity: 10,
        stackSize: 10
    },
    {
        name: 'arrow',
        type: 'ammunition',
        quantity: 12,
        stackSize: 16
    },
    {
        name: 'assault rifle magazine',
        type: 'ammunition',
        quantity: 30,
        stackSize: 30
    },
    {
        name: '.50cal bullets',
        type: 'ammunition',
        quantity: 1,
        stackSize: 1
    },
    {
        name: '30mm depleted uranium rounds',
        type: 'ammunition',
        quantity: 500,
        stackSize: 1100
    },
    {
        name: 'Maceline™ Painkillers',
        type: 'consumable',
        healthRegen: [0, 0],
        hungerRegen: [0, 0],
        mentalRegen: [500, 500],
        intelligenceIncrease: [0, 0],
        strengthChange: [0, 0],
        quickConsume: true,
        quantity: 3,
        stackSize: 10
    },
    {
        name: 'Maceline™ Steroids',
        type: 'consumable',
        healthRegen: [0, 0],
        hungerRegen: [0, 0],
        mentalRegen: [0, 0],
        intelligenceIncrease: [0, 0],
        strengthChange: [5, 10],
        quickConsume: true,
        quantity: 3,
        stackSize: 69
    },
    {
        name: 'Maceline™ Instant Noodles',
        type: 'consumable',
        healthRegen: [0, 0],
        hungerRegen: [150, 250],
        mentalRegen: [25, 50],
        intelligenceIncrease: [0, 0],
        strengthChange: [0, 0],
        quickConsume: true,
        quantity: 2,
        stackSize: 6
    },
    {
        name: 'Maceline™ Ice Tea',
        type: 'consumable',
        healthRegen: [200, 250],
        hungerRegen: [100, 200],
        mentalRegen: [225, 250],
        intelligenceIncrease: [0, 0],
        strengthChange: [0, 0],
        quickConsume: true,
        quantity: 1,
        stackSize: 6
    },
    {
        name: 'Maceline™ Health Potion',
        type: 'consumable',
        healthRegen: [100,250],
        hungerRegen: [0, 0],
        mentalRegen: [0, 0],
        intelligenceIncrease: [0, 0],
        strengthChange: [0, 0],
        quickConsume: true,
        quantity: 2,
        stackSize: 5,
    },
    {
        name: 'Maceline™ Large Health Potion',
        type: 'consumable',
        healthRegen: [150,350],
        hungerRegen: [0, 0],
        mentalRegen: [0, 0],
        intelligenceIncrease: [0, 0],
        strengthChange: [0, 0],
        quickConsume: true,
        quantity: 1,
        stackSize: 1,
    },
    {
        name: 'frag grenade',
        type: 'throwable',
        damage: [75, 150],
        damageType: splash,
        quickConsume: true,
        damageType: physical,
        quantity: 1,
        stackSize: 3
    },
    {
        name: 'high explosive grenade',
        type: 'throwable',
        damage: [125, 200],
        damageType: single,
        quickConsume: true,
        damageType: physical,
        quantity: 2,
        stackSize: 3
    },
    {
        name: 'throwing knife',
        type: 'throwable',
        damage: [50, 100],
        damageType: single,
        quickConsume: true,
        damageType: physical,
        quantity: 2,
        stackSize: 5
    },
    {
        name: 'medium rock',
        type: 'throwable',
        damage: [75, 150],
        damageType: single,
        quickConsume: false,
        damageType: physical,
        quantity: 1,
        stackSize: 3
    },
    {
        name: 'big rock',
        type: 'throwable',
        damage: [150, 300],
        damageType: single,
        quickConsume: false,
        damageType: physical,
        quantity: 1,
        stackSize: 1
    },
];


//Default player
var player = {
    playerName: player_name,
    name: player_name+' the Terrorist',
    health: (settings.stat_limit/4)*3,  // Max 1000
    hunger: settings.stat_limit,
    mental_health: settings.stat_limit/2,
    intelligence: 250,
    strength: 1,
    isTerrorist: false,
    armour: {
        physical: {durability: 500, resistance: 50},
        fire: {durability: 0, resistance: 0},
        energy: {durability: 0, resistance: 0},
        magical: {durability: 0, resistance: 0},
        poison: {durability: 0, resistance: 0}
    },
    inventory: {
        weapons: {
            hands: weapons.body.punch,
            feet: weapons.body.kick,
            main1: weapons.body.none,
            main2: weapons.body.none,
            secondary: weapons.body.none
        },
        items: [
            // Limit of strength*5 inventory slots, if inventory is too full items are ejected from the inventory
        ],
    },
    lost: [0,0,0,0]
};


// Boss fight Config
var bossPlayer = {
    playerName: player_name,
    name: player_name+' the Terrorist',
    health: settings.stat_limit,
    hunger: settings.stat_limit,
    mental_health: settings.stat_limit,
    intelligence: settings.stat_limit,
    strength: 10,
    isTerrorist: false,
    armour: {
        physical: {durability: 1000, resistance: 400},
        fire: {durability: 0, resistance: 0},
        energy: {durability: 0, resistance: 0},
        magical: {durability: 0, resistance: 0},
        poison: {durability: 0, resistance: 0}
    },
    inventory: {
        weapons: {
            hands: weapons.body.punch,
            feet: weapons.body.kick,
            main1: weapons.body.none,
            main2: weapons.body.none,
            secondary: weapons.body.none
        },
        items: [
            // Limit of strength*5 inventory slots, if inventory is too full items are ejected from the inventory
        ],
    },
    lost: [0,0,0,0]
};

const string = player_name;
const substring = 'Terrorist';
const index = string.indexOf(substring);
if (string.indexOf(substring) !== -1) {
  player.isTerrorist=true;
};

if (player.name == 'Taj') {
    player.health = settings.stat_limit
    player.intelligence = settings.stat_limit/5;
};

//Functions
function hideText(textID) {
    document.getElementById(textID).innerHTML = "";
};

async function addText(text) {
    for(let i=0;i<text.length;i++) {
        document.getElementById("console").innerHTML += text[i];
        await delay(10);
    }
};

function showTitle(text) {
    document.getElementById("startScreen").innerHTML = text;
};

async function showText(text, sped=true) {
    document.getElementById("console").innerHTML = '';
    if (sped) {
        for(let i=0;i<text.length;i++) {
            document.getElementById("console").innerHTML += text[i];
            await delay(10);
        }
    } else {
        document.getElementById("console").innerHTML = text;
    }
};

function hideButton(text) {
    document.getElementById("controlPannel").innerHTML = "";
};

function showButton(text) {
    document.getElementById("controlPannel").innerHTML = text;
};

function addButton(text) {
    document.getElementById("controlPannel").innerHTML = document.getElementById("controlPannel").innerHTML + text;
};

// Cutscene stuff, this took many hours :( 
const delay = ms => new Promise(res => setTimeout(res, ms));
var cutsceneEnded = false;
async function cutscene(text, sped = true) {
    await showText(text,sped);
    showButton(`<button id="continue" onclick="finishCutscene()">Continue</button>`);
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
    if (weaponsList) {
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
    for (let i=0; i<=10; i++) {
        await cutscene(`Bet you wished you could skip cutscenes. Now you have to wait for this very long message to load. Surely you have better things to do with your life. THere is actually nothing more to see but if you don't believe me, you can keep clicking.`);
    }
    await cutscene(`How did you even see this! There was a forever loop infont of this. HACKS!!!!!!!!!!!`);
    await cutscene(`Enjoy another forever loop!`);
    for (let i=0; i<=20; i++) {
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
        if (randint(0,3)) {
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
