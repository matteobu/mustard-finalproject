const bcrypt = require("bcryptjs");
const { genSalt, hash, compare } = bcrypt;

module.exports.compare = compare;
module.exports.hash = (userPassword) =>
    genSalt().then((salt) => hash(userPassword, salt));

