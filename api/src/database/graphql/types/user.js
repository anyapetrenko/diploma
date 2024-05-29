const { ApolloError } = require('apollo-server-express');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const models = require('../../database/models');
const {JWT_KEY} = require('../../config/const');
const {genHash,genSalt} = require("../../utils/asyncBcrypt");



export default class User {
  static resolver() {
    return {
      Query: {
        user: async(obj, { }, context, info) => {
            const data = context.user;
            return data;
        },
        loginUser: async (obj, { url_identity,email,password,role }, context, info) => {
            const res = await models.User.findAll({where:{url_identity,role}});

            if(res.length){
                const data = res[0].dataValues;

                const isMatch = await bcrypt.compare(password, data.password)
                if (isMatch) {console.log(data,email);
                    if(role === 'coordinator' && data.email !== email) throw new ApolloError("email:Wrong email","401");

                    const payload = {id: data.id};
                    let token = await jwt.sign(payload, JWT_KEY, {expiresIn: 31556926});
                    return {token}
                } else throw new ApolloError("password:Wrong password","401")
            }
            else throw new ApolloError("email:Wrong URL","401")
        },
      },
      Mutation: {
        addUser: async (obj, {url_identity,login,password,email}, context, info) => {
            const salt = await genSalt();
            const hash = await genHash(salt.salt,password);

            return await models.User.create({url_identity,login,password:hash.hash,login,email,role:"coordinator"});
        },
      },
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
