'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const { ApolloError } = require('apollo-server-express');
const models = require('../../database/models');
const { genHash, genSalt } = require("../../utils/asyncBcrypt");
const sendMail = require("../../mail");
const moment = require("moment");
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');

class Event {
  static resolver() {
    return {
      Query: {
        event: (() => {
          var _ref = _asyncToGenerator(function* (obj, { url_code }, context, info) {
            const event = yield models.TeamEvent.findOne({ where: { url_code } });
            return event;
          });

          return function event(_x, _x2, _x3, _x4) {
            return _ref.apply(this, arguments);
          };
        })(),
        coordEvent: (() => {
          var _ref2 = _asyncToGenerator(function* (obj, { url_code }, context, info) {
            const coord = yield models.User.findOne({ where: { url_identity: url_code } });
            const event = yield models.Event.findOne({ where: { userId: coord.dataValues.id } });
            return event;
          });

          return function coordEvent(_x5, _x6, _x7, _x8) {
            return _ref2.apply(this, arguments);
          };
        })(),
        eventToEdit: (() => {
          var _ref3 = _asyncToGenerator(function* (obj, { eventId }, context, info) {
            const event = yield models.Event.findOne({ where: { id: eventId } });
            return event;
          });

          return function eventToEdit(_x9, _x10, _x11, _x12) {
            return _ref3.apply(this, arguments);
          };
        })(),
        events: (() => {
          var _ref4 = _asyncToGenerator(function* (obj, { page, limit, sort }, context, info) {
            const events = yield models.Event.findAll({ limit: limit, offset: page * limit, order: [[sort, 'DESC']] });
            const eventsCount = (yield models.Event.findAll()).length;

            return { events, eventsCount };
          });

          return function events(_x13, _x14, _x15, _x16) {
            return _ref4.apply(this, arguments);
          };
        })()
      },
      Event: {
        game: event => event.getGame(),
        coordinator: event => event.getUser(),
        teamEvents: event => event.getTeamEvents()
      },
      Mutation: {
        addEvent: (() => {
          var _ref5 = _asyncToGenerator(function* (obj, { input }, context, info) {
            //Check if event name or url is used
            const currentNameElement = yield models.Event.findOne({ where: { event_name: input.eventName } });
            if (currentNameElement) throw new ApolloError("eventName:Event name is used", "401");
            const currentUrlElement = yield models.User.findOne({ where: { url_identity: input.eventUrl } });
            if (currentUrlElement) throw new ApolloError("eventUrl:Event URL is used", "401");
            //Check incorrect date
            if (Date.parse(input.startDatetime) < Date.parse(new Date())) throw new ApolloError("date:Date can't be in past", "401");
            if (Date.parse(input.startDatetime) - Date.parse(new Date()) < process.env.MIN_TIME_BEFORE_GAME * 60 * 1000) throw new ApolloError("time:Min time to start is 15 min", "401");

            const salt = yield genSalt();
            const hash = yield genHash(salt.salt, input.coordinatorPass);
            const crypt_password = cryptr.encrypt(input.coordinatorPass);

            const newUser = yield models.User.create({ role: 'coordinator', password: hash.hash, login: input.coordinatorName, email: input.coordinatorEmail, url_identity: input.eventUrl, crypt_password });
            models.Event.create({
              event_name: input.eventName,
              customer: input.customer,
              description: input.description,
              gameId: input.gameId,
              max_teams_number: input.teamsNumber,
              teams_number: 0,
              duration: input.duration,
              start_datetime: input.startDatetime,
              userId: newUser.dataValues.id,
              state: 'Upcoming'
            });
          });

          return function addEvent(_x17, _x18, _x19, _x20) {
            return _ref5.apply(this, arguments);
          };
        })(),
        editEvent: (() => {
          var _ref6 = _asyncToGenerator(function* (obj, { input }, context, info) {
            //Check if event name or url is used
            const currentNameElement = yield models.Event.findOne({ where: { event_name: input.eventName, id: { $not: input.eventId } } });
            if (currentNameElement) throw new ApolloError("eventName:Event name is used", "401");
            const currentUrlElement = yield models.User.findOne({ where: { url_identity: input.eventUrl, id: { $not: input.coordId } } });
            if (currentUrlElement) throw new ApolloError("eventUrl:Event URL is used", "401");
            //Check incorrect date
            if (Date.parse(input.startDatetime) < Date.parse(new Date())) throw new ApolloError("date:Date can't be in past", "401");
            if (Date.parse(input.startDatetime) - Date.parse(new Date()) < process.env.MIN_TIME_BEFORE_GAME * 60 * 1000) throw new ApolloError("time:Min time to start is 15 min", "401");

            console.log("Inp", input);

            if (input.coordinatorPass === '') {
              yield models.User.update({
                login: input.coordinatorName,
                email: input.coordinatorEmail,
                url_identity: input.eventUrl
              }, { where: { id: input.coordId } });
            } else {
              const salt = yield genSalt();
              const hash = yield genHash(salt.salt, input.coordinatorPass);
              const crypt_password = cryptr.encrypt(input.coordinatorPass);

              yield models.User.update({
                login: input.coordinatorName,
                email: input.coordinatorEmail,
                url_identity: input.eventUrl,
                password: hash.hash,
                crypt_password
              }, { where: { id: input.coordId } });
            }

            yield models.Event.update({
              event_name: input.eventName,
              customer: input.customer,
              description: input.description,
              gameId: input.gameId,
              max_teams_number: input.teamsNumber,
              duration: input.duration,
              start_datetime: input.startDatetime
            }, { where: { id: input.eventId } });
          });

          return function editEvent(_x21, _x22, _x23, _x24) {
            return _ref6.apply(this, arguments);
          };
        })(),
        reschedule: (() => {
          var _ref7 = _asyncToGenerator(function* (obj, { start_datetime, id }, context, info) {
            yield models.Event.update({
              start_datetime
            }, { where: { id } });
          });

          return function reschedule(_x25, _x26, _x27, _x28) {
            return _ref7.apply(this, arguments);
          };
        })(),
        notifyCoordinator: (() => {
          var _ref8 = _asyncToGenerator(function* (obj, { eventId, origin }, context, info) {
            const event = yield models.Event.findOne({ where: { id: eventId }, include: { model: models.User } });

            let { event_name, start_datetime } = event.dataValues;
            let { login, email, url_identity, password, crypt_password } = event.User.dataValues;
            start_datetime = moment(start_datetime).format('DD/MM/YYYY HH:MM');
            const data = { title: event_name, date: start_datetime, login, email, url: origin + url_identity, password, crypt_password };

            sendMail(data);
          });

          return function notifyCoordinator(_x29, _x30, _x31, _x32) {
            return _ref8.apply(this, arguments);
          };
        })(),
        cancelEvent: (() => {
          var _ref9 = _asyncToGenerator(function* (obj, { eventId }, context, info) {
            models.Event.update({ state: "canceled" }, { where: { id: eventId } });
          });

          return function cancelEvent(_x33, _x34, _x35, _x36) {
            return _ref9.apply(this, arguments);
          };
        })()
      }
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
exports.default = Event;