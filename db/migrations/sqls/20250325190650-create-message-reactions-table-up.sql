/* Replace with your SQL commands */
CREATE TABLE message_reactions (
  id serial PRIMARY KEY,
  message_id integer,
  author_id integer,
  text varchar(255) NOT NULL,
  FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (message_id) REFERENCES messages(id) ON DELETE CASCADE
);