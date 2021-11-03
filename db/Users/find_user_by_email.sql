SELECT user_key, username, email, password
FROM users
WHERE email = $1;