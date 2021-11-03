UPDATE characters
SET
  description = $2,
  gold = $3,
  experience = $4,
  level = $5

WHERE character_key = $1
RETURNING *;