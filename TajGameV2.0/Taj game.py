#
# --------------------------------------- Taj fight ---------------------------------------
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
from platform   import system as system_name  # Returns the system/OS name
from subprocess import call   as system_call  # Execute a shell command
def clearConsole():
    # how to do this, I don't know
    return

def resetVariables():
    global player_name; player_name = 'Henry'
    global txt; txt = ''
    global stats; stats = [100, 100, 100, 100, 15, 15]  # Health, Hunger, Mental Health, Intelligence, Evasion, Accuracy11
    global player_armour; player_armour = 10 # player only has physical armour
    global item; item = [4, 11, 12, 18, 14, [10, 12]]  # Health pot [0] , curry [1] , dino nuggets [2], main weapon [3], main weapon [4], secondary weapon [5][0], secondary ammo [5][1]
    global insults; insults = ['You smell bad.', 'You are stupid.', 'u moron', 'ur trash.', 'LMAO ur bad.', 'LMAO noob.', 'Imagine being you.', 'ur mum fat.', 'you spedlord', 'imagine being sped', 'ur mom fatter than taj']
    global compliments; compliments = ['You look good.', 'You are smart.', 'You are cool.']
    global body; body = ['head', 'arm', 'leg', 'chest']
    global deaths; deaths = ['"[lastwords]" shouts [a] as his lifeless body falls onto the floor.', '[a] falls onto the ground, dead.', '[a] falls onto the ground, dead.']
    global auto_loot; auto_loot = [[1, 5], [1, 10], [1, 11], [1, 13], [1, 17], [1, 18], [0, r.randint(0, 10)], [0, r.randint(0, 10)], [0, r.randint(0, 10)], [0, r.randint(0, 10)], [0, r.randint(0, 10)], [0, r.randint(0, 10)], [0, r.randint(0, 10)], [0, r.randint(0, 10)]]
    global pos; pos = ['On a shelf', 'On the floor', 'In a box']
    global attacks
    attacks = [
        # ['Name [0]', 'description [1]', ['min damage [2][0]', 'max damage [2][1]'], 'damage type [3]', 'can be multiplied [4]', 'block chance [5]', 'miss chance [6]', 'piercing [7]'],
        ['punch             ', '[a] punched [b] in the [body]', [3, 7], 'physical', True, 0.25, 0, 1],                              # 0
        ['kick              ', '[a] kicked [b] in the [body]', [5, 8], 'physical', True, 0.5, 0.1, 2],                              # 1
        ['head but          ', '[a] head butted [b]', [2, 6], 'physical', False, 0.1, 0.1, 1],                                      # 2
        ['bite              ', '[a] bit [b]', [5, 9], 'physical', True, 0.75, 0.01, 1],                                             # 3
        ['sword             ', '[a] slashed at [b] with his sword', [12, 35], 'physical', True, 0.2, 0, 3],                         # 4
        ['baseball bat      ', '[a] hit [b] on the [body] with his baseball bat', [4, 15], 'physical', True, 0.2, 0.2, 1],          # 5
        ['flaming curry     ', '[a] splashed [b] with burning curry', [2, 20], 'heat', True, 0.1, 0.1, 3],                          # 6
        ['curry splash      ', 'A tsunami of curry hit [b]', [7, 15], 'physical', True, 0.001, 0, 5],                               # 7
        ['magic beam emitter', '[a] shot a magical beam at [b]', [1, 20], 'magic', True, 0.01, 0.3, 1],                             # 8
        ['taj bible         ', '[a] prayed for taj to attack [b]', [1, 5], 'mental', False, 0, 0, 1],                               # 9
        ['katana            ', '[a] slashed at [b] with his katana', [5, 15], 'physical', True, 0.01, 0.1, 5],                      # 10
        ['ninja star        ', '[a] threw ninja stars at [b]', [5, 10], 'physical', True, 0, 0.1, 3],                               # 11
        ['nuclear death ray ', '[a] blasted [b] with high energy gamma rays', [1500, 2500], 'true', False, 0, 0, 1000],             # 12
        ['crossbow          ', '[a] shot [b] in the [body] with a crossbow', [20, 30], 'physical', False, 0, 0.1, 1],               # 13
        ['bow               ', '[a] fired an arrow at [b]', [15, 20], 'physical', True, 0, 0.2, 1],                                 # 14
        ['god sword         ', '[a] slashed [b] with a god sword', [1000, 2000], 'true', True, 0, 0, 1000],                         # 15
        ['sniper rifle      ', '[a] shot [b] in the head with a sniper rifle', [5000, 10000], 'physical', False, 0, 0, 1],          # 16
        ['Ak-47             ', '[a] shot [b] repeatedly with an AK-47', [15, 30], 'physical', False, 0, 0.1, 15],                   # 17
        ['fire sword        ', '[a] slashed at [b] with his flaming sword', [20, 35], 'heat', True, 0.2, 0, 3],                     # 18
        ['plasma cannon     ', '[a] fired a ball of plasma at [b]', [250, 350], 'plasma', True, 0.001, 0.3, 1],                     # 19
        ['plasma incinerator', '[a] fired a beam of superheated plasma at [b]', [50, 100], 'plasma', True, 0.001, 0.1, 1],          # 20
        ['energy sword      ', '[a] slashed at [b] with his energy sword', [150, 350], 'plasma', True, 0.01, 0, 3],                 # 21
        ['frag cannon       ', '[a] fired frag grenades at his enemies dealing [dmg] damage', [40, 65], 'splash', True, 0, 0, 1],   # 22
        ['macbook taj       ', '[a] utilises the power of taj\'s macbook against [b]', [10, 100], 'mental', True, 0, 0, 3],         # 23
        ['nuker             ', '[a] nuked the room dealing [dmg] damage', [25000, 50000], 'splash', True, 0, 0, 1],                 # 24

    ]
    global secondaries
    secondaries = [
        # ['Name [0]', 'description [1]', ['min damage [2][0]', 'max damage [2][1]'], 'damage type [3]', 'can be multiplied [4]', 'block chance [5]', 'miss chance [6]', 'piercing [7]'], ['amount [8]']
        ['pistol [q]        ', '[a] shot [b] repeatedly with a pistol', [4, 8], 'physical', False, 0.01, 0.2, 8, 8],                       # 0
        ['desert eagle [q]  ', '[a] shot [b] repeatedly with a desert eagle', [6, 11], 'physical', False, 0.01, 0.2, 6, 8],                # 1
        ['alien blaster [q] ', '[a] shot [b] repeatedly with an alien blaster', [15, 35], 'plasma', False, 0.01, 0.2, 3, 5],               # 2
        ['Dagger [q]        ', '[a] slashed at [b] with a dagger', [5, 15], 'physical', True, 0.01, 0, 3, -1],                             # 3
        ['tazer [q]         ', '[a] shot [b] with a tazer', [10, 15], 'true', False, 0.2, 0.3, 1, 3],                                      # 4
        ['ninja star [q]    ', '[a] threw ninja stars at [b]', [5, 10], 'physical', True, 0, 0.1, 3, 5],                                   # 5
        ['frag grenade [q]  ', '[a] threw a frag grenade at his enemies dealing [dmg] damage', [35, 50], 'splash', False, 0, 0, 1, 3],     # 6
        ['fusion grenade [q]', '[a] threw a fusion grenade at his enemies dealing [dmg] damage', [350, 750], 'splash', False, 0, 0, 1, 1], # 7
        ['auto pistol [q]   ', '[a] shot [b] repeatedly with an auto pistol', [3, 5], 'physical', False, 0.01, 0.2, 15, 4],                # 8
        ['flamethrower [q]  ', '[a] burned his enemies with a flamethrower dealing [dmg] damage', [15, 25], 'splash', False, 0, 0, 1, 5],  # 9
        ['plasma pistol [q] ', '[a] shot [b] with a plasma pistol', [20, 40], 'plasma', False, 0, 0.2, 4, 5],                              # 10
    ]
    global auto_enemies
    auto_enemies = [
        # ['Name [0]', 'Health [1]', 'Damage Multiplier [2]', ['Attacks [3]'], ['Quotes [4]'], 'Last Words [5]', 'Quantity [6]', 'Can Die [7]', 'block chance [8]', ['Block description [9]'], [['physical armour [10][0][0]', 'durability [10][0][1]'], ['heat armour [10][1][0]', 'durability [10][1][1]'], ['mental armour [10][2][0]', 'durability [10][2][1]']]],
        ['Bodyguard', 30, 1.5, [1, 2, 5], ['I will defend taj with my life!', 'Death to the enemies of taj!', 'I shall protect taj!'], None, 3, True, 0.3, ['is blocked by his baseball bat', 'fails to penetrate his armour'], [[0, 0], [0, 0], [0, 0]]],
        ['taj Priest', 10, 0.2, [3, 8, 9], ['Hail taj!', 'Praise taj!', 'For taj!', 'Protect taj', 'Defend taj'], 'My sacrifice shall protect taj', 10, True, 0, ['misses'], [[0, 0], [0, 0], [0, 0]]],
        ['taj\'s Servant', 5, 1, [0, 1], ['I will serve taj!', 'I am taj\'s servant!', 'You will die for taj!'], None, 1, True, 0, ['misses'], [[0, 0], [0, 0], [0, 0]]],
        ['Ninja', 15, 0.5, [0, 1, 10, 11], ['Die!', 'Death to the enemies of taj'], None, 2, True, 4, ['is blocked by his katana', 'is deflected by his katana'], [[0, 0], [0, 0], [0, 0]]],
        ['Rat', 3, 0.1, [3], ['Squeak', 'Hiss'], None, 20, True, 0.2, ['misses'], [[0, 0], [0, 0], [0, 0]]],
        ['taj Hologram', 100, 5, [9], ['I am taj!', 'You shall fear me!', 'taj never dies!', 'I will not be defeated', 'I am superior!'], 'taj never dies!', 1, False, 0.5, ['misses', 'is blocked by taj\'s power'], [[0, 0], [0, 0], [0, 0]]],
        ['Sped', 250, 0.1, [3], ['Grunt', 'Roar', 'Hmmm'], None, 1, True, 0, ['misses'], [[10, 100], [0, 0], [0, 0]]],
        ['Knight', 30, 1, [4], ['For taj!'], None, 1, True, 0, ['is blocked by his armour'], [[10, 100], [0, 0], [0, 0]]],
    ]

