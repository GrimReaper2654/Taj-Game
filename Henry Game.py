#
# --------------------------------------- henry fight ---------------------------------------
# [Insert creative description here]
#
#
#
#
#
# -----------------------------------------------------------------------------------------
#

# Setup
import time as t
import random as r
import sys as s
import os

class ERROR(Exception):
    pass
from platform   import system as system_name
from subprocess import call   as system_call
def clearConsole():
    # how to do this, I do not know
    return

def resetVariables():
    global player_name; player_name = 'Taj'
    global txt; txt = ''
    global max_stat; max_stat = 300
    global stats; stats = [200, 300, 300, 50, 15, 15]  # Health, Hunger, Mental Health, Intelligence, Evasion, Accuracy
    global player_armour; player_armour = 10 # player only has physical armour
    global item; item = [10, 20, 50, 42, 42, [0, 3]]  # voodoo medicine [0] , dried kelp [1] , bottle of seawater [2]
    global weapons; weapons = [42, 42, [0, 3]]  # main weapon [3], main weapon [4], secondary weapon [5][0], secondary ammo [5][1] Default weapon is 42 (none)
    global insults; insults = ['You smell bad.', 'You are stupid.', 'u moron', 'ur trash.', 'LMAO ur bad.', 'LMAO noob.', 'Imagine being you.', 'ur mum fat.', 'you spedlord', 'imagine being sped', 'ur mom fatter than henry', 'bir - d']
    global compliments; compliments = ['You look good.', 'You are smart.', 'You are cool.']
    global body; body = ['head', 'arm', 'leg', 'chest']
    global deaths; deaths = ['"[lastwords]" shouts [a] as his lifeless body falls onto the floor.', '[a] falls onto the ground, dead.', '[a] falls onto the ground, dead.']
    global auto_loot; auto_loot = [[1, 4], [1, 5], [1, 10], [1, 11], [1, 13], [1, 14], [1,17], [1, 18], [1, 30], [1, 35], [1, 36], [1, 37], [0, 0], [0, 1], [0, 2], [0, 3], [0, 13], [0, 6], [0, r.randint(0, 10)], [0, r.randint(0, 10)], [0, r.randint(0, 10)]]
    global god_loot; god_loot = [[1, 16], [1, 19], [1, 20], [1, 21], [1, 22], [0, 6], [0, 7], [0, 9], [0, 12]]
    global pos; pos = ['On a shelf', 'On the floor', 'In a box']
    global exp; exp = 0
    global attacks
    attacks = [
        # ['Name [0]', 'description [1]', ['min damage [2][0]', 'max damage [2][1]'], 'damage type [3]', 'can be multiplied [4]', 'block chance [5]', 'miss chance [6]', 'piercing [7]'],
        ['punch             ', '[a] punched [b] in the [body]', [3, 10], 'physical', True, 0.25, 0, 4],                             # 0
        ['kick              ', '[a] kicked [b] in the [body]', [5, 12], 'physical', True, 0.5, 0.1, 2],                             # 1
        ['head but          ', '[a] head butted [b]', [2, 6], 'physical', False, 0, 0, 1],                                          # 2
        ['bite              ', '[a] bit [b]', [5, 9], 'physical', True, 0.5, 0.01, 1],                                              # 3
        ['sword             ', '[a] slashed at [b] with his sword', [12, 35], 'physical', True, 0.2, 0, 3],                         # 4
        ['baseball bat      ', '[a] hit [b] on the [body] with his baseball bat', [4, 15], 'physical', True, 0.2, 0.2, 1],          # 5
        ['flaming curry     ', '[a] splashed [b] with burning curry', [2, 20], 'heat', True, 0.1, 0.1, 3],                          # 6
        ['curry splash      ', 'A tsunami of curry hit [b]', [10, 15], 'physical', True, 0.001, 0, 5],                              # 7
        ['magic beam emitter', '[a] shot a magical beam at [b]', [1, 20], 'magic', True, 0.01, 0.3, 1],                             # 8
        ['henry bible       ', '[a] prayed for henry to attack [b]', [1, 5], 'mental', False, 0, 0, 1],                             # 9
        ['katana            ', '[a] slashed at [b] with his katana', [5, 15], 'physical', True, 0.01, 0.1, 5],                      # 10
        ['ninja star        ', '[a] threw ninja stars at [b]', [5, 10], 'physical', True, 0, 0.1, 3],                               # 11
        ['nuclear death ray ', '[a] blasted [b] with high energy gamma rays', [150, 250], 'true', False, 0, 0, 1000],               # 12
        ['crossbow          ', '[a] shot [b] in the [body] with a crossbow', [20, 30], 'physical', False, 0, 0.1, 1],               # 13
        ['bow               ', '[a] fired an arrow at [b]', [15, 20], 'physical', True, 0, 0.2, 1],                                 # 14
        ['god sword         ', '[a] slashed [b] with a god sword', [300, 350], 'true', True, 0, 0, 1],                              # 15
        ['sniper rifle      ', '[a] shot [b] in the head with a sniper rifle', [100, 200], 'physical', False, 0, 0, 1],             # 16
        ['Ak-47             ', '[a] shot [b] repeatedly with an AK-47', [15, 30], 'physical', False, 0, 0.1, 5],                    # 17
        ['fire sword        ', '[a] slashed at [b] with his flaming sword', [20, 35], 'heat', True, 0.2, 0, 3],                     # 18
        ['plasma cannon     ', '[a] fired a ball of plasma at [b]', [250, 350], 'plasma', True, 0.001, 0.3, 1],                     # 19
        ['plasma incinerator', '[a] fired a beam of superheated plasma at [b]', [50, 100], 'plasma', True, 0, 0.1, 1],              # 20
        ['energy sword      ', '[a] slashed at [b] with his energy sword', [25, 60], 'plasma', True, 0.01, 0, 3],                   # 21
        ['frag cannon       ', '[a] fired frag grenades at his enemies dealing [dmg] damage', [15, 35], 'splash', True, 0, 0, 3],   # 22
        ['henry             ', '[a] utilises the power of the Henry Bird against [b]', [15, 25], 'physical', True, 0, 0, 1],        # 23
        ['nuker             ', '[a] nuked the room dealing [dmg] damage', [25000, 50000], 'splash', True, 0, 0, 1],                 # 24
        ['Ak-47             ', '[a] shot [b] repeatedly with an AK-47', [15, 30], 'physical', False, 0, 0.5, 3],                    # 25
        ['combat knife      ', '[a] slashed at [b] with a combat knife', [10, 15], 'physical', True, 0.2, 0.1, 2],                  # 26
        ['insult            ', 'Henry calls [b] a spedlord', [10, 25], 'mental', True, 0, 0, 1],                                    # 27
        ['insult2           ', 'Henry says that [b] is a sped', [0, 0], 'mental', True, 0, 0, 1],                                   # 28
        ['taunt             ', '[a] agravates [b] with some insults', [0, 0], 'mental', True, 0, 0, 1],                             # 29
        ['pickaxe           ', '[a] hit [b] with a pickaxe', [5, 7], 'physical', True, 0.25, 0, 3],                                 # 30
        ['rock throw        ', '[a] threw rocks at [b]', [1, 4], 'physical', True, 0.25, 0, 6],                                     # 31
        ['coin throw        ', '[a] threw coins at [b]', [3, 5], 'physical', True, 0.25, 0, 3],                                     # 32
        ['tie whip          ', '[a] whips [b] with a tie', [5, 15], 'physical', True, 0.5, 0, 2],                                   # 33
        ['sales pitch       ', '[a] drones on and on about his new marketing strategy, annoying [b]', [15, 30], 'mental', True, 0, 0, 1], # 34
        ['pitchfork         ', '[a] pokes [b] with a pitchfork', [10, 20], 'physical', True, 0.25, 0, 1],                           # 35
        ['torch             ', '[a] burns [b] with a torch', [5, 15], 'physical', True, 0, 0, 1],                                   # 36
        ['hoe               ', '[a] hits [b] with a hoe', [10, 15], 'physical', True, 0.25, 0, 1],                                  # 37
        ['bread             ', '[a] eats a loaf of bread', [25, 30], 'heal', True, 0, 0, 1],                                        # 38
        ['sales pitch2      ', '[a] tries to make [b] buy Maceline™ products, annoying [b]', [20, 35], 'mental', True, 0, 0, 1],    # 39
        ['lawyering         ', '[a] sues [b]', [15, 35], 'mental', True, 0, 0, 1],                                                  # 40
        ['lawyering 2       ', '[a] gets [b] into complicated legal trouble', [20, 30], 'mental', True, 0, 0, 1],                   # 41
        ['none              ', '[a] attacks [b] with a nonexistant weapon', [0, 1], 'mental', True, 0, 0, 1],                       # 42
        ['voodoo magic      ', '[a] does a cultist dance while trying to curse [b]', [0, 20], 'mental', True, 0, 0, 1],             # 43
        ['voodoo curse      ', '[a] chants an ancient curse at [b]', [5, 15], 'mental', True, 0, 0, 1],                             # 44
        ['voodoo medicine   ', '[a] drinks a jar of voodoo medicine', [50, 75], 'heal', True, 0, 0, 1],                             # 45
        ['stick             ', '[a] pokes [b] with a magical stick', [5, 15], 'physical', True, 0, 0, 1],                           # 46
        ['ground slam       ', '[a] slammed the ground dealing [dmg] damage to all ememies', [5, 15], 'splash', True, 0, 0, 3],     # 47
        ['repeated insults  ', '[a] insults [b] repeatedly', [5, 10], 'mental', True, 0, 0, 5],                                     # 48
        ['super punch       ', '[a] lands an extremely powerful punch on [b]', [10, 20], 'physical', True, 0.25, 0, 1],             # 49
        ['super kick        ', '[a] lands an extremely powerful kick on [b]', [12, 24], 'physical', True, 0.25, 0, 1],              # 50
        ['martial arts      ', '[a] uses kung - fu to pummel [b]', [2, 5], 'physical', True, 0.25, 0, 15],                          # 51
        ['henry heal power  ', '[a] uses a healing spell', [15, 50], 'heal', True, 0, 0, 1],                                        # 52
    ]
    global secondaries
    secondaries = [
        # ['Name [0]', 'description [1]', ['min damage [2][0]', 'max damage [2][1]'], 'damage type [3]', 'can be multiplied [4]', 'block chance [5]', 'miss chance [6]', 'piercing [7]'], ['amount [8]']
        ['pistol [q]        ', '[a] shot [b] repeatedly with a pistol', [4, 8], 'physical', False, 0.01, 0.2, 8, 4],                       # 0
        ['desert eagle [q]  ', '[a] shot [b] repeatedly with a desert eagle', [6, 11], 'physical', False, 0.01, 0.2, 6, 4],                # 1
        ['alien blaster [q] ', '[a] shot [b] repeatedly with an alien blaster', [15, 35], 'plasma', False, 0.01, 0.2, 3, 3],               # 2
        ['Dagger            ', '[a] slashed at [b] with a dagger', [5, 15], 'physical', True, 0.01, 0, 3, -1],                             # 3
        ['tazer [q]         ', '[a] shot [b] with a tazer', [10, 15], 'true', False, 0.2, 0.3, 1, 1],                                      # 4
        ['ninja star [q]    ', '[a] threw ninja stars at [b]', [5, 10], 'physical', True, 0, 0.1, 3, 3],                                   # 5
        ['frag grenade [q]  ', '[a] threw a frag grenade at his enemies dealing [dmg] damage', [35, 50], 'splash', False, 0, 0, 1, 2],     # 6
        ['fusion grenade [q]', '[a] threw a fusion grenade at his enemies dealing [dmg] damage', [350, 750], 'splash', False, 0, 0, 1, 1], # 7
        ['auto pistol [q]   ', '[a] shot [b] repeatedly with an auto pistol', [3, 5], 'physical', False, 0.01, 0.2, 15, 2],                # 8
        ['flamethrower [q]  ', '[a] burned his enemies with a flamethrower dealing [dmg] damage', [15, 25], 'splash', False, 0, 0, 1, 3],  # 9
        ['plasma pistol [q] ', '[a] shot [b] with a plasma pistol', [20, 40], 'plasma', False, 0, 0.2, 4, 3],                              # 10
        ['revolver [q]      ', '[a] shot [b] with a revolver', [5, 10], 'physical', False, 0, 0.1, 6, 5],                                  # 11
       ['laser pointer [q] ', '[a] beamed [b] with a laser pointer', [3, 10], 'true', False, 0, 0, 4, -1],                                # 12
        ['dynamite [q]      ', '[a] threw a stick of dynamite at [b]', [5, 15], 'splash', False, 0, 0, 1, 5],                              # 13
        ['combat knife      ', '[a] slashed at [b] with a combat knife', [10, 15], 'physical', True, 0.01, 0, 3, -1],                      # 14
    ]
    global auto_enemies
    auto_enemies = [
        # ['Name [0]', 'Health [1]', 'Damage Multiplier [2]', ['Attacks [3]'], ['Quotes [4]'], 'Last Words [5]', 'Quantity [6]', 'Can Die [7]', 'block chance [8]', ['Block description [9]'], [['physical armour [10][0][0]', 'durability [10][0][1]'], ['heat armour [10][1][0]', 'durability [10][1][1]'], ['mental armour [10][2][0]', 'durability [10][2][1]']]],
        ['Bodyguard', 30, 1.5, [1, 2, 5], ['I will defend henry with my life!', 'Death to the enemies of henry!', 'I shall protect henry!'], None, 3, True, 0, ['The attack is blocked by his baseball bat', 'The attack fails to penetrate his armour'], [[0, 0], [0, 0], [0, 0]]],
        ['Henry Priest', 10, 0.2, [3, 8, 9], ['Hail henry!', 'Praise henry!', 'For henry!', 'Protect henry', 'Defend henry'], 'My sacrifice shall protect henry', 10, True, 0, ['He flew out of the way, dodging the attack.'], [[0, 0], [0, 0], [0, 0]]],
        ['Henry\'s Servant', 5, 1, [0, 1], ['I will serve henry!', 'I am henry\'s servant!', 'You will die for henry!'], None, 1, True, 0, ['He flew out of the way, dodging the attack.'], [[0, 0], [0, 0], [0, 0]]],
        ['Ninja', 15, 0.5, [0, 1, 10, 11], ['Die!', 'Death to the enemies of henry'], None, 2, True, 0, ['The attack is blocked by his katana', 'The attack is deflected by his katana'], [[0, 0], [0, 0], [0, 0]]],
        ['Rat', 3, 0.1, [3], ['Squeak', 'Hiss'], None, 20, True, 0.2, ['misses'], [[0, 0], [0, 0], [0, 0]]],
        ['Henry Hologram', 1, 3, [9], ['I am henry!', 'You shall fear me!', 'Henry never dies!', 'I will not be defeated', 'I am superior!'], 'Henry never dies!', 1, False, 0.5, ['He flew out of the way, dodging the attack.', 'The attack is blocked by henry\'s power'], [[40, 100], [0, 0], [0, 0]]],
        ['Sped', 250, 0.1, [3], ['Grunt', 'Roar', 'Hmmm'], None, 1, True, 0, ['misses'], [[10, 100], [0, 0], [0, 0]]],
        ['Knight', 100, 1, [4], ['For henry!'], 'I die for henry', 1, True, 0, ['is blocked by his armour'], [[10, 100], [0, 0], [0, 0]]],
        ['Chinese Miner', 10, 1, [29, 30, 31], ['I mine China for Henry!', 'I am henry\'s income!', 'You will die for Henry!'], None, 1, True, 0, ['He flew out of the way, dodging the attack.'], [[0, 0], [0, 0], [0, 0]]],
        ['Henry Businessman', 15, 1, [32, 33, 34], ['I make money for henry!', 'I am henry\'s employee!', 'You will die for henry!', 'You shall buy Maceline™ products!'], None, 3, True, 0, ['He flew out of the way, dodging the attack.'], [[0, 0], [0, 0], [0, 0]]],
        ['Choyuni Farmer', 10, 0.5, [35, 36, 37], ['[inaudible muttering]', '[incomprehensible muttering]', '[confused screaming]'], None, 3, True, 0, ['He flew out of the way, dodging the attack.'], [[0, 0], [0, 0], [0, 0]]],
        ['Choyuni Brute', 50, 1, [0, 1, 2, 3, 31], ['[inaudible muttering]', '[incomprehensible muttering]', '[confused screaming]'], None, 2, True, 0, ['He flew out of the way, dodging the attack.'], [[0, 0], [0, 0], [0, 0]]],
        ['Choyuni Baker', 15, 0.5, [0, 1, 2, 3, 6, 38], ['[inaudible muttering]', '[incomprehensible muttering]', '[confused screaming]'], None, 1, True, 0, ['He flew out of the way, dodging the attack.'], [[0, 0], [0, 0], [0, 0]]],
        ['Henry Salesman', 15, 1, [34, 39], ['You shall buy Maceline™ products!', 'Maceline™ is superiour!', 'My marketing strategy is supreme!'], None, 3, True, 0, ['He flew out of the way, dodging the attack.'], [[0, 0], [0, 0], [0, 0]]],
        ['Witch Doctor', 20, 0.5, [43, 44, 45, 46], ['[inaudible chanting]', 'I will curse you!', 'Praise Henry!'], None, 1, True, 0, ['He flew out of the way, dodging the attack.'], [[0, 0], [0, 0], [0, 0]]],
        ['Henry Cultist', 5, 0.5, [0, 1, 2, 3], ['I serve Henry!', 'Hail Henry!', 'Praise Henry!', 'For Henry!'], None, 15, True, 0, ['He flew out of the way, dodging the attack.'], [[0, 0], [0, 0], [0, 0]]],
        ['Communist Henry', 1, 0.1, [0, 1, 2, 3], ['WE serve Henry!', 'For US!', 'Praise comrad Henry', 'For Communism!', 'Power to the workers of Henry!'], None, 25, True, 0, ['He flew out of the way, dodging the attack.'], [[0, 0], [0, 0], [0, 0]]],
    ]
    global harder_enemies
    harder_enemies = [
        # ['Name [0]', 'Health [1]', 'Damage Multiplier [2]', ['Attacks [3]'], ['Quotes [4]'], 'Last Words [5]', 'Quantity [6]', 'Can Die [7]', 'block chance [8]', ['Block description [9]'], [['physical armour [10][0][0]', 'durability [10][0][1]'], ['heat armour [10][1][0]', 'durability [10][1][1]'], ['mental armour [10][2][0]', 'durability [10][2][1]']]],
        ['Rat', 4, 0.1, [3], ['Squeak', 'Hiss'], None, 25, True, 0.2, ['misses'], [[0, 0], [0, 0], [0, 0]]],
        ['henry Hologram', 15, 4, [9], ['I am henry!', 'You shall fear me!', 'henry never dies!', 'I will not be defeated', 'I am superior!'], 'henry never dies!', 1, False, 0.5, ['He flew out of the way, dodging the attack.', 'The attack is blocked by henry\'s power'], [[50, 200], [0, 0], [0, 0]]],
        ['Sped', 300, 0.2, [3], ['Grunt', 'Roar', 'Hmmm'], None, 1, True, 0, ['He flew out of the way, dodging the attack.'], [[20, 100], [0, 0], [0, 0]]],
        ['Knight', 100, 1, [4], ['For henry!'], 'I die for henry', 1, True, 0, ['The attack is blocked by his armour'], [[10, 100], [0, 0], [0, 0]]],
        ['Spedlord', 500, 0.5, [0, 1, 2, 3], ['Grunt', 'Roar', 'Hmmm'], None, 1, True, 0.2, ['He flew out of the way, dodging the attack.'], [[5, 100], [0, 0], [0, 0]]],
        ['henry\'s Soldier', 100, 0.5, [25, 26], ['For henry!', 'We kill for henry', 'Death to the enemies of henry', 'We serve henry until our death', 'We are the army of henry'], 'We sacrifice our lives for henry', 1, True, 0.1, ['The attack is blocked by his armour'], [[0, 0], [0, 0], [0, 0]]],
        ['Chinese Miner', 10, 0.5, [29, 30, 31], ['I mine China for Henry!', 'I am henry\'s income!', 'You will die for Henry!'], None, 3, True, 0, ['He flew out of the way, dodging the attack.'], [[0, 0], [0, 0], [0, 0]]],
        ['Choyuni Farmer', 10, 0.5, [35, 36, 37], ['[inaudible muttering]', '[incomprehensible muttering]', '[confused screaming]'], None, 5, True, 0, ['He flew out of the way, dodging the attack.'], [[0, 0], [0, 0], [0, 0]]],
        ['Choyuni Baker', 15, 0.5, [0, 1, 2, 3, 6, 38], ['[inaudible muttering]', '[incomprehensible muttering]', '[confused screaming]'], None, 3, True, 0, ['He flew out of the way, dodging the attack.'], [[0, 0], [0, 0], [0, 0]]],
        ['Choyuni Lawyer', 50, 1, [40, 41, 33], ['[inaudible muttering]', '[incomprehensible muttering]', '[confused screaming]'], None, 1, True, 0, ['He flew out of the way, dodging the attack.'], [[0, 0], [0, 0], [0, 0]]],
        ['Henry Lawyer', 100, 1, [40, 41, 33], ['I will sue you!', 'I represent Maceline™!', 'You are illegal!'], None, 1, True, 0, ['He flew out of the way, dodging the attack.'], [[0, 0], [0, 0], [0, 0]]],
        ['Witch Doctor', 50, 1, [43, 44, 45, 46], ['[inaudible chanting]', '[I will curse you]', 'Praise Henry!'], None, 1, True, 0, ['He flew out of the way, dodging the attack.'], [[0, 0], [0, 0], [0, 0]]],
        ['Communist Henry', 1, 0.1, [0, 1, 2, 3], ['WE serve Henry!', 'For US!', 'Praise comrad Henry', 'For Communism!', 'Power to the workers of Henry!'], None, 50, True, 0, ['He flew out of the way, dodging the attack.'], [[0, 0], [0, 0], [0, 0]]],
    ]
    global mini_boss
    mini_boss = [
        # ['Name [0]', 'Health [1]', 'Damage Multiplier [2]', ['Attacks [3]'], ['Quotes [4]'], 'Last Words [5]', 'Quantity [6]', 'Can Die [7]', 'block chance [8]', ['Block description [9]'], [['physical armour [10][0][0]', 'durability [10][0][1]'], ['heat armour [10][1][0]', 'durability [10][1][1]'], ['mental armour [10][2][0]', 'durability [10][2][1]']]],
        ['Henry\'s elite soldier', 100, 1, [25, 26], ['For henry!', 'Death to the enemies of henry'], 'I sacrifice my life for henry', 1, True, 0.1, ['The attack is blocked by his armour'], [[10, 100], [0, 0], [0, 0]]],
        ['Spedlord Mace', 150, 1, [6, 7], ['Die Spedlords!', 'You can not defeat me', 'You shall die to me', 'I am the god of curry'], 'I will not die to you', 1, True, 0.1, ['The attack is blocked by his armour'], [[30, 100], [0, 0], [0, 0]]],
        ['Henry Hologram', 40, 3, [8, 9], ['I am henry!', 'You shall fear me!', 'henry never dies!', 'I will not be defeated', 'I am superior!'], 'henry never dies!', 1, False, 0.1, ['The attack misses', 'The attack is blocked by henry\'s power'], [[100, 500], [0, 0], [0, 0]]],
        ['Spedlord Mace', 150, 1, [6, 7], ['Die Spedlords!', 'You can not defeat me', 'You shall die to me', 'I am the god of curry'], 'I will not die to you', 1, True, 0.1, ['The attack is blocked by his armour'], [[30, 100], [0, 0], [0, 0]]],
        ['Smol henry', 100, 1, [4,23,27], ['I is henry!', 'you die now'], None, 1, True, 0.1, ['The attack is blocked by henry power'], [[30, 50], [0, 0], [0, 0]]],
        ['The village cheif', 100, 1, [31,35,36,37], ['I is village chief!', 'you die now', 'I win', 'For the Choyuni people!'], None, 1, True, 0.1, ['The attack is blocked by henry power'], [[30, 50], [0, 0], [0, 0]]],
    ]

