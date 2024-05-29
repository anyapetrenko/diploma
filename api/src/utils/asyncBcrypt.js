const bcrypt = require("bcryptjs");

// hash the salt
export function genSalt(password) {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, function(err, salt) {
        if (err) {
          reject(err);
        } else {
          resolve({
            salt: salt,
          });
        }
      });
    });
  }
  
// hash the password with the salt
export function genHash(salt, password) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, salt, function(err, hash) {
        if (err) {
          reject(err);
        } else {
          resolve({
            salt: salt,
            password: password,
            hash: hash
          });
        }
      });
    });
  }
  