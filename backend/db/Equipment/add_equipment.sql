INSERT INTO charactersequipment
(character_key, equipment_key, equipped)
VALUES
($1, $2, FALSE)
RETURNING *;