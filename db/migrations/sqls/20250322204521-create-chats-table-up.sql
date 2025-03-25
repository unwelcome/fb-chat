/* Replace with your SQL commands */
CREATE TABLE chats (
  id serial PRIMARY KEY,
  name varchar(30) NOT NULL,
  photo_url varchar(250),
  creator_id integer,
  FOREIGN KEY (creator_id) REFERENCES users(id) ON DELETE SET NULL
);