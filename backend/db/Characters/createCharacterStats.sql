INSERT INTO charstats
(character_key,
   strength,
    constitution,
    intelligence,
   dexterity)
VALUES
($1, $2, $3, $4, $5)
RETURNING *;