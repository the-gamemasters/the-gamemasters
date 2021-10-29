UPDATE characters SET gold = gold + $2 WHERE character_key = $1;

SELECT gold from characters WHERE character_key = $1;