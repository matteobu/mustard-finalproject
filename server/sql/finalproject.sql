
 CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      first VARCHAR(255) NOT NULL,
      last VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      bio VARCHAR, 
      pic_url TEXT
      );
      
CREATE TABLE password_reset_codes(
      id SERIAL PRIMARY KEY,
      code VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL ,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

CREATE TABLE friendships(
      id SERIAL PRIMARY KEY,
      sender_id INT REFERENCES users(id) NOT NULL,
      recipient_id INT REFERENCES users(id) NOT NULL,
      accepted BOOLEAN DEFAULT false);

CREATE TABLE chat(
      id SERIAL PRIMARY KEY,
      sender_id INT REFERENCES users(id) NOT NULL,
      message VARCHAR NOT NULL, 
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE pvt_chat(
      id SERIAL PRIMARY KEY,
      sender_id INT REFERENCES users(id) NOT NULL,
      recipient_id INT REFERENCES users(id) NOT NULL,
      message VARCHAR NOT NULL, 
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



-- INSERT INTO chat (sender_id, message)
-- VALUES('3','Third Message');


-- INSERT INTO pvt_chat (sender_id, recipient_id, message)
-- VALUES('3', '27', 'ONE MESSAGES');