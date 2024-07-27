CREATE TABLE users (
    id        VARCHAR PRIMARY KEY,
    firstName VARCHAR NOT NULL,
    lastName  VARCHAR NOT NULL,
    email     VARCHAR NOT NULL UNIQUE,
    password  VARCHAR NOT NULL,
    username  VARCHAR NOT NULL UNIQUE
);


CREATE TABLE posts (
    id      VARCHAR PRIMARY KEY,
    userId   VARCHAR NOT NULL,
    title    VARCHAR NOT NULL,
    url      VARCHAR NOT NULL UNIQUE,
    postedAt INTEGER NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id)
);

CREATE TABLE likes (
    userId  VARCHAR NOT NULL,
    postId  VARCHAR NOT NULL,
    PRIMARY KEY (userId, postId),
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (postId) REFERENCES posts(id)
);