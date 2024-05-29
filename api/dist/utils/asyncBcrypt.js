"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.genSalt = genSalt;
exports.genHash = genHash;
const bcrypt = require("bcryptjs");

function genSalt(password) {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        reject(err);
      } else {
        resolve({
          salt: salt
        });
      }
    });
  });
}

function genHash(salt, password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, salt, function (err, hash) {
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
