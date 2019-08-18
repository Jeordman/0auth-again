INSERT INTO users
    (auth0_id, email, profile_name, picture)
VALUES
    ($1, $2, $3, $4);
SELECT *
FROM users
WHERE auth0_id = $1