def aaa():
    return 0

# Functions
def bar(num, lost):
    a = '▕'
    cnt = 0
    for x in range(int(num / 5)):
        a += '█'
        cnt += 1
    if num % 5 >= 3:
        a += '▓'
        cnt += 1
    elif num % 5 >= 1:
        a += '▒'
        cnt += 1
    for x in range(int(lost / 5)):
        if cnt == 20:
            break
        a += '░'
        cnt += 1
    if lost % 5 > 0 and cnt < 20:
        a += '░'
        cnt += 1
    if cnt > 20:
        raise ERROR(f"Bar too full. num: {num}, lost: {lost}, cnt: {cnt}")
    else:
        for x in range(20 - cnt):
            a += ' '
    a += f'▏'
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

def level(type, rewards=[[0, r.randint(0,1)], [1,r.randint(0,1)], [2,r.randint(0,2)]], enemies='auto', boss=False, special=None):
    global item
    if type == 'fight':
        #if boss:
            #play_boss_music()  # idk how
        if not fight(enemies):
            print(f'{player_name} defeats all the enemies in the room.')
            t.sleep(1)
            print(f'{player_name} finds some ammo and items on the ground.')
            t.sleep(1)
            print(f'A staircase to the next floor appears and {player_name} climbs to the next level.')
            t.sleep(1)
            for i in rewards:
                item[i[0]]+=i[1]
            item[5][1] += r.randint(0,2)
    elif type == 'loot':
        print(f'{player_name} see a large loot chest in the middle of the room. ')
        t.sleep(2.5)
        print('There are many useful items in the chest')
        t.sleep(2.5)
        print(f'{player_name} take the the items in the chest before he ascends to the next floor.')
        t.sleep(2.5)
        if special:
            if special[0]:
                c = ask(f'''{r.choice(pos)}, there is also a {attacks[special[1]][0]}
Do you take it? [yes, no]''', ['yes', 'no'])
                if c == 'yes':
                    c = int(ask(f'Which weapon slot do you put it in? [1, 2]', [1, 2]))
                    item[c+2] = special[1]
                    print(f"You take the {attacks[special[1]][0].replace('[q]', f'({item[5][1]})')}")
                    t.sleep(2)
                else:
                    print(f"You leave the {attacks[special[1]][0].replace('[q]', f'({item[5][1]})')}")
                    t.sleep(2)
            else:
                c = ask(f'''{r.choice(pos)}, there is a {secondaries[special[1]][0].replace('[q]', '')}
Do you take it? [yes, no]''', ['yes', 'no'])
                if c == 'yes':
                    item[5][0] = special[1]
                    item[5][1] = secondaries[special[1]][8]
                    print(f"You take the {secondaries[special[1]][0].replace('[q]', f'({item[5][1]})')}")
                    t.sleep(2)
                else:
                    print(f"You leave the {secondaries[special[1]][0].replace('[q]', f'({item[5][1]})')}")
                    t.sleep(2)
        print(f'You gain some valuable items that could help you defeat taj.')
        t.sleep(3)
        for i in rewards:
            item[i[0]] += i[1]*2+1
        if item[5][0] != 3 and item[5][0] != 6 and item[5][0] != 7:
            item[5][1] += r.randint(1, 3)
        print(f'''
--------------------------Inventory---------------------------------------------
Items:
  Health Potion({item[0]})
  Curry({item[1]})
  dino nuggets({item[2]})
Weapons:
  {attacks[item[3]][0]}
  {attacks[item[4]][0]}
Secondary:
  {secondaries[item[5][0]][0].replace('[q]', f'({item[5][1]})')}
--------------------------------------------------------------------------------
''')
        print(f'''
----------------------------------Player Stats----------------------------------
 Health {bar(stats[0], 0)}   Mental Health {bar(stats[2], 0)}

 Hunger {bar(stats[1], 0)}   Intelligence  {bar(stats[3], 0)}
--------------------------------------------------------------------------------
''')
        t.sleep(8)
    elif type == 'cutscene':
        for line in special:
            print(line)
            t.sleep(1)
    else:
        raise ERROR(f"Level type incorrect. '{type}' is not a valid type of level.")

