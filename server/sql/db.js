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

// // USER TABLE

module.exports.addUser = (first, last, email, password) => {
    const q = `INSERT INTO users (first, last, email, password)
                VALUES ($1, $2, $3, $4) RETURNING id`;

    const params = [first, last, email, password];
    return db.query(q, params);
};

module.exports.listID = (email) => {
    return db.query(`SELECT password, id FROM users WHERE email = $1`, [email]);
};
module.exports.checkEmail = (email) => {
    return db.query(`SELECT id FROM users WHERE email = $1 RETURNING id`, [
        email,
    ]);
};
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
    AND CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes'
    ORDER BY created_at DESC
    LIMIT 1
     `;
    return db.query(q, params);
};

module.exports.updateUserPsw = (email, password) => {
    const q = `UPDATE users 
            SET password = $2 
            WHERE email= $1 RETURNING id`;

    const params = [email, password];
    return db.query(q, params);
};



// module.exports.listSignature = (usersID) => {
//     console.log("usersID :>> ", usersID);
//     return db.query(
//         `SELECT signature
//                     FROM signatures
//                     WHERE user_id = $1`,
//         [usersID]
//     );
// };
// // user_profile TABLE

// module.exports.userProfile = (city, age, url, userID) => {
//     const q = `INSERT INTO user_profiles (city, age, url, user_id)
//                     VALUES ($1, $2, $3, $4)
//                     RETURNING id`;

//     const params = [city, age, url, userID];
//     return db.query(q, params);
// };

// // SIGNATURES TABLE

// module.exports.addSignature = (signature, userID) => {
//     const q = `INSERT INTO signatures (signature, user_id)
//                      VALUES ($1, $2) RETURNING id`;

//     const params = [signature, userID];
//     return db.query(q, params);
// };

// module.exports.listSigners = () => {
//     return db.query(`SELECT * FROM signatures`);
// };

// // JOIN TABLE
// module.exports.signersJoin = () => {
//     return db.query(
//         `SELECT users.id, users.first, users.last, user_profiles.age, user_profiles.city, user_profiles.url FROM users  JOIN signatures ON users.id = signatures.user_id LEFT JOIN user_profiles ON user_profiles.user_id = signatures.user_id
//         `
//     );
// };

// // SIGNERS LIST ACCORDING TO A CITY
// module.exports.cityDB = (city) => {
//     return db.query(
//         `SELECT users.first, users.last, user_profiles.age, user_profiles.city, user_profiles.url
//         FROM users
//         JOIN signatures ON users.id = signatures.user_id
//         LEFT JOIN user_profiles
//         ON user_profiles.user_id = signatures.user_id
//         WHERE LOWER(user_profiles.city) = LOWER($1)
//         `,
//         [city]
//     );
// };
// // SIGNATURES
// module.exports.getSignature = (usersID) => {
//     return db.query(
//         `SELECT  signature, users.first, users.last
//         FROM signatures
//         JOIN users
//         ON signatures.user_id = users.id
//         WHERE user_id = ($1)`,

//         [usersID]
//     );
// };

// // EDIT PROFILE  GET INFORMATION

// module.exports.profileValue = (usersID) => {
//     return db.query(
//         `SELECT users.first, users.last, users.email, user_profiles.city, user_profiles.age, user_profiles.url
//         FROM users
//         LEFT JOIN user_profiles
//         ON user_profiles.user_id = users.id
//         WHERE (users.id) = ($1)
//         `,
//         [usersID]
//     );
// };

// module.exports.updateUser = (first, last, email, usersID) => {
//     return db.query(
//         `UPDATE users SET first = $1, last= $2, email = $3 WHERE id= $4 RETURNING id`,
//         [first, last, email, usersID]
//     );
// };
// module.exports.updatePassword = (password, usersID) => {
//     return db.query(`UPDATE users SET password = $1 WHERE id= $2`, [
//         password,
//         usersID,
//     ]);
// };

// module.exports.updateProfile = (age, city, url, usersID) => {
//     age = age || null;
//     return db.query(
//         `INSERT INTO user_profiles (age, city, url, user_id) VALUES ($1, $2, $3, $4) ON CONFLICT (user_id) DO UPDATE SET age =$1, city =$2, url=$3`,
//         [age, city, url, usersID]
//     );
// };

// // DELETE SIGNATURE

// module.exports.deleteSignature = (usersID) => {
//     return db.query(`DELETE FROM signatures WHERE (user_id) = ($1)`, [usersID]);
// };

// // DELETE ACCOUNT

// module.exports.deleteProfile = (usersID) => {
//     return db.query(`DELETE FROM user_profiles WHERE (user_id) = ($1)`, [
//         usersID,
//     ]);
// };
// module.exports.deleteAccount = (usersID) => {
//     return db.query(`DELETE FROM users WHERE (id) = ($1)`, [usersID]);
// };
