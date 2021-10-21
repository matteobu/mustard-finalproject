const spicedPg = require("spiced-pg");
const database = "mustard-socialnetwork";

let db;

if (process.env.DATABASE_URL) {
    db = spicedPg(process.env.DATABASE_URL);
} else {
    const { dbUserName, dbPassword } = require("../../secrets");
    db = spicedPg(
        `postgres:${dbUserName}:${dbPassword}@localhost:5432/${database}`
    );
}

// ADD USER to users TABLE

module.exports.addUser = (first, last, email, password) => {
    const q = `INSERT INTO users (first, last, email, password)
                VALUES ($1, $2, $3, $4) RETURNING id`;

    const params = [first, last, email, password];
    return db.query(q, params);
};

// ALL THE INFO FROM A USER
module.exports.usersStarInformation = (id) => {
    return db.query(`SELECT * FROM users WHERE id = $1`, [id]);
};
module.exports.userInfoProfile = (id) => {
    return db.query(
        `SELECT users.id, first, last, bio, pic_url, accepted
        FROM users 
        LEFT JOIN friendships 
        ON users.id = sender_id
        OR users.id = recipient_id
        WHERE users.id = $1`,
        [id]
    );
};

module.exports.onlineUserIDsArrayProfileInfo = (IDs) => {
    return db.query(
        `SELECT users.id, first, last, pic_url, sender_id, recipient_id, accepted
        FROM users 
        LEFT JOIN friendships 
        ON users.id = sender_id
        OR users.id = recipient_id
        WHERE users.id = ANY($1)`,
        [IDs]
    );
};
module.exports.onlineFriendsInfo = (IDs) => {
    return db.query(
        `SELECT users.id, first, last, pic_url FROM friendships
        JOIN users
        ON (accepted = true AND recipient_id = ANY($1) AND sender_id = users.id)
        OR (accepted = true AND sender_id = ANY($1) AND recipient_id = users.id) `,
        [IDs]
    );
};

// CHECKING PASSWORD FROM EMAIL
module.exports.listID = (email) => {
    return db.query(`SELECT password, id FROM users WHERE email = $1`, [email]);
};

// CHECK EMAIL IF IS ON THE DB
module.exports.checkEmail = (email) => {
    return db.query(`SELECT id FROM users WHERE email = $1 RETURNING id`, [
        email,
    ]);
};

// CODE CHECK AND ADDING TO TABLE
module.exports.addCode = (email, code) => {
    const params = [email, code];
    const q = `
    INSERT INTO password_reset_codes
    (email, code)
    VALUES ($1, $2)
     `;
    return db.query(q, params);
};

module.exports.checkCode = (email) => {
    const params = [email];
    const q = `
    SELECT  code
    FROM password_reset_codes
    WHERE email=$1 
    AND CURRENT_TIMESTAMP - created_at < INTERVAL '10 mutes'
    ORDER BY created_at DESC
    LIMIT 1
     `;
    return db.query(q, params);
};

// UPDATING TABLE QUERY

module.exports.updateUserPsw = (email, password) => {
    const q = `UPDATE users 
            SET password = $2 
            WHERE email= $1 RETURNING id`;

    const params = [email, password];
    return db.query(q, params);
};

module.exports.updateBio = (id, bio) => {
    const q = `UPDATE users 
            SET bio = $2 
            WHERE id= $1 RETURNING id`;

    const params = [id, bio];
    return db.query(q, params);
};

// TO UPDATE ACCORDING TO THIS PROJECT , THIS IS FROM IMAGEBOARD
module.exports.uploadImages = (url, id) => {
    const q = `UPDATE users
            SET pic_url = $1 
            WHERE id = $2`;
    const params = [url, id];
    return db.query(q, params);
};

// LAST THREE USERS and ALL THE USER THAT MATCHES the INPUT FIELD

module.exports.lastThreeUsers = () => {
    return db.query(
        `
        SELECT first, last, id, pic_url, bio
        FROM users
        ORDER BY id DESC
        LIMIT 3
        `
    );
};

module.exports.allMatchUsers = (input) => {
    return db.query(
        `
                SELECT id, first, last, pic_url 
                FROM users 
                WHERE first 
                ILIKE ($1)
                LIMIT 8
                `,
        [input + "%"]
    );
};

