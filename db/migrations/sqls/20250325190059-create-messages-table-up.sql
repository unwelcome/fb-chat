/* Replace with your SQL commands */
CREATE TABLE messages (
  id serial PRIMARY KEY, 
  author_id integer,
  text text NOT NULL,
  time_send timestamp DEFAULT now(),
  chat_id integer,
  is_corrected boolean,
  FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL,
  FOREIGN KEY (chat_id) REFERENCES chats(id) ON DELETE CASCADE
);