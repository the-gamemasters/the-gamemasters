UPDATE charactersequipment
SET equipped = false
WHERE charactersequipment_key = $1;

UPDATE charactersequipment
SET equipped = true
WHERE charactersequipment_key = $2;