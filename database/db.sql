CREATE DATABASE IF NOT EXISTS magic_academy;
USE magic_academy;
-- -*********************-
-- user_roles
CREATE TABLE IF NOT EXISTS user_roles (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL,
    PRIMARY KEY(id)
) ENGINE = InnoDB;
INSERT INTO user_roles(name)
VALUES ("admin"),
    ("student"),
    ("instructor");
-- -*********************-
-- users
CREATE TABLE IF NOT EXISTS users (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(20) NOT NULL,
    avatar_url VARCHAR(255) DEFAULT "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
    user_roles_id INT NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT fk_user_roles FOREIGN KEY (user_roles_id) REFERENCES user_roles(id)
) ENGINE = InnoDB;
INSERT INTO users(name, email, password, user_roles_id)
VALUES ("Daniel", "dagutmu667@gmail.com", "Dan1245", 1);
-- -*********************-
-- topics
CREATE TABLE IF NOT EXISTS topics (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE,
    PRIMARY KEY(id)
) ENGINE = InnoDB;
-- -*********************-
-- user_topics
-- -*********************-
-- courses 
CREATE TABLE IF NOT EXISTS courses (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(255) NOT NULL,
    thumbnail_url VARCHAR(255) DEFAULT "https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Begrippenlijst.svg" users_id INT NOT NULL,
    users_id INT NOT NULL,
    topics_id INT NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT fk_users FOREIGN KEY (users_id) REFERENCES users(id),
    CONSTRAINT fk_topics FOREIGN KEY (topics_id) REFERENCES topics(id)
) ENGINE = InnoDB;