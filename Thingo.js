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
    const enemies = {
        name: {
            health: 10,

        },
    };
    const player_weapons = {
        fist: {
            damage: 10,
            type: physical,
            multiplier: str,
            

        },
    };
}

function main() {

}








init()
main()