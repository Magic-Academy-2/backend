-- Date: 2024-05-24, Database creation
CREATE DATABASE IF NOT EXISTS magic_academy;
USE magic_academy;

-- user_roles
CREATE TABLE IF NOT EXISTS user_roles (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL,
    PRIMARY KEY(id)
) ENGINE = InnoDB;



-- users
CREATE TABLE IF NOT EXISTS users (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(20) NOT NULL,
    avatar_url VARCHAR(255) DEFAULT 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541',
    user_roles_id INT NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT fk_user_roles FOREIGN KEY (user_roles_id) REFERENCES user_roles(id)
) ENGINE = InnoDB;

-- topics
CREATE TABLE IF NOT EXISTS topics (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE,
    PRIMARY KEY(id)
) ENGINE = InnoDB;

-- user_topics
CREATE TABLE IF NOT EXISTS user_topics (
    id INT NOT NULL AUTO_INCREMENT,
    users_id INT NOT NULL,
    topics_id INT NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT fk_user_topics_users FOREIGN KEY (users_id) REFERENCES users(id),
    CONSTRAINT fk_user_topics_topics FOREIGN KEY (topics_id) REFERENCES topics(id)
) ENGINE = InnoDB;

-- courses 
CREATE TABLE IF NOT EXISTS courses (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(255) NOT NULL,
    thumbnail_url VARCHAR(255) DEFAULT 'https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Begrippenlijst.svg',
    users_id INT NOT NULL,
    topics_id INT NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT fk_courses_users FOREIGN KEY (users_id) REFERENCES users(id),
    CONSTRAINT fk_courses_topics FOREIGN KEY (topics_id) REFERENCES topics(id)
) ENGINE = InnoDB;


-- course_sections
CREATE TABLE IF NOT EXISTS course_sections (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL DEFAULT 'Untitled section',
    courses_id INT NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT fk_course_sections_courses FOREIGN KEY (courses_id) REFERENCES courses(id)
) ENGINE = InnoDB;

-- section_classes
CREATE TABLE IF NOT EXISTS section_classes (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(255),
    class_type_name VARCHAR(20),
    content TEXT,
    duration INT,  -- para videos
    url VARCHAR(255),  -- para videos
    course_sections_id INT NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT fk_section_classes_course_sections FOREIGN KEY (course_sections_id) REFERENCES course_sections(id)
) ENGINE = InnoDB;

-- comments
CREATE TABLE IF NOT EXISTS comments (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(255),
    content TEXT NOT NULL,
    date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    comment_type_name VARCHAR(7) NOT NULL CHECK (comment_type_name IN ('course', 'section', 'class')),
    comment_types_id INT NOT NULL,
    comment_id INT,
    users_id INT NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT fk_comments_users FOREIGN KEY (users_id) REFERENCES users(id),
    CONSTRAINT self_fk_comment FOREIGN KEY (comment_id) REFERENCES comments(id)
) ENGINE = InnoDB;

-- states
CREATE TABLE IF NOT EXISTS states (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL,
    PRIMARY KEY(id)
) ENGINE = InnoDB;

-- user_courses
CREATE TABLE IF NOT EXISTS user_courses (
    id INT NOT NULL AUTO_INCREMENT,
    states_id INT NOT NULL,
    users_id INT NOT NULL,
    courses_id INT NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT fk_user_courses_states FOREIGN KEY (states_id) REFERENCES states(id),
    CONSTRAINT fk_user_courses_users FOREIGN KEY (users_id) REFERENCES users(id),
    CONSTRAINT fk_user_courses_courses FOREIGN KEY (courses_id) REFERENCES courses(id)
) ENGINE = InnoDB;

-- user_sections
CREATE TABLE IF NOT EXISTS user_sections (
    id INT NOT NULL AUTO_INCREMENT,
    states_id INT NOT NULL,
    users_id INT NOT NULL,
    course_sections_id INT NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT fk_user_sections_states FOREIGN KEY (states_id) REFERENCES states(id),
    CONSTRAINT fk_user_sections_users FOREIGN KEY (users_id) REFERENCES users(id),
    CONSTRAINT fk_user_sections_course_sections FOREIGN KEY (course_sections_id) REFERENCES course_sections(id)
) ENGINE = InnoDB;

-- user_classes
CREATE TABLE IF NOT EXISTS user_classes (
    id INT NOT NULL AUTO_INCREMENT,
    states_id INT NOT NULL,
    users_id INT NOT NULL,
    section_classes_id INT NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT fk_user_classes_states FOREIGN KEY (states_id) REFERENCES states(id),
    CONSTRAINT fk_user_classes_users FOREIGN KEY (users_id) REFERENCES users(id),
    CONSTRAINT fk_user_classes_section_classes FOREIGN KEY (section_classes_id) REFERENCES section_classes(id)
) ENGINE = InnoDB;