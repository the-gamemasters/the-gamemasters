SELECT username, email, password
FROM users
WHERE username = $1;