const { ApolloError } = require('apollo-server-express');
const models = require('../../database/models');


export default class TeamEvent {
  static resolver() {
    return {
      Query: {
        getTeamEvent: async(obj, {url_code}, context, info) => {
            return await models.TeamEvent.findOne({where:{url_code}});
        },
        teamEventData: async(obj, {url_code}, context, info) => {
          const data = await models.TeamEvent.findOne({where:{url_code}});
          return data
        },
        teamEventRates: async(obj, {url_code}, context, info) => {
          let isEndgame = false;
          //Count Game Answers
          let currentEvent = await models.TeamEvent.findOne({
            where:{url_code},
            include: {
              model:models.Event,
              include:{
                model:models.Game
              }
            },
          });
          if(currentEvent !== null) {
              let allTeamEvents = await models.TeamEvent.findAll({
                where:{eventId:currentEvent.Event.id},
                include: {
                  model:models.Answer
                }
              });
    
              let answersCount = 0;
              allTeamEvents.map(async(elem)=>{
                answersCount += elem.dataValues.Answers.length;
              })
    
              const totalAnswersCount = currentEvent.Event.Game.parts_number * currentEvent.Event.teams_number;
              isEndgame = (answersCount === totalAnswersCount);
              if(isEndgame) models.Event.update({state:'finished'},{where:{id:currentEvent.Event.id}});
          }

          //Pack data
          let teamEvents = await models.TeamEvent.findAll({
            order:[['score','DESC']],
            include: {
              model:models.Team,
            }
          });
          return {teamEvents,isEndgame}
        },
        teamEvents: async(obj, {}, context, info) => {
          return await models.TeamEvent.findAll();
        },
      },
      TeamEvent:{
        event: (teamEvent) => teamEvent.getEvent(),
        team: (teamEvent) => teamEvent.getTeam(),
        puzzle_stats: (teamEvent) => teamEvent.getPuzzleStats(),
        answers: (teamEvent) => teamEvent.getAnswers()
      }
    };
  }

  static typeDefs() {
    return `
        type TeamEvent {
            id: Int
            teamId: Int
            team: Team
            eventId: Int
            event: Event
            url_code: String
            total_time: Int
            score: Int
            place: Int
            puzzle_stats: [PuzzleStats]
            answers: [Answer]
        }

        input TeamEventInput {
            eventId: Int
            url_code: String
            team_name: String
            members: [String]
            notes: String
        }

        input TeamEventEditInput {
            teamId: Int
            team_name: String
            members: [String]
            memberIds: [Int]
            notes: String
      }
    `;
  }
}