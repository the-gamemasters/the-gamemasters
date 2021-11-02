UPDATE inventory 
SET quantity = quantity - 1
WHERE charactersinventory_key = $1
AND quantity > 0 RETURNING quantity;