const { ApolloError } = require('apollo-server-express');
const models = require('../../database/models');
const {genHash,genSalt} = require("../../utils/asyncBcrypt");
const sendMail = require("../../mail")
const moment = require("moment");
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');

export default class Event {
  static resolver() {
    return {
      Query: {
        event: async(obj, {url_code}, context, info) => {
          const event = await models.TeamEvent.findOne({where:{url_code}});
          return event;
        },
        coordEvent: async(obj, {url_code}, context, info) => {
          const coord = await models.User.findOne({where:{url_identity:url_code}});
          const event = await models.Event.findOne({where:{userId:coord.dataValues.id}});
          return event;
        },
        eventToEdit: async(obj, {eventId}, context, info) => {
          const event =  await models.Event.findOne({where:{id:eventId}});
          return event;
        },
        events: async(obj, {page,limit,sort}, context, info) => {
          const events = await models.Event.findAll({limit:limit,offset:(page*limit),order:[[sort ,'DESC']]});
          const eventsCount = (await models.Event.findAll()).length;
          
          return {events,eventsCount}
        }
      },
      Event:{
        game: (event) => event.getGame(),
        coordinator: (event) => event.getUser(),
        teamEvents: (event) => event.getTeamEvents(),
      },
      Mutation: {
        addEvent: async (obj, {input}, context, info) => {
          //Check if event name or url is used
          const currentNameElement = await models.Event.findOne({where:{event_name:input.eventName}})
          if(currentNameElement) throw new ApolloError("eventName:Event name is used","401")
          const currentUrlElement = await models.User.findOne({where:{url_identity:input.eventUrl}})
          if(currentUrlElement) throw new ApolloError("eventUrl:Event URL is used","401")
          //Check incorrect date
          if(Date.parse(input.startDatetime) < Date.parse(new Date())) throw new ApolloError("date:Date can't be in past","401");
          if((Date.parse(input.startDatetime) - Date.parse(new Date())) < (process.env.MIN_TIME_BEFORE_GAME*60*1000)) throw new ApolloError("time:Min time to start is 15 min","401");

          const salt = await genSalt();
          const hash = await genHash(salt.salt,input.coordinatorPass);
          const crypt_password = cryptr.encrypt(input.coordinatorPass);


          const newUser = await models.User.create({role:'coordinator',password:hash.hash,login:input.coordinatorName,email:input.coordinatorEmail,url_identity:input.eventUrl,crypt_password})
          models.Event.create({
            event_name:input.eventName,
            customer:input.customer,
            description:input.description,
            gameId:input.gameId,
            max_teams_number:input.teamsNumber,
            teams_number:0,
            duration:input.duration,
            start_datetime:input.startDatetime,
            userId: newUser.dataValues.id,
            state: 'Upcoming'
          })
        },
        editEvent: async (obj, {input}, context, info) => {
          //Check if event name or url is used
          const currentNameElement = await models.Event.findOne({where:{event_name:input.eventName,id:{$not:input.eventId}}})
          if(currentNameElement) throw new ApolloError("eventName:Event name is used","401")
          const currentUrlElement = await models.User.findOne({where:{url_identity:input.eventUrl,id:{$not:input.coordId}}})
          if(currentUrlElement) throw new ApolloError("eventUrl:Event URL is used","401")
          //Check incorrect date
          if(Date.parse(input.startDatetime) < Date.parse(new Date())) throw new ApolloError("date:Date can't be in past","401");
          if((Date.parse(input.startDatetime) - Date.parse(new Date())) < (process.env.MIN_TIME_BEFORE_GAME*60*1000)) throw new ApolloError("time:Min time to start is 15 min","401");


          console.log("Inp",input);

          if(input.coordinatorPass === ''){
            await models.User.update({
              login:input.coordinatorName,
              email:input.coordinatorEmail,
              url_identity:input.eventUrl
            },{where:{id:input.coordId}});
          }
          else{
            const salt = await genSalt();
            const hash = await genHash(salt.salt,input.coordinatorPass);
            const crypt_password = cryptr.encrypt(input.coordinatorPass);

            await models.User.update({
              login:input.coordinatorName,
              email:input.coordinatorEmail,
              url_identity:input.eventUrl,
              password:hash.hash,
              crypt_password
            },{where:{id:input.coordId}});
          }

          await models.Event.update({
            event_name:input.eventName,
            customer:input.customer,
            description:input.description,
            gameId:input.gameId,
            max_teams_number:input.teamsNumber,
            duration:input.duration,
            start_datetime:input.startDatetime,
          },{where:{id:input.eventId}});
        },
        reschedule:async (obj, {start_datetime,id}, context, info) => {
            await models.Event.update({
              start_datetime
            },{where:{id}});
        },
        notifyCoordinator: async(obj, {eventId,origin}, context, info) => {
          const event = await models.Event.findOne({where:{id:eventId},include:{model:models.User}});

          let {event_name,start_datetime} = event.dataValues;
          let {login,email,url_identity,password,crypt_password} = event.User.dataValues;
          start_datetime = moment(start_datetime).format('DD/MM/YYYY HH:MM');
          const data ={title:event_name,date:start_datetime,login,email,url: origin + url_identity,password,crypt_password};

          sendMail(data);
        },
        cancelEvent: async(obj, {eventId}, context, info) => {
          models.Event.update({state:"canceled"},{where:{id:eventId}});
        }
      },
    };
  }

  static typeDefs() {
    return `
        type Event {
            id: Int
            event_name: String
            customer: String
            description: String
            gameId: Int
            game: Game
            state: String
            duration: Int
            start_datetime: String
            max_teams_number: Int
            teams_number: Int
            userId: Int
            coordinator: User
            teamEvents: [TeamEvent]
        }

        input EventInput {
            eventName: String
            eventUrl: String
            customer: String
            duration: Int
            startDatetime: String
            coordinatorName: String
            coordinatorEmail: String
            coordinatorPass: String
            gameId: Int
            teamsNumber: Int
            description: String
        }

        input EventEditInput {
          eventName: String
          eventUrl: String
          customer: String
          duration: Int
          startDatetime: String
          coordinatorName: String
          coordinatorEmail: String
          coordinatorPass: String
          gameId: Int
          teamsNumber: Int
          description: String
          eventId: Int
          coordId:Int
      }
    `;
  }
}