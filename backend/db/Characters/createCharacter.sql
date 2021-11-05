INSERT INTO characters
(char_name,
    description,
    user_key ,
    avatar_key ,
    gold ,
    experience ,
    level,
    class)
VALUES
($1, $2, $3, $4, $5, $6, $7, $8)
RETURNING *;