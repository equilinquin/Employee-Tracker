DROP DATABASE IF EXISTS onepiece_db;

CREATE DATABASE onepiece_db;

USE onepiece_db;

CREATE TABLE pirates (
    id INT NOT NULL AUTO_INCREMENT,
    piratename VARCHAR(100),
    PRIMARY KEY (id)
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(100),
    bounty INT,
    pirates_id INT NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_pirates FOREIGN KEY (pirates_id) REFERENCES pirates(id)
);

CREATE TABLE crew (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    roles_id INT NOT NULL,
    captain_id INT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_roles FOREIGN KEY (roles_id) REFERENCES roles(id),
    CONSTRAINT fk_captain FOREIGN KEY (captain_id) REFERENCES crew(id)
);

INSERT INTO pirates (piratename)
VALUES ('Straw Hats'), 
       ('Blackbeard'), 
       ('Whitebeard'), 
       ('Big Mom'), 
       ('Red Hair'), 
       ('Beast');

INSERT INTO roles (title, bounty, pirates_id)
VALUES ('Straw Hats Captain', 500000000, 1), 
       ('Straw Hats Crew Member', 177000000, 1),
       ('Blackbeard Captain', 247600000, 2),
       ('Blackbeard Crew Member', 20000000, 2),
       ('Whitebeard Captain', 546000000, 3), 
       ('WhiteBeard Crew Member', 550000000, 3),
       ('Big Mom Captain', 488000000, 4),
       ('Big Mom Crew Member', 700000000, 4),
       ('Red Hair Captain', 448900000, 5),
       ('Red Hair Crew Member', 700000000, 5),
       ('Beast Captain', 461100000, 6),
       ('Beast Crew Member', 320000000, 6);

INSERT INTO crew (first_name, last_name, roles_id, captain_id)
VALUES ('Luffy', 'Monkey', 1, NULL),
       ('Zoro', 'Roranoa', 2, 1),
       ('Sanji', 'Vinsmoke', 2, 1),
       ('Marshall', 'Teach', 3, NULL),
       ('Burgess', 'Jesus', 4, 4),
       ('Auger', 'Van', 4, 4),
       ('Edward', 'Newgate', 5, NULL),
       ('Ace', 'Portgas', 6, 7),
       ('Linlin', 'Charlotte', 7, NULL),
       ('Katakuri', 'Charlotte', 8, 9),
       ('Cracker', 'Charlotte', 8, 9),
       ('Smoothie', 'Charlotte', 8, 9),
       ('Shanks', '', 9, NULL),
       ('Benn', 'Beckman', 10, 13),
       ('Lucky', 'Roux', 10, 13),
       ('Kaido', '', 11, NULL),
       ('King', '', 12, 16),
       ('Queen', '', 12, 16),
       ('Jack', '', 12, 16);

