
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


-- LAKE INFORMATION
-- INSERT INTO routes (name, location, distance, grade, path)
-- VALUES('Mauerweg am Wasser Loop', 'lake', '35', 'intermediate', 'cycle path');

-- INSERT INTO routes (name, location, distance, grade, path)
-- VALUES('Durch den Wald – Müggelsee Loop', 'lake', '35', 'intermediate', 'off road');

-- INSERT INTO routes (name, location, distance, grade, path)
-- VALUES('Loop from Altstadt Spandau', 'lake', '36', 'easy', 'cycle path');

-- INSERT INTO routes (name, location, distance, grade, path)
-- VALUES('Pfaueninselchaussee – Grunewaldturm Loop', 'lake', '68', 'intermediate', 'cycle path');

-- INSERT INTO routes (name, location, distance, grade, path)
-- VALUES('Blick auf Werder', 'lake', '45', 'easy', 'cycle path');



-- CITY INFORMATION

-- INSERT INTO routes (name, location, distance, grade, path)
-- VALUES('Mauerweg along Teltowkanal', 'city', '43', 'intermediate', 'cycle path');

-- INSERT INTO routes (name, location, distance, grade, path)
-- VALUES('Berliner Mauerweg Loop', 'city', '30', 'easy', 'off road');

-- INSERT INTO routes (name, location, distance, grade, path)
-- VALUES('Karpfenteiche – Schlosspark', 'city', '28', 'intermediate', 'cycle path');

-- INSERT INTO routes (name, location, distance, grade, path)
-- VALUES('Bergmannkiez', 'city', '16', 'easy', 'cycle path');

-- INSERT INTO routes (name, location, distance, grade, path)
-- VALUES('Gendarmenmarkt Loop', 'city', '32', 'intermediate', 'cycle path');


-- FOREST INFORMATION

-- INSERT INTO routes (name, location, distance, grade, path)
-- VALUES('Round Trip in Rahnsdorf', 'forest', '35', 'easy', 'cycle path');

-- INSERT INTO routes (name, location, distance, grade, path)
-- VALUES('Havelland Loop', 'forest', '85', 'intermediate', 'cycle path');

-- INSERT INTO routes (name, location, distance, grade, path)
-- VALUES('Pankeweg – Liepnitzsee Loop', 'forest', '55', 'easy', 'cycle path');

-- INSERT INTO routes (name, location, distance, grade, path)
-- VALUES('Schwielowsee Loop', 'forest', '100', 'intermediate', 'off road');

-- INSERT INTO routes (name, location, distance, grade, path)
-- VALUES('Gabelfelder Radweg Loop', 'forest', '55', 'easy', 'cycle path');




-- grade "easy or intermediate"
-- path "off road or cycle path"
 




CREATE TABLE favorites(
      id SERIAL PRIMARY KEY,
      sender_id INT REFERENCES users(id) NOT NULL,
      recipient_id INT REFERENCES routes(id) NOT NULL,
      accepted BOOLEAN DEFAULT true);

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


