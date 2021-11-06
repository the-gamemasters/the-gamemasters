UPDATE characters
SET
  gold = gold + $2,
  experience = experience + $3
WHERE character_key = $1
RETURNING *;