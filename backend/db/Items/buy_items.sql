-- INSERT INTO charactersequipment
-- (character_key, equipment_key, equipped)
-- VALUES
-- ($1, $2, FALSE);

INSERT INTO inventory
(character_key, item_key, quantity)
VALUES($1, $2, $3)
returning *;