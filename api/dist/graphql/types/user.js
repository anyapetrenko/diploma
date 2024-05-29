"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const { ApolloError } = require('apollo-server-express');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const models = require('../../database/models');
const { JWT_KEY } = require('../../config/const');
const { genHash, genSalt } = require("../../utils/asyncBcrypt");

class User {
    static resolver() {
        return {
            Query: {
                user: (() => {
                    var _ref = _asyncToGenerator(function* (obj, {}, context, info) {
                        const data = context.user;
                        return data;
                    });

                    return function user(_x, _x2, _x3, _x4) {
                        return _ref.apply(this, arguments);
                    };
                })(),
                loginUser: (() => {
                    var _ref2 = _asyncToGenerator(function* (obj, { url_identity, email, password, role }, context, info) {
                        const res = yield models.User.findAll({ where: { url_identity, role } });

                        if (res.length) {
                            const data = res[0].dataValues;

                            const isMatch = yield bcrypt.compare(password, data.password);
                            if (isMatch) {
                                console.log(data, email);
                                if (role === 'coordinator' && data.email !== email) throw new ApolloError("email:Wrong email", "401");

                                const payload = { id: data.id };
                                let token = yield jwt.sign(payload, JWT_KEY, { expiresIn: 31556926 });
                                return { token };
                            } else throw new ApolloError("password:Wrong password", "401");
                        } else throw new ApolloError("email:Wrong URL", "401");
                    });

                    return function loginUser(_x5, _x6, _x7, _x8) {
                        return _ref2.apply(this, arguments);
                    };
                })()
            },
            Mutation: {
                addUser: (() => {
                    var _ref3 = _asyncToGenerator(function* (obj, { url_identity, login, password, email }, context, info) {
                        const salt = yield genSalt();
                        const hash = yield genHash(salt.salt, password);

                        return yield models.User.create({ url_identity, login, password: hash.hash, login, email, role: "coordinator" });
                    });

                    return function addUser(_x9, _x10, _x11, _x12) {
                        return _ref3.apply(this, arguments);
                    };
                })()
            }
        };
    }

    static typeDefs() {
        return `
        enum Roles {
            admin
            coordinator
        }

        type User {
            id: Int
            login: String
            email: String
            role: Roles
            url_identity: String
            crypt_password: String
        }
    `;
    }
}
exports.default = User;