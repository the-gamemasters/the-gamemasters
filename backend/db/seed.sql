DROP TABLE IF EXISTS charStats, charactersEquipment, monstersEquipment;
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
    level INT
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
    slot INT, -- 1=head, 2= right hand, 3=left hand, 4=armor, 5=feet
    equipment_name VARCHAR(100),
    equipment_description VARCHAR(200),
    effect_stat int,
    effect_other int,
    rarity VARCHAR(30),
    cost INT
);

CREATE TABLE charactersEquipment (
    charactersEquipment_key SERIAL PRIMARY KEY,
    character_key INT REFERENCES characters(character_key),
    equipment_key INT REFERENCES equipment(equipment_key),
    equipped BOOLEAN,
    quantity INT
);


CREATE TABLE monsters (
    monster_key SERIAL PRIMARY KEY,
    monster_name varchar(100),
    base_strength INT,
    base_constitution INT,
    base_intelligence INT,
    base_dexterity INT
);

CREATE TABLE monstersEquipment (
    monstersEquipment_key SERIAL PRIMARY KEY,
    monster_key INT REFERENCES monsters(monster_key),
    equipment_key INT REFERENCES equipment(equipment_key)
);

CREATE TABLE inventory (
    charactersInventory_key SERIAL PRIMARY KEY,
    character_key INT REFERENCES characters(character_key),
    item_key INT REFERENCES items(item_key),
    quantity INT
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
);
CREATE TABLE spells (
    spell_key SERIAL PRIMARY KEY,
    spell_name varchar(100),
    spell_type varchar(100),
    base_damage INT,
    mana_cost INT
);