// FRIENDSHIP CHECK on friendship TABLE
module.exports.checkFriendship = (userID, otherUserID) => {
    const q = `
            SELECT * FROM friendships
            WHERE (recipient_id = $1 AND sender_id = $2)
            OR (recipient_id = $2 AND sender_id = $1)
            `;
    const params = [userID, otherUserID];
    return db.query(q, params);
};
module.exports.checkFriendshipRequests = (userID) => {
    const q = `
            SELECT * FROM friendships
            WHERE (recipient_id = $1 )
            `;
    const params = [userID];
    return db.query(q, params);
};
module.exports.makeFriendship = (userID, otherUserID) => {
    const q = `
            INSERT INTO friendships (sender_id, recipient_id) 
            VALUES ($1, $2) 
            RETURNING accepted
            `;
    const params = [userID, otherUserID];
    return db.query(q, params);
};

module.exports.confirmFriendship = (otherUserID, userID) => {
    const params = [otherUserID, userID];
    const q = `
        UPDATE friendships
        SET accepted = true
        WHERE (sender_id = $1 AND recipient_id= $2)
        RETURNING accepted
    `;
    return db.query(q, params);
};

module.exports.deleteFriendship = (otherUserID, userID) => {
    const q = `
            DELETE FROM friendships
            WHERE (recipient_id = $1 AND sender_id = $2)
            OR (recipient_id = $2 AND sender_id = $1)
            `;
    const params = [otherUserID, userID];
    return db.query(q, params);
};

// FRIENDSHIP MANAGEMENT ON REDUX
// FIRST ON is for wannabees

module.exports.reduxFriendhipCheck = (userID) => {
    const q = `
    SELECT users.id, first, last, pic_url, accepted, recipient_id, sender_id
    FROM friendships
    JOIN users
    ON (accepted = false AND recipient_id = $1 AND sender_id = users.id) 
    OR (accepted = false AND sender_id = $1 AND recipient_id = users.id) 
    OR (accepted = true AND recipient_id = $1 AND sender_id = users.id)
    OR (accepted = true AND sender_id = $1 AND recipient_id = users.id) 
`;

    const params = [userID];
    return db.query(q, params);
};

// CHAT

module.exports.lastThenMessages = () => {
    return db.query(
        `
        SELECT chat.id, sender_id, message, first, last, pic_url, chat.created_at
        FROM chat
        JOIN users
        ON sender_id = users.id
        ORDER BY id DESC
        LIMIT 10
        `
    );
};
module.exports.lastMessage = () => {
    const q = `
    SELECT chat.id, sender_id, message, first, last, pic_url, chat.created_at
    FROM chat
    JOIN users
    ON sender_id = users.id
    ORDER BY id DESC
    LIMIT 1
        `;
    return db.query(q);
};

module.exports.insertMessage = (userID, message) => {
    const q = `
        INSERT INTO chat (sender_id, message)
        VALUES($1, $2)
        RETURNING id
        `;
    const params = [userID, message];
    return db.query(q, params);
};
// PRIVATE CHAT

module.exports.lastThenPrivateMessages = (userID, otherUserID) => {
    const q = `
        SELECT *
        FROM pvt_chat
        JOIN users
        ON (sender_id = users.id)
        WHERE (recipient_id = $1 AND sender_id = $2)
        OR (sender_id = $1 AND recipient_id = $2)
        ORDER BY pvt_chat.id DESC
        LIMIT 10
        `;
    const params = [userID, otherUserID];
    return db.query(q, params);
};

module.exports.lastPrivateMessage = () => {
    const q = `
    SELECT *
    FROM pvt_chat
    JOIN users
    ON sender_id = users.id
    ORDER BY pvt_chat.id DESC
    LIMIT 1
        `;
    return db.query(q);
};
module.exports.insertPrivateMessage = (userID, otherUserID, message) => {
    const q = `
        INSERT INTO pvt_chat (sender_id, recipient_id , message)
        VALUES($1, $2, $3)
        RETURNING id
        `;
    const params = [userID, otherUserID, message];
    return db.query(q, params);
};
// i.e. user's first name, last name, image, and chat msg
// INSERT INTO chat (sender_id, message)
// VALUES('3','Third Message');

// FRIENDSHIP CHECK ON SOCKET.IO

module.exports.friendsViaSocket = (userID) => {
    const q = `
    SELECT users.id, first, last, pic_url, accepted, recipient_id, sender_id
    FROM friendships
    JOIN users
    ON  (accepted = true AND recipient_id = $1 AND sender_id = users.id)
    OR (accepted = true AND sender_id = $1 AND recipient_id = users.id) 
`;

    const params = [userID];
    return db.query(q, params);
};
