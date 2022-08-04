// ----------------------------------------------------------------------------------------------------
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// ----------------------------------------------------------------------------------------------------

function init() {
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
        
        {name: "Tom",
        health: 10,
        damage_multiplier: 1.5,
        attacks: [1,2,5],
        quotes: ["Hi", "TOMAHAWK"],
        last_words: "Goodbye, World!",
        quantity: 2,
        can_die: true,
        evasion_chance: 10,
        armour: {physical: [1],
        fire: []}
        }
        
        



    ]
    const attacks = {
        fist: {
            name: 'fist',
            damage: [min, max],
            type: physical,
            multiplier: str,
            log: ['[attacker] punched [defender] in the [body] doing [dmg] damage!'],
            effects: null,
            rapidfire: 1,
            max_rapidfire: 10,
        },
        stick: {
            name: 'stick',
            damage: [min, max],
            type: physical,
            multiplier: str,
            log: ['[attacker] hit [defender] in the [body] with a stick doing [dmg] damage!'],
            effects: null,
        },
        bat: {
            name: 'bat',
            damage: [min, max],
            type: physical,
            multiplier: str,
            log: ['[attacker] hit [defender] in the [body] with a baseball bat doing [dmg] damage!'],
            effects: null,
        },
    };


}

function main() {

}








init()
main()
testing()

function testing() {
    console.log(enemies[0].armour.physical[0])
}