def aaa():
    return 0

# Functions
def bar(num, lost, max_stat):
    cap = max_stat/100
    a = '▕'
    cnt = 0
    for x in range(int(num / (cap*5))):
        a += '█'
        cnt += 1
    if num % 5 >= (cap*3):
        a += '▓'
        cnt += 1
    elif num % 5 >= (cap*1):
        a += '▒'
        cnt += 1
    for x in range(int(lost / (cap*5))):
        if cnt == 20:
            break
        a += '░'
        cnt += 1
    if lost % 5 > 0 and cnt < 20:
        a += '░'
        cnt += 1
    if cnt > 20:
        print(f"Bar too full. num: {num}, lost: {lost}, cnt: {cnt}, cap: {cap}")
        # raise ERROR(f"Bar too full. num: {num}, lost: {lost}, cnt: {cnt}, cap: {cap}")
        cnt = 20
    else:
        for x in range(20 - cnt):
            a += ' '
    if (lost > 0):
        stat_lost = f'(-{lost})'
        a += f'▏{num} {stat_lost}'
        length = len(f'{num} {stat_lost}')
        if length < 10:
            for i in range(10 - length):
                a += ' '
    else:
        a += f'▏ '
        for i in range(10):
            a += ' '
    return a

def ask(question, answers):
    wrong = True
    while wrong:
        x = input(question)
        if x == 'QUIT':
            s.exit()
        elif answers == 'number':  # check if it is a number
            x.replace(' ', '')
            x.replace('+', '')
            if x.isdigit():
                return float(x)
            elif x.count('.') == 1:
                if x.replace('.', '').isdigit():
                    return float(x)

        else:
            for Y in range(len(answers)):  # Checks if answer is in a list
                z = answers[Y]
                if x == str(z):
                    return x
        clearConsole()
        print('Incorrect Input. Try again.')