def fight(enemies):
    global stats, mental_dmg
    global item
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
    t.sleep(1)
    clearConsole()
    while 1:
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
            if action != 5:
                attack = attacks[action - 1]
            else:
                while 1:
                    action = ask(f'''
------------------------Which Weapon?-------------------------
[1] {attacks[item[3]][0]} [2] {attacks[item[4]][0]} [3] {secondaries[item[5][0]][0].replace('[q]', f'({item[5][1]})')}
--------------------------------------------------------------
''', [1, 2, 3])
                    if int(action) == 3 and item[5][1] > 0:
                        item[5][1] -= 1
                        attack = secondaries[item[5][0]]
                        break
                    elif int(action) != 3:
                        attack = attacks[item[int(action) + 2]]
                        break
                    print('Secondary has no ammo. Use another Weapon.')
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
                                        t.sleep(1.5)
                                    elif enemy[1] < 10:
                                        print(f'{enemy[0]} is severely injured.')
                                        t.sleep(1.5)
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
                            t.sleep(1.5)
                            if enemy_army[0][1] <= 0:
                                if enemy_army[0][5] is None:
                                    death_message = deaths[2]
                                else:
                                    death_message = r.choice(deaths)
                                    death_message = death_message.replace('[lastwords]', enemy_army[0][5])
                                death_message = death_message.replace('[a]', enemy_army[0][0])
                                enemy_army.pop(0)
                                print(death_message)
                                t.sleep(1.5)
                            elif enemy_army[0][1] < 10:
                                print(f'{enemy_army[0][0]} is severely injured.')
                                t.sleep(1.5)
                    else:
                        print(f'{txt} but the attack {r.choice(enemy_army[0][9])}')
                        t.sleep(1.5)
                else:
                    print(f'{txt} but the attack misses.')
                    t.sleep(1.5)
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
[1] Health Potion({item[0]})  [2] Curry({item[1]})  [3] dino nuggets({item[2]})
------------------------------------------------------------
''', [1, 2, 3])
            clearConsole()
            action = int(action)
            if action == 1:
                if item[0] > 0:
                    item[0] -= 1
                    health += r.randint(35, 70)
                    print(f'{player_name} drinks a health potion.')
                    t.sleep(1)
                    clearConsole()
            elif action == 2:
                if item[1] > 0:
                    item[1] -= 1
                    health += r.randint(5, 10)
                    hunger += r.randint(40, 80)
                    mental += r.randint(0, 15)
                    print(f'{player_name} eats a delicious curry.')
                    t.sleep(1)
                    clearConsole()
                    if hunger >= 130:
                        print(f'The curry makes {player_name} fat.')
                        t.sleep(1)
                        clearConsole()
                        evasion -= 10
                    elif hunger >= 100:
                        print(f'The curry makes {player_name} feel full.')
                        t.sleep(1)
                        clearConsole()
            else:
                if item[2] > 0:
                    item[2] -= 1
                    hunger += r.randint(5, 10)
                    mental += r.randint(10, 15)
                    print(f'{player_name} eats a handful of dino nuggets.')
                    t.sleep(1)
                    clearConsole()
                    if hunger >= 130:
                        print(f'The dino nuggets makes {player_name} fat.')
                        t.sleep(1)
                        clearConsole()
                        evasion -= 10
                    elif hunger >= 100:
                        print(f'The dino nuggets makes {player_name} feel full.')
                        t.sleep(1)
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
                t.sleep(2)
                clearConsole()
                if enemy_army[0][10][2][1] == False or enemy_army[0][10][2][1] > 0:
                    mental_dmg = 5-enemy_army[0][10][2][0]
                    if enemy_army[0][10][2][1]:
                        enemy_army[0][10][2][1] -= 5
                    if mental_dmg < 0:
                        mental_dmg = 0
                enemy_army[0][1] -= mental_dmg
                enemy_army[0][2] += 0.1
                enemy_army[0][8] -= 0.2
                if enemy_army[0][8] < 0:
                    enemy_army[0][8] = 0
            else:
                compliment = r.choice(compliments)
                print(f'{player_name}: {compliment}')
                print(f'{enemy_army[0][0]} is feeling good.')
                t.sleep(2)
                clearConsole()
                enemy_army[0][2] -= 0.2
                if enemy_army[0][2] < 0.1:
                    enemy_army[0][2] = 0.1

        # Enemy turn
        for attacker in enemy_army:
            if attacker[1] != 2147483647 and attacker[0] != 'placeholder':
                attack = attacks[r.choice(attacker[3])]
                for x in range(r.randint(1, attack[7])):
                    if r.randint(0, 100) / 100 > evasion / 100 * attack[6]:
                        if r.randint(0, 100) / 100 > attack[5]:
                            dmg = int(r.randint(attack[2][0], attack[2][1])*attacker[2])
                            if dmg <= 0:
                                dmg = 1
                            health -= dmg
                            mental_dmg = int(dmg/3)
                            if mental_dmg <= 0:
                                mental_dmg = 1
                            mental -= mental_dmg
                            mental_lost += mental_dmg
                            health_lost += dmg
                            txt = attack[1].replace('[b]', player_name)
                            txt = txt.replace('[a]', attacker[0])
                            txt = txt.replace('[body]', r.choice(body))
                            print(f'{attacker[0]}: {r.choice(attacker[4])}')
                            t.sleep(1.5)
                            print(f'{txt} doing {dmg} damage.')
                            t.sleep(1.5)
                        else:
                            txt = attack[1].replace('[b]', player_name)
                            txt = txt.replace('[a]', attacker[0])
                            txt = txt.replace('[body]', r.choice(body))
                            print(f'{attacker[0]}: {r.choice(attacker[4])}')
                            t.sleep(1.5)
                            print(f'{txt} but {player_name} blocks the attack')
                            t.sleep(1.5)
                    else:
                        txt = attack[1].replace('[b]', player_name)
                        txt = txt.replace('[a]', attacker[0])
                        txt = txt.replace('[body]', r.choice(body))
                        print(f'{attacker[0]}: {r.choice(attacker[4])}')
                        t.sleep(1.5)
                        print(f'{txt} but the attack misses.')
                        t.sleep(1.5)
        t.sleep(2)
        clearConsole()
        # Calculations
        hunger -= 1
        if hunger > 100 > health:
            health += int((hunger - 100) / 1.5)
            hunger = 100
        if health < 100 and hunger > 0:
            missing_health = 100 - health
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
        if health > 100:
            health = 100
        elif health <= 0 or mental <= 0:
            print(f'{player_name} died.')
            return 1
        if mental > 100:
            mental = 100
        if hunger > 100:
            hunger = 100
        # Player stats
        stats[0] = health
        stats[1] = hunger
        stats[2] = mental
        stats[3] = intelligence
        stats[4] = evasion
        stats[5] = accuracy
        print(f'''
----------------------------------Player Stats----------------------------------
 Health {bar(stats[0], health_lost)}   Mental Health {bar(stats[2], mental_lost)}

 Hunger {bar(stats[1], hunger_lost)}   Intelligence  {bar(stats[3], 0)}
--------------------------------------------------------------------------------
''')
        t.sleep(1.5)
        clearConsole()
        print(f'''
----------------------------------Player Stats----------------------------------
 Health {bar(stats[0], 0)}   Mental Health {bar(stats[2], 0)}

 Hunger {bar(stats[1], 0)}   Intelligence  {bar(stats[3], 0)}
--------------------------------------------------------------------------------
''')
        t.sleep(2)
        clearConsole()

resetVariables()
for l in range(100):
    a = r.randint(0,4)
    if a:
        level('fight')
    else:
        level('loot', special=r.choice(auto_loot))

print('you win!')
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


