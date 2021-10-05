const bcrypt = require("bcryptjs");
const { genSalt, hash, compare } = bcrypt;

module.exports.compare = compare;
module.exports.hash = (userPassword) =>
    genSalt().then((salt) => hash(userPassword, salt));

/////// DEMO OF BCRYPT FUNCTIONALITIES

// genSalt()
//     .then((salt) => {
//         console.log("salt :>> ", salt);
//         return hash("safePassword", salt);
//     })
//     .then((hashedPw) => {
//         console.log("hash & salted paswword :>> ", hashedPw);
//         return compare("safePassword", hashedPw);
//     })
//     .then((matchValueOfCompare) => {
//         console.log(
//             "cleartext generates psw in HASH :>> ",
//             matchValueOfCompare
//         );
//     });