def level(type, rewards=[r.randint(0,1), r.randint(0,1), r.randint(0,1)], enemies='auto', boss=False, special=None): # ¡
    global item
    if type == 'fight':
        if boss:
            print('Boss Music Starts')
            # t.sleep(0.5)
        if not fight(enemies):
            print(f'{player_name} defeats all the enemies in the room.')
            # t.sleep(1)
            if boss:
                print('Boss Music Stops')
            # t.sleep(1)
            print(f'{player_name} finds some ammo and items on the ground.')
            # t.sleep(1)
            print(f'A staircase to the next floor appears and {player_name} climbs to the next level.')
            # t.sleep(1)
            for i in range(3):
                item[i]+=rewards[i]
            item[5][1] += r.randint(0,2)
            return 0
        else:
            return 1

    elif type == 'loot':
        print(f'{player_name} see a large loot chest in the middle of the room. ')
        # t.sleep(2.5)
        print('There are many useful items in the chest')
        # t.sleep(2.5)
        print(f'{player_name} take the the items in the chest before he ascends to the next floor.')
        # t.sleep(2.5)
        if special:
            if special[0]:
                c = ask(f'''{r.choice(pos)}, there is also a {attacks[special[1]][0]}
Do you take it? [yes, no]''', ['yes', 'no'])
                if c == 'yes':
                    c = int(ask(f'Which weapon slot do you put it in? [1, 2]', [1, 2]))
                    c+=2
                    weapons[c] = special[1]
                    print(f"You take the {attacks[weapons[c]][0]}")
                    # t.sleep(2)
                else:
                    print(f"You leave the {attacks[special[1]][0]}")
                    # t.sleep(2)
            else:
                c = ask(f'''{r.choice(pos)}, there is a {secondaries[special[1]][0].replace('[q]', '')}
Do you take it? [yes, no]''', ['yes', 'no'])
                if c == 'yes':
                    weapons[2][0] = special[1]
                    weapons[2][1] = secondaries[special[1]][8]
                    print(f"You take the {secondaries[special[1]][0].replace('[q]', f'({item[5][1]})')}")
                    # t.sleep(2)
                else:
                    print(f"You leave the {secondaries[special[1]][0].replace('[q]', f'({item[5][1]})')}")
                    # t.sleep(2)
        print(f'You gain some valuable items that could help you defeat henry.')
        # t.sleep(3)
        for i in range(3):
            item[i]+=rewards[i]*2+1
        if item[5][0] != 3 and item[5][0] != 6 and item[5][0] != 7:
            item[5][1] += r.randint(1, 3)
        print(f'''
----------------------------------Inventory---------------------------------------------
Items:
  voodoo medicine ({item[0]})
  dried kelp ({item[1]})
  bottle of seawater ({item[2]})
Weapons:
  {attacks[weapons[0]][0]}
  {attacks[weapons[1]][0]}
Secondary:
  {secondaries[weapons[2][0]][0].replace('[q]', f'({weapons[2][1]})')}
----------------------------------------------------------------------------------------
''')
        print(f'''
--------------------------------------Player Stats--------------------------------------
Health {bar(stats[0], 0, max_stat)}   Mental Health {bar(stats[2], 0, max_stat)}

Hunger {bar(stats[1], 0, max_stat)}   Intelligence  {bar(stats[3], 0, max_stat)}
----------------------------------------------------------------------------------------
''')
        # t.sleep(8)
        return 0
    elif type == 'cutscene':
        for line in special:
            print(line)
            # t.sleep(1)
        return 0
    else:
        raise ERROR(f"Level type incorrect. '{type}' is not a valid type of level.")

