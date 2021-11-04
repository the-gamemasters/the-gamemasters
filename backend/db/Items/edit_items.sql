UPDATE inventory
SET quantity = $2
WHERE charactersinventory_key = $1
returning *;