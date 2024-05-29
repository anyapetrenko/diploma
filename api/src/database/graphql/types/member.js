const { ApolloError } = require('apollo-server-express');
const models = require('../../database/models');


export default class Member {
  static resolver() {
    return {
      Query: {
        getMembers: async(obj, {teamId}, context, info) => {
            return await models.Member.findAll({where:{teamId}});
        }
      },
      Member:{
        team: (member) => member.getTeam()
      },
      Mutation: {
        addMember: async (obj, {input}, context, info) => {
            return await models.Member.create(input);
        },
      },
    };
  }

  static typeDefs() {
    return `
        type Member {
            id: Int
            teamId: Int
            team: Team
            name: String
        }

        input MemberInput {
            name: String
            teamId: Int
        }
    `;
  }
}
