SELECT username, email, password
FROM users
WHERE email = $1;