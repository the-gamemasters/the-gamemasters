UPDATE charstats
SET
  strength = $2,
  constitution = $3,
  intelligence = $4,
  dexterity = $5

WHERE character_key = $1
RETURNING *;