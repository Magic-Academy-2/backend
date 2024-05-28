-- Business data
-- Add roles admin, student and instructor
INSERT INTO user_roles(name)
VALUES ('admin'),
    ('student'),
    ('instructor');
-- Add states
INSERT INTO states(name)
VALUES ('uninitialized'),
    ('in progress'),
    ('completed');
-- -*********************-
-- Example data
-- Add some users
INSERT INTO users(name, email, password, user_roles_id)
VALUES (
        'Daniel',
        'dagutmu667@gmail.com',
        '$2a$10$P9WNfaw/RTKgqryX.89ysel.aFLGdbhmzW7sKoWzbCAXaqR5FXrm.',
        1
    ),
    (
        'Juan Pablo',
        'juanpablo@gmail.com',
        '$2a$10$.xyNa1Z/yYtoi/bQ6U8hv.0jdTsJ18pD3MyE/tGE0skSVqgNiNrFW',
        2
    ),
    ('Omar', 'omar@gmail.com', '$2a$10$EVqURP65RxmmaYliedD4AeNAFQb3qM2MJQ.EPXuVOsPCKR0Py2BeC', 3);
-- Add some topics
INSERT INTO topics(name)
VALUES ('HTML'),
    ('CSS'),
    ('Javascript');
-- Add some user_topis
INSERT INTO user_topics(users_id, topics_id)
VALUES (3, 2),
    (3, 3);
-- Add some courses
INSERT INTO courses(
        name,
        description,
        thumbnail_url,
        users_id,
        topics_id
    )
VALUES (
        'HTML Basics',
        'Learn HTML from scratch',
        DEFAULT,
        4,
        2
    ),
    (
        'CSS Basics',
        'Learn CSS from scratch',
        DEFAULT,
        4,
        3
    ),
    (
        'Javascript Basics',
        'Learn Javascript from scratch',
        DEFAULT,
        4,
        4
    );