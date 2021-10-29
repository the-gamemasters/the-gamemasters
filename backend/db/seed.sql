DROP TABLE IF EXISTS charStats, charactersEquipment, monstersEquipment, equipmentStats;
DROP TABLE IF EXISTS equipment, monsters;
DROP TABLE IF EXISTS characters;
DROP TABLE IF EXISTS avatars;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS items;

CREATE TABLE users (
    user_key SERIAL PRIMARY KEY,
    username varchar(50),
    email VARCHAR(80),
    password VARCHAR(100)
);

CREATE TABLE avatars (
    avatar_key SERIAL PRIMARY KEY,
    filename VARCHAR(100),
    filepath VARCHAR(200),
    description VARCHAR(100)
);

CREATE TABLE characters (
    character_key SERIAL PRIMARY KEY,
    char_name VARCHAR(80),
    description VARCHAR(255),
    user_key INT REFERENCES users(user_key),
    avatar_key INT REFERENCES avatars(avatar_key),
    gold INT,
    experience INT,
    level INT,
    myDefault BOOLEAN
);

CREATE TABLE charStats (
    charStats_key SERIAL PRIMARY KEY,
    character_key INT REFERENCES characters(character_key),
    strength INT,
    constitution INT,
    intelligence INT,
    dexterity INT
);

CREATE TABLE equipment (
    equipment_key SERIAL PRIMARY KEY,
    slot INT, -- 1=armor, 2=weapon
    equipment_name VARCHAR(100),
    equipment_description VARCHAR(200),
    equipment_effect_stat VARCHAR(20),
    equipment_effect_stat_value INT,
    equipment_value INT,
    world INT,
    equipment_icon TEXT
);

CREATE TABLE equipmentStats (
    equipmentStats_key SERIAL PRIMARY KEY,
    equipment_key INT REFERENCES equipment(equipment_key),
    stat INT,  -- 1=strength, 2=dexterity, 3=constitution, 4=intelligence
    effectValue INT
)

CREATE TABLE charactersEquipment (
    charactersEquipment_key SERIAL PRIMARY KEY,
    character_key INT REFERENCES characters(character_key),
    equipment_key INT REFERENCES equipment(equipment_key),
    equipped BOOLEAN
);

CREATE TABLE monsters (
    monster_key SERIAL PRIMARY KEY,
    monster_name varchar(100),
    base_strength INT,
    base_constitution INT,
    base_intelligence INT,
    base_dexterity INT,
    weapon_bonus INT,
    base_dodge_chance DECIMAL,
    sprite_url TEXT,
    xp_reward INT,
    world INT,
    boss BOOLEAN
);

CREATE TABLE monstersEquipment (
    monstersEquipment_key SERIAL PRIMARY KEY,
    monster_key INT REFERENCES monsters(monster_key),
    equipment_key INT REFERENCES equipment(equipment_key)
);

CREATE TABLE items (
    item_key SERIAL PRIMARY KEY,
    item_name varchar(100),
    item_effect varchar(100),
    item_effect_stat varchar(100),
    item_effect_value INT,
    item_effect_duration INT,
    item_cost INT,
    world INT
    item_icon TEXT
);

CREATE TABLE spells (
    spell_key SERIAL PRIMARY KEY,
    spell_name varchar(100),
    spell_school varchar(100),
    spell_effect TEXT,
    spell_effect_stat INT, -- 1=strength, 2=dexterity, 3=constitution, 4=intelligence
    spell_effect_value INT,
    spell_effect_duration INT,
    cooldown_turns INT
);



INSERT INTO equipment (slot, equipment_name, equipment_description, equipment_value, world)
VALUES
(1, 'Stick', 'It is a sharp stick', 1, 1),
(1, 'Curved stick', 'It has a really interesting shape', 3, 2),
(1, 'Khopesh', 'Ancient curved blade', 50, 2),
(1, 'Dagger', 'It is a knife', 5, 3),
(1, 'Short sword', 'Longer than a knife', 50, 3),
(1, 'Long sword', '4 foot long blade', 100, 3),
(1, 'Wand', 'Infused with strange magic', 1000, 3),
(1, 'Great sword', 'A great big sword', 200, 3),
(1, 'Cell phone', 'A large blunt weapon', 100, 4),
(1, 'Atari joystick', 'Weapon of arcade magic', 50, 4),
(1, 'Machete', 'That is not a knife... this is a knife', 50, 4),
(1, 'The Monster Hunter', 'This sword is bigger than most people', 1000, 4),
(1, 'Lightsaber', 'An elegant weapon for a more civilized age', 800, 4),
(2, 'Leather armor', 'Sturdy hide armor', 100, 3),
(2, 'Chainmail', 'Better protection than hide', 400, 3),
(2, 'Kevlar jacket', 'Lightweight modern armor', 600, 4)

INSERT INTO equipmentStats (equipment_key, stat, effectValue)
VALUES
(1, 1, 1),
(2, 4, 2),
(3, 1, 5),
(4, 1, 1),
(5, 1, 3),
(6, 1, 6),
(7, 4, 15),
(8, 1, 9),
(9, 1, 5),
(10, 4, 5),
(11, 1, 4),
(12, 1, 15),
(13, 1, 12),
(14, 3, 3),
(15, 3, 6),
(16, 3, 10)