def fight(enemies):
    global stats, mental_dmg
    global item
    global weapons
    if enemies == 'auto':
        enemy_template = r.choice(auto_enemies)
    else:
        enemy_template = enemies
    enemy_army = [['placeholder', 2147483647],['placeholder', 2147483647],['placeholder', 2147483647],['placeholder', 2147483647],['placeholder', 2147483647],['placeholder', 2147483647],['placeholder', 2147483647],['placeholder', 2147483647],['placeholder', 2147483647],['placeholder', 2147483647],['placeholder', 2147483647],['placeholder', 2147483647],['placeholder', 2147483647],['placeholder', 2147483647],['placeholder', 2147483647],['placeholder', 2147483647],['placeholder', 2147483647],['placeholder', 2147483647],['placeholder', 2147483647],['placeholder', 2147483647],['placeholder', 2147483647],['placeholder', 2147483647],['placeholder', 2147483647],['placeholder', 2147483647],['placeholder', 2147483647],]
    enemy_num = enemy_template[6]
    for x in range(enemy_num):
        enemy_army[x] = []
        for stat in enemy_template:
            enemy_army[x].append(stat)
    if enemy_template[6] > 1:
        a = 's'
    else:
        a = ''
    print(f'{player_name} is confronted by {enemy_template[6]} {enemy_template[0]}{a}.')
    # t.sleep(1)
    clearConsole()
    while 1:
        skip_enemy=False
        health = stats[0]
        hunger = stats[1]
        mental = stats[2]
        intelligence = stats[3]
        evasion = stats[4]
        accuracy = stats[5]
        # Player Turn
        global txt
        health_lost = 0
        hunger_lost = 2
        mental_lost = 0
        action = ask('''
---------------------What do you do do?-----------------------
  [1] Attack                [2] Item                [3] Talk
--------------------------------------------------------------
''', [1, 2, 3])
        clearConsole()
        action = int(action)
        if action == 1:
            action = ask('''
------------------------Which Attack?-------------------------
[1] Punch   [2] Kick   [3] Head but   [4] Bite   [5] Weapon
--------------------------------------------------------------
''', [1, 2, 3, 4, 5])
            clearConsole()
            action = int(action)
            attack = None
            if action != 5:
                attack = attacks[action - 1]
            else:
                while 1:
                    action = ask(f'''
------------------------Which Weapon?-------------------------
[1] {attacks[weapons[0]][0]} [2] {attacks[weapons[1]][0]} [3] {secondaries[weapons[2][0]][0].replace('[q]', f'({weapons[2][1]})')}
--------------------------------------------------------------
''', [1, 2, 3])
                    if int(action) == 3 and weapons[2][1] > 0:
                        weapons[2][1] -= 1
                        attack = secondaries[weapons[2][0]]
                        break
                    elif int(action) != 3:
                        attack = attacks[weapons[int(action) + 2]]
                        break
                    print('Secondary has no ammo. Use another Weapon.')
            if enemy_army[0][0] == 'henry Hologram':
                print('The attack passed through the hologram doing 0 damage')
            else:
                min_attacks = int(attack[7]/2)
                if min_attacks < 1:
                    min_attacks = 1
                for x in range(r.randint(min_attacks, attack[7])):
                    if r.randint(0, 100) / 100 + accuracy > attack[6]:
                        if r.randint(0, 100) / 100 > enemy_army[0][8] * attack[5] or enemy_army[0][8] == 0:
                            dmg = r.randint(attack[2][0], attack[2][1])
                            if attack[3] == 'physical':
                                if enemy_army[0][10][0][1] > 0:
                                    if enemy_army[0][10][0][1] > 0:
                                        enemy_army[0][10][0][1] -= dmg
                                    if enemy_army[0][10][0][1] > 0:
                                        dmg = dmg - enemy_army[0][10][0][0]
                                        if dmg < 0:
                                            dmg = 0
                                    else:
                                        print(f'{enemy_army[0][0]}\'s armour is broken by the attack.')
                            elif attack[3] == 'true' or attack[3] == 'magic':
                                pass
                            elif attack[3] == 'heat':
                                if enemy_army[0][10][1][1] > 0:
                                    if enemy_army[0][10][1][1] > 0:
                                        enemy_army[0][10][1][1] -= dmg
                                    if enemy_army[0][10][1][1] > 0:
                                        dmg = dmg - enemy_army[0][10][1][0]
                                        if dmg < 0:
                                            dmg = 0
                                    else:
                                        print(f'{enemy_army[0][0]}\'s armour is broken by the attack.')
                            elif attack[3] == 'plasma':
                               if enemy_army[0][10][1][1] > 0:
                                    if enemy_army[0][10][1][1] > 0:
                                        enemy_army[0][10][1][1] -= dmg*2
                                    if enemy_army[0][10][1][1] > 0:
                                        dmg = dmg - enemy_army[0][10][1][0]/2
                                        if dmg < 0:
                                            dmg = 0
                                    else:
                                        print(f'{enemy_army[0][0]}\'s armour is broken by the attack.')
                            elif attack[3] == 'mental':
                                if enemy_army[0][10][2][1] > 0:
                                    if enemy_army[0][10][2][1] > 0:
                                        enemy_army[0][10][2][1] -= dmg
                                    if enemy_army[0][10][2][1] > 0:
                                        dmg = dmg - enemy_army[0][10][2][0]
                                        if dmg < 0:
                                            dmg = 0
                                    else:
                                        print(f'{enemy_army[0][0]}\'s willpower crumbles.')
                            if attack[3] == 'splash':
                                dmg = r.randint(attack[2][0], attack[2][1])
                                txt = attack[1].replace('[a]', player_name)
                                txt = txt.replace('[dmg]', str(dmg))
                                print(txt)
                                for enemy in enemy_army:
                                    if enemy[1] != 2147483647:
                                        enemy[1] -= dmg
                                        if enemy[1] <= 0:
                                            if enemy[5] is None:
                                                death_message = deaths[2]
                                            else:
                                                death_message = r.choice(deaths)
                                                death_message = death_message.replace('[lastwords]', enemy[5])
                                            death_message = death_message.replace('[a]', enemy[0])
                                            print(death_message)
                                            # t.sleep(1.5)
                                        elif enemy[1] < 10:
                                            print(f'{enemy[0]} is severely injured.')
                                            # t.sleep(1.5)
                                for enemy in enemy_army:
                                    if enemy[1] <= 0:
                                        enemy_army = []
                                enemy_army = [x for x in enemy_army if x]
                            else:
                                enemy_army[0][1] -= dmg
                                txt = attack[1].replace('[a]', player_name)
                                txt = txt.replace('[b]', enemy_army[0][0])
                                txt = txt.replace('[body]', r.choice(body))
                                print(f'{txt} doing {dmg} damage.')
                                if dmg == 0:
                                    print(f'The attack is blocked by {enemy_army[0][0]}\'s armour.')
                                # t.sleep(1.5)
                                if enemy_army[0][1] <= 0:
                                    if enemy_army[0][5] is None:
                                        death_message = deaths[2]
                                    else:
                                        death_message = r.choice(deaths)
                                        death_message = death_message.replace('[lastwords]', enemy_army[0][5])
                                   death_message = death_message.replace('[a]', enemy_army[0][0])
                                    enemy_army.pop(0)
                                    print(death_message)
                                    # t.sleep(1.5)
                                elif enemy_army[0][1] < 10:
                                    print(f'{enemy_army[0][0]} is severely injured.')
                                    # t.sleep(1.5)
                        else:
                            print(f'{r.choice(enemy_army[0][9])}')
                            # t.sleep(1.5)
                    else:
                        print(f'The attack misses.')
                        # t.sleep(1.5)
                    clearConsole()
                    if enemy_army == [] or enemy_army[0][1] == 2147483647:
                        stats[0] = health
                        stats[1] = hunger
                        stats[2] = mental
                        stats[3] = intelligence
                        stats[4] = evasion
                        stats[5] = accuracy
                        return 0
        elif action == 2:
            action = ask(f'''
------------------------Which Item?-------------------------
[1] voodoo medicine({item[0]})  [2] dried kelp({item[1]})  [3] bottle of seawater({item[2]})
------------------------------------------------------------
''', [1, 2, 3])
            clearConsole()
            action = int(action)
            if action == 1:
                if item[0] > 0:
                    item[0] -= 1
                    health += r.randint(50, 75)
                    print(f'{player_name} drinks a voodoo medicine.')
                    # t.sleep(1)
                    clearConsole()
            elif action == 2:
                if item[1] > 0:
                    item[1] -= 1
                    health += r.randint(10, 15)
                    hunger += r.randint(40, 80)
                    mental += r.randint(0, 15)
                    print(f'{player_name} eats a delicious dried kelp.')
                    # t.sleep(1)
                    clearConsole()
                    if hunger >= 130:
                        print(f'The dried kelp makes {player_name} fat.')
                        # t.sleep(1)
                        clearConsole()
                        evasion -= 10
                    elif hunger >= 100:
                        print(f'The dried kelp makes {player_name} feel full.')
                        # t.sleep(1)
                        clearConsole()
            else:
                if item[2] > 0:
                    item[2] -= 1
                    hunger += r.randint(5, 15)
                    mental += r.randint(15, 25)
                    print(f'{player_name} drank a bottle of seawater.')
                    # t.sleep(1)
                    clearConsole()
                    if hunger >= 130:
                        print(f'The bottle of seawater makes {player_name} fat.')
                        # t.sleep(1)
                        clearConsole()
                        evasion -= 10
                    elif hunger >= 100:
                        print(f'The bottle of seawater makes {player_name} feel full.')
                        # t.sleep(1)
                        clearConsole()
        else:
            action = ask('''
---------------------What do you say?-----------------------
       [1] Insult                      [2] Compliment
------------------------------------------------------------
''', [1, 2])
            action = int(action)
            if action == 1:
                insult = r.choice(insults)
                print(f'{player_name}: {insult}')
                print(f'{enemy_army[0][0]} is very angry.')
                # t.sleep(2)
                clearConsole()
                mental += r.randint(10, 35)
                mental_dmg = 10
                enemy_army[0][1] -= mental_dmg
                enemy_army[0][2] += 0.3
                enemy_army[0][8] -= 0.2
                if enemy_army[0][8] < 0:
                    enemy_army[0][8] = 0
                if enemy_army[0][1] <= 0:
                    if enemy_army[0][5] is None:
                        death_message = deaths[2]
                    else:
                        death_message = r.choice(deaths)
                        death_message = death_message.replace('[lastwords]', enemy_army[0][5])
                    death_message = death_message.replace('[a]', enemy_army[0][0])
                    enemy_army.pop(0)
                    print(death_message)
                    # t.sleep(1.5)
                elif enemy_army[0][1] < 10:
                    print(f'{enemy_army[0][0]} is severely injured.')
                    # t.sleep(1.5)
                if enemy_army == [] or enemy_army[0][1] == 2147483647:
                    stats[0] = health
                    stats[1] = hunger
                    stats[2] = mental
                    stats[3] = intelligence
                    stats[4] = evasion
                    stats[5] = accuracy
                    return 0
               
            else:
                compliment = r.choice(compliments)
                print(f'{player_name}: {compliment}')
                print(f'{enemy_army[0][0]} is feeling good.')
                # t.sleep(2)
                skip_enemy=True

        # Enemy turn
        if skip_enemy==False:
            for attacker in enemy_army:
                if attacker[1] != 2147483647 and attacker[0] != 'placeholder':
                    attack = attacks[r.choice(attacker[3])]
                    for x in range(r.randint(1, attack[7])):
                        if r.randint(0, 100) / 100 > evasion / 100 * attack[6]:
                            if r.randint(0, 100) / 100 > attack[5]:
                                dmg = int(r.randint(attack[2][0], attack[2][1])*attacker[2])
                                if attack[3] == 'heal':
                                    attacker[1] += dmg
                                    txt = attack[1].replace('[b]', player_name)
                                    txt = txt.replace('[a]', attacker[0])
                                    txt = txt.replace('[body]', r.choice(body))
                                    print(f'{attacker[0]}: {r.choice(attacker[4])}')
                                    # t.sleep(1.5)
                                    print(f'{txt} healing {dmg} health.')
                                    # t.sleep(1.5)
                                else:
                                    if attack[3] != 'mental':
                                        if dmg <= 0:
                                            dmg = 1
                                        health -= dmg
                                        mental_dmg = int(dmg/3)
                                        if mental_dmg <= 0:
                                            mental_dmg = 1
                                        mental -= mental_dmg
                                        mental_lost += mental_dmg
                                        health_lost += dmg
                                    else:
                                        mental_dmg = dmg
                                        if mental_dmg <= 0:
                                            mental_dmg = 1
                                        mental -= mental_dmg
                                        mental_lost += mental_dmg
                                    txt = attack[1].replace('[b]', player_name)
                                    txt = txt.replace('[a]', attacker[0])
                                    txt = txt.replace('[body]', r.choice(body))
                                    print(f'{attacker[0]}: {r.choice(attacker[4])}')
                                    # t.sleep(1.5)
                                    print(f'{txt} doing {dmg} damage.')
                                    # t.sleep(1.5)
                            else:
                                txt = attack[1].replace('[b]', player_name)
                                txt = txt.replace('[a]', attacker[0])
                                txt = txt.replace('[body]', r.choice(body))
                                print(f'{attacker[0]}: {r.choice(attacker[4])}')
                                # t.sleep(1.5)
                                print(f'{txt} but {player_name} flew out of the way')
                                # t.sleep(1.5)
                        else:
                            txt = attack[1].replace('[b]', player_name)
                            txt = txt.replace('[a]', attacker[0])
                            txt = txt.replace('[body]', r.choice(body))
                            print(f'{attacker[0]}: {r.choice(attacker[4])}')
                            # t.sleep(1.5)
                            print(f'{txt} but {player_name} flew out of the way.')
                            # t.sleep(1.5)
        # t.sleep(2)
        clearConsole()
        # Calculations
        hunger -= 1
        if hunger > max_stat > health:
            health += int((hunger - max_stat) / 1.5)
            hunger = max_stat
        if health < max_stat and hunger > 0:
            missing_health = max_stat - health
            if missing_health > 10:
                missing_health = 10
            hunger_lost += missing_health * 2
            if hunger - hunger_lost > 30:
                hunger -= hunger_lost
                health += missing_health
                health_lost -= missing_health
            else:
                hunger_lost = 0
        if hunger < 0:
            health -= hunger
            mental_lost += 5
            mental -= 5
            hunger = 0
        if mental < 0:
            health += mental
            mental = 0
        if health > max_stat:
            health = max_stat
        elif health <= 0:
            print(f'{player_name} died.')
            return 1
        if mental > max_stat:
            mental = max_stat
        if hunger > max_stat:
            hunger = max_stat
        # Player stats
        stats[0] = health
        stats[1] = hunger
        stats[2] = mental
        stats[3] = intelligence
        stats[4] = evasion
        stats[5] = accuracy
        print(f'''
----------------------------------Player Stats----------------------------------
Health {bar(stats[0], health_lost, max_stat)}   Mental Health {bar(stats[2], mental_lost, max_stat)}

Hunger {bar(stats[1], hunger_lost, max_stat)}    Intelligence  {bar(stats[3], 0, max_stat)}
--------------------------------------------------------------------------------
''')
        # t.sleep(1.5)
        clearConsole()
        print(f'''
----------------------------------Player Stats----------------------------------
Health {bar(stats[0], 0, max_stat)}   Mental Health {bar(stats[2], 0, max_stat)}

Hunger {bar(stats[1], 0, max_stat)}   Intelligence  {bar(stats[3], 0, max_stat)}
--------------------------------------------------------------------------------
''')
        # t.sleep(2)
        clearConsole()

