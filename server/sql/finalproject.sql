
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
      
 CREATE TABLE routes(
      id SERIAL PRIMARY KEY,
      pic_url TEXT, 
      name VARCHAR(255) NOT NULL,
      location VARCHAR(255) NOT NULL,
      distance INT NOT NULL,
      grade VARCHAR(255) NOT NULL,
      path VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

-- INSERT INTO routes (name, location, distance, grade, path)
-- VALUES('Berlin Sprea', 'city', '245', 'easy', 'cycle path');

-- INSERT INTO routes (name, location, distance, grade, path)
-- VALUES('Templiner See', 'lake', '25', 'intermediate', 'off road');

-- INSERT INTO routes (name, location, distance, grade, path)
-- VALUES('Templiner Forest', 'forest', '35', 'intermediate', 'off road');



-- grade "easy or intermediate"
-- path "off road or cycle path"
 



CREATE TABLE password_reset_codes(
      id SERIAL PRIMARY KEY,
      code VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL ,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

-- CREATE TABLE friendships(
--       id SERIAL PRIMARY KEY,
--       sender_id INT REFERENCES users(id) NOT NULL,
--       recipient_id INT REFERENCES users(id) NOT NULL,
--       accepted BOOLEAN DEFAULT false);

-- CREATE TABLE chat(
--       id SERIAL PRIMARY KEY,
--       sender_id INT REFERENCES users(id) NOT NULL,
--       message VARCHAR NOT NULL, 
--       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- CREATE TABLE pvt_chat(
--       id SERIAL PRIMARY KEY,
--       sender_id INT REFERENCES users(id) NOT NULL,
--       recipient_id INT REFERENCES users(id) NOT NULL,
--       message VARCHAR NOT NULL, 
--       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );



-- INSERT INTO chat (sender_id, message)
-- VALUES('3','Third Message');


-- INSERT INTO pvt_chat (sender_id, recipient_id, message)
-- VALUES('3', '27', 'ONE MESSAGES');


