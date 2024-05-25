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
--Add some users
INSERT INTO users(name, email, password, user_roles_id)
VALUES ('Daniel', 'dagutmu667@gmail.com', 'Dan1245', 1),
    (
        'Juan Pablo',
        'juanpablo@gmail.com',
        'Juanpablo12345',
        2
    ),
    ('Omar', 'omar@gmail.com', 'Omar12345*', 3);