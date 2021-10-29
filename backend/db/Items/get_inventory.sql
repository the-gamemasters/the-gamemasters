SELECT *
FROM inventory
INNER JOIN items
    ON inventory.item_key = items.item_key AND quantity > 0
WHERE character_key = $1;