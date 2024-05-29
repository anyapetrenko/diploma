const { ApolloError } = require('apollo-server-express');
const models = require('../../database/models');


export default class Team {
  static resolver() {
    return {
      Query: {
        currentTeam: async(obj, {url_code}, context, info) => {
          return await models.TeamEvent.findOne({where:{url_code}});
        },
        teams: async(obj, {url_code}, context, info) => {
          return await models.TeamEvent.findOne({where:{url_code}});
        }
      },
      Team:{
        members: (team) => team.getMembers()
      },
      Mutation: {
        addTeam: async (obj, {input}, context, info) => {
          const newTeam = await models.Team.create({team_name:input.team_name,description:input.notes});
          input.members.map(elem=>{
            models.Member.create({teamId:newTeam.dataValues.id,name:elem});
          })
          models.Event.increment('teams_number',{by:1,where:{id:input.eventId}});

          const newTeamEvent = await models.TeamEvent.create({eventId:input.eventId,teamId:newTeam.dataValues.id,url_code:input.url_code,total_time:0,score:0,place:0});

          let games = await models.Event.findOne({
            where:{id:input.eventId},
            include: {
              model:models.Game,
              include:{
                model:models.Part,
                include:{
                  model:models.Puzzle
                }
              }
            },
          });

          const parts = games.Game.Parts;
          parts.map(elem=>{
            models.PuzzleStat.create({teamEventId:newTeamEvent.dataValues.id,puzzleId:elem.Puzzle.dataValues.id,time_used:0})
          })
        },
        editTeam: async (obj, {input}, context, info) => {
          models.Team.update({team_name:input.team_name,description:input.notes},{where:{id:input.teamId}})
          input.memberIds.map((elem,index)=>{
            models.Member.update({name:input.members[index]},{where:{id:elem}})
          })
        },
        removeTeam: async (obj, {teamId,eventId}, context, info) => {
          models.Team.destroy({where:{id:teamId}});
          models.Event.increment('teams_number',{by:-1,where:{id:eventId}});
        }
      },
    };
  }

  static typeDefs() {
    return `
        type Team {
            id: Int
            team_name: String,
            description: String,
            members: [Member]
        }

        input TeamInput {
            team_name: String,
            description: String,
        }
    `;
  }
}
