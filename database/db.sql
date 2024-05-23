USE magic_academy;
-- -*********************-
CREATE TABLE IF NOT EXISTS user_roles (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL,
    PRIMARY KEY (id)
) ENGINE = INNODB;
INSERT INTO user_roles (name)
VALUES ("admin"),
    ("student"),
    ("instructor");
-- -*********************-
CREATE TABLE IF NOT EXISTS users (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(20) NOT NULL,
    /*avatar_url TEXT DEFAULT("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"),*/
    user_roles_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_roles_id) REFERENCES user_roles(id)
) ENGINE = INNODB;
INSERT INTO users (name, email, password, user_roles_id)
VALUES ("Daniel", "dagutmu667@gmail.com", "Dan1245", 1);
-- -*********************-