def game(levels = 40, room_list = []):
    if room_list == []:
        for l in range(levels):
            if l == levels-1:
                room = 'henry'
            elif l == levels//2:
                room = 'spedlord henry'
            elif l == int(levels*(1/5)) or l == int(levels*(2/5)) or l == int(levels*(3/5)) or l == int(levels*(4/5)):
                room = 'miniboss'
            elif l == 0 or l == 5:
                room = 'weapon'
            elif l%10 == 0:
                a = r.randint(0,4)
                if a:
                    room = 'weapon'
                else:
                    room = 'god loot'
            else:
                a = r.randint(0,4)
                if a:
                    if l < levels/2:
                        room = 'fight'
                    else:
                        room = 'harder fight'
                else:
                    a = r.randint(0,4)
                    if a:
                        room = 'loot'
                    else:
                        room = 'weapon'
            room_list.append(room)
    for room in room_list:
        if room == 'henry':
            if level('fight', enemies=['henry', 750, 4, [0,1,8,23,27,48,49,50,51,52], ['Die Spedlords!', 'You can not defeat me', 'You shall die to me', 'I am the henry'], 'I will not die to you', 1, True, 4, ['The attack is blocked by henry\'s power'], [[25, 300], [0, 0], [0, 0]]], boss=True):
                return 1
            else:
                return 0

        elif room == 'spedlord henry':
            if level('fight', enemies=['Spedlord henry', 250, 3, [0,1,2,3], ['Die Spedlords!', 'You can not defeat me', 'You shall die to me', 'I am the henry'], 'I will not die to you', 1, True, 4, ['The attack is blocked by henry power'], [[0, 0], [0, 0], [0, 0]]], boss=True):
                return 1

        elif room == 'miniboss':
            if level('fight', rewards=[r.randint(0,1), r.randint(1,2), r.randint(1,2)], enemies=r.choice(mini_boss), boss=True):
                return 1

        elif room == 'harder fight':
            if level('fight', enemies=r.choice(harder_enemies)):
                return 1

        elif room == 'fight':
            if level('fight'):
                return 1

        elif room == 'weapon':
            if level('loot', rewards=[r.randint(1,3), r.randint(2,4), r.randint(1,5)], special=r.choice(auto_loot)):
                return 1

        elif room == 'loot':
            if level('loot', rewards=[r.randint(0,1), r.randint(1,2), r.randint(0,3)]):
                return 1

        elif room == 'god loot':
            if level('loot', rewards=[r.randint(1,3), r.randint(2,4), r.randint(1,5)], special=r.choice(god_loot)):
                return 1