INSERT INTO monsters (monster_name, base_strength, base_dexterity, base_constitution, base_intelligence, weapon_bonus, base_dodge_chance, sprite_url, xp_reward, world, boss)
VALUES
('Rex the T', 12, 5, 12, 3, 2, 0.01, 'https://i.imgur.com/FXHtW6u.gif', 15, 1, true),
('Cleopatra', 10, 15, 10, 15, 1, 0.1, 'https://c.tenor.com/riKvVZ2Et-cAAAAM/dumb-huh.gif', 20, 2, true),
('Lord Maxximus IV', 15, 10, 15, 8, 10, 0.15, 'https://c.tenor.com/riKvVZ2Et-cAAAAM/dumb-huh.gif', 30, 3, true),
('Dictator Ronald Regan', 5, 1, 8, 8, 20, 0.01, 'https://c.tenor.com/riKvVZ2Et-cAAAAM/dumb-huh.gif', 50, 4, true),
('Compsognathus', 1, 8, 4, 1, 1, 0.05, 'https://c.tenor.com/riKvVZ2Et-cAAAAM/dumb-huh.gif', 1, 1, false),
('Ancient Rat', 5, 5, 5, 3, 1, 0.05, 'https://c.tenor.com/riKvVZ2Et-cAAAAM/dumb-huh.gif', 1, 1, false),
('Jackal', 10, 5, 5, 4, 1, 0.05, 'https://c.tenor.com/riKvVZ2Et-cAAAAM/dumb-huh.gif', 3, 2, false),
('Grave Robber', 7, 8, 7, 10, 5, 0.01, 'https://c.tenor.com/riKvVZ2Et-cAAAAM/dumb-huh.gif', 5, 2, false),
('Mummy', 15, 1, 5, 1, 1, 0.01, 'https://c.tenor.com/riKvVZ2Et-cAAAAM/dumb-huh.gif', 4, 2, false),
('Cat', 2, 10, 5, 5, 1, 0.2, 'https://c.tenor.com/riKvVZ2Et-cAAAAM/dumb-huh.gif', 4, 2, false),
('Giant Rat', 8, 5, 8, 1, 3, 0.05, 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/3c1fb523717421.56327b1b5db32.gif', 15, 3, false),
('Space Marine', 15, 10, 10, 18, 5, 0.05, 'https://giphy.com/gifs/nes-metroid-samus-IffLnwlgZNgAQlVFT1', 50, 4, false)

INSERT INTO spells (spell_name, spell_school, spell_effect, spell_effect_stat, spell_effect_value, spell_effect_duration, cooldown_turns)
VALUES
('Fireball', 'fire', 'damage', 3, 10, 0, 2),
('Frostbite', 'ice', 'damage', 3, 7, 0, 1),
('Reviving Jolt', 'lightning', 'heal', 3, 20, 0, 3),
('Flame On', 'fire', 'buff', 2, 3, 2, 7),
('Draining Zap', 'lightning', 'debuff', 3, 2, 1, 5),
('Scurry', 'none', 'buff', 4, 2, 3, 7),
('Massive Chomp', 'none', 'damage', 3, 30, 0, 6),
('Reviving Jolt', 'lightning', 'heal', 3, 20, 0, 3),
('Yawn', 'none', 'debuff', 2, 3, 2, 5)

INSERT INTO items (item_name, item_effect, item_effect_stat, item_effect_value, item_effect_duration, item_cost, world)
VALUES
('Cream', 'heal', 3, 10, 0, 5, 1),
('Prehistoric Spoon', 'buff', 4, 1, 2, 10, 1),
('Bitter Herb', 'heal', 3, 5, 0, 1, 1),
('Clean Water', 'buff', 1, 1, 1, 3, 1),
('Dirt', 'debuff', 2, 1, 2, 1, 1),
('Papyrus', 'buff', 4, 2, 3, 20, 2),
('Snake Venom', 'debuff', 1, 2, 3, 30, 2),
('Hairball', 'debuff', 2, 2, 2, 15, 2),
('Cheese', 'heal', 3, 30, 0, 23, 2),
('Potion of Healing', 'heal', 3, 50, 0, 100, 3),
('Magic Powder', 'buff', 4, 32, 2, 100, 3),
('Social Contract', 'buff', 1, 3, 2, 100, 3),
('You are a Witch', 'debuff', 2, 2, 3, 100, 3),
('Stinky Cheese', 'heal', 3, 30, 0, 60, 3),
('Nasty Coffee', 'debuff', 3, 2, 3, 100, 4),
('Aged Cheese', 'heal', 3, 70, 0, 200, 4),
('Walkman', 'buff', 4, 3, 3, 400, 4),
('Vague Meme', 'debuff', 4, 2, 5, 200, 5),
('Fine Aged Cheese', 'heal', 3, 100, 0, 500, 5),
('Nanobot Injection', 'buff', 1, 5, 4, 1000, 5)