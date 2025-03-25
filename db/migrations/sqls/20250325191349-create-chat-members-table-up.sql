/* Replace with your SQL commands */
CREATE TABLE chat_members (
  id serial PRIMARY KEY,
  chat_id integer,
  user_id integer,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (chat_id) REFERENCES chats(id) ON DELETE CASCADE
);