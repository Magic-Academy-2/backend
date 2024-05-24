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
CREATE TABLE IF NOT EXISTS user_topics (
    id INT NOT NULL AUTO_INCREMENT,
    users_id_ INT NOT NULL,
    topics_id INT NOT NULL,
    CONSTRAINT fk_users FOREIGN KEY (users_id) REFERENCES users(id),
    CONSTRAINT fk_topics FOREIGN KEY (topics_id) REFERENCES topics(id)
) ENGINE = InnoDB;
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
-- -*********************-
-- course_sections
CREATE TABLE IF NOT EXISTS course_sections (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL DEFAULT "Untitled section",
    courses_id INT NOT NULL,
    PRIMARY KEY(id)
    CONSTRAINT fk_courses FOREIGN KEY (courses_id) REFERENCES courses(id)
)
-- -*********************-
-- section_classes
CREATE TABLE IF NOT EXISTS section_classes (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(255),
    class_type_name VARCHAR(20) CHECK ()
    content TEXT,
    PRIMARY KEY(id)
)
-- -*********************-
-- comments
CREATE TABLE IF NOT EXISTS comments (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(255),
    content TEXT NOT NULL,
    date TIMESTAMP NOT NULL,
    comment_type_name VARCHAR(7) NOT NULL CHECK ('course', 'section', 'class'),
    comment_types_id INT NOT NULL,
    comment_id INT,
    users_id INT NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT fk_users FOREIGN KEY (users_id) REFERENCES users(id)
    CONSTRAINT self_fk_comment FOREIGN KEY (comment_id) REFERENCES comments(id)
    
) ENGINE = InnoDB;
-- -*********************-
--