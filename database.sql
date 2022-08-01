-- CREATE DATABASE imageboard;


CREATE TABLE posts (
    id SERIAL PRIMARY KEY NOT NULL,
    text VARCHAR(255),
    file VARCHAR(255),
    created TIMESTAMP,
    updated TIMESTAMP
);

CREATE TABLE comments (
  id SERIAL PRIMARY KEY NOT NULL,
  text VARCHAR(255),
  created TIMESTAMP,
  file VARCHAR(255),
  parent int REFERENCES posts(id)
);