def chooseCharacter(characters='all'):
    if characters == 'all':
        choices = [
            # name, stat capacity, starting hp, starting hunger, starting intelligence, damage multiplier, starting weapons, description
            ['Spedry', 'Spedry is a difficult character to play as. Sperdy has reduced health and damage due to his sped characteristics.', 90, 90, 90, 90, 0.75, [42, 42]],
            ['Mace', 'Mace is the default character.', 150, 150, 150, 150, 1, [42, 42]],
            ['Widjaja', 'Widjaja has high damage but low health. ', 100, 100, 100, 100, 3, [42, 42]],
            ['Taj', 'Taj is a tanky character.',  300, 300, 300, 10,  1, [42, 42]],
            ['Taj the Terrorist', 'Terrorist Taj is a blatant cheater who is incredibly OP.', 500, 500, 500, 100, 3, [42, 42]],
            ['The Yu that flew', 'Yu will be the choice you make - Yu', 0, 0, 0, 0, 0, [42, 42]]
        ]
        print('Pick your character:')
        i=0
        for character in choices:
            print(f'[{i}] Name: {character[0]}  Description: {character[1]}')
            i+=1
        return ask(': ', [0,1,2,3,4])

def main(levels=-1, room_list = []):
    character = chooseCharacter()
    resetVariables(character)
    if levels != -1:
        if game(levels):
            print('you died')
            return 1
        else:
            print('you win')
            return 0
    else:
        if game(room_list=room_list):
            print('you died')
            return 1
        else:
            print('you win')
            return 0
# Main Game
#main(levels = 40)
resetVariables()
game(40)
'''
Block

[weapon description] but the attack [block description]





▕█████▓▓▓▓▒▒▒▒▒░░░░░▏

Health system (same for other stats)
█ = 5 hp
▓ = 3 hp
▒ = 1 hp
  = 0 hp
░ = lost hp this round

Bar full (20×5=100)
▕████████████████████▏
▕███████████████████░▏
'''
