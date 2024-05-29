"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SCHEMA = undefined;

var _apolloServerExpress = require("apollo-server-express");

var _graphqlTools = require("graphql-tools");

var _models = require("../database/models");

var _models2 = _interopRequireDefault(_models);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _user = require("./types/user");

var _user2 = _interopRequireDefault(_user);

var _token = require("./types/token");

var _token2 = _interopRequireDefault(_token);

var _game = require("./types/game");

var _game2 = _interopRequireDefault(_game);

var _part = require("./types/part");

var _part2 = _interopRequireDefault(_part);

var _hint = require("./types/hint");

var _hint2 = _interopRequireDefault(_hint);

var _member = require("./types/member");

var _member2 = _interopRequireDefault(_member);

var _puzzle = require("./types/puzzle");

var _puzzle2 = _interopRequireDefault(_puzzle);

var _event = require("./types/event");

var _event2 = _interopRequireDefault(_event);

var _team = require("./types/team");

var _team2 = _interopRequireDefault(_team);

var _puzzleStats = require("./types/puzzleStats");

var _puzzleStats2 = _interopRequireDefault(_puzzleStats);

var _teamEvent = require("./types/teamEvent");

var _teamEvent2 = _interopRequireDefault(_teamEvent);

var _mistake = require("./types/mistake");

var _mistake2 = _interopRequireDefault(_mistake);

var _usedHint = require("./types/usedHint");

var _usedHint2 = _interopRequireDefault(_usedHint);

var _surrender = require("./types/surrender");

var _surrender2 = _interopRequireDefault(_surrender);

var _answer = require("./types/answer");

var _answer2 = _interopRequireDefault(_answer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const typeDefs = `
    type Subscription {
      hintWasUsed(eventId: Int!, teamEventId: Int!): HintResponse
      puzzleWasGaveUp(eventId: Int!, teamEventId: Int!): SurrenderResponse
      puzzleWasSolved(eventId: Int!, teamEventId: Int!): AnswerResponse
      puzzleWasUnsolved(eventId: Int!, teamEventId: Int!): Mistake
    }

    ${_token2.default.typeDefs() + _user2.default.typeDefs() + _puzzle2.default.typeDefs() + _part2.default.typeDefs() + _hint2.default.typeDefs() + _game2.default.typeDefs() + _event2.default.typeDefs() + _teamEvent2.default.typeDefs() + _member2.default.typeDefs() + _team2.default.typeDefs() + _puzzleStats2.default.typeDefs() + _mistake2.default.typeDefs() + _usedHint2.default.typeDefs() + _surrender2.default.typeDefs() + _answer2.default.typeDefs()}
    
    type Query {
        user: User
        loginUser(url_identity: String!,email: String, password: String!, role: String!): Token
        getPuzzle(id: Int!):Puzzle
        getMembers(teamId: Int!): [Member]
        getTeamEvent(url_code: String!): TeamEvent
        hints(puzzleId: Int!,puzzleStatId: Int!): [Hint]
        teamEvents: [TeamEvent]
        teamEventRates(url_code: String!): TeamEventRate
        teamEventData(url_code: String!): TeamEvent
        puzzleStats(url_code: String!): TeamEvent
        puzzleStatsNumbers(url_code: String!): TeamEvent
        usedHints(puzzleStatId: Int!): [UsedHint]
        surrenders(puzzleStatId: Int!): [Surrender]
        mistakes(puzzleStatId: Int!): [Mistake]
        answers(teamEventId: Int!): [Answer]
        event(url_code: String!): TeamEvent
        coordEvent(url_code: String!): Event
        eventToEdit(eventId: Int!): Event
        events(page: Int!, limit: Int!, sort: String!): EventsResponse
        currentTeam(url_code: String!): TeamEvent
        teams(url_code: String!): TeamEvent
        parts(url_code: String!,teamEventId: Int!): [Part]
        currentGame(url_code: String!): TeamEvent
        games: [Game]
    }
    type Mutation {
        addUser(url_identity: String!,email: String!, login: String!, password: String!): User
        addEvent(input: EventInput!): Event
        editEvent(input: EventEditInput!): Event
        cancelEvent(eventId: Int!): Event
        addPuzzle(input: PuzzleInput!): Puzzle
        addHint(input: HintInput!): Hint
        addPart(input: PartInput!): Part
        addGame(input: GameInput!): Game
        addMember(input: MemberInput!): Member
        addTeam(input: TeamEventInput!): Team
        editTeam(input: TeamEventEditInput!): Team
        removeTeam(teamId: Int!,eventId: Int!): Team
        reschedule(start_datetime: String!, id: Int!): Event
        addPuzzleStats(input: PuzzleStatsInput!): PuzzleStats
        useHint(puzzleId: Int!,puzzleStatId:Int!,url_code:String!): HintResponse
        sendMistake(puzzleId: Int!,text: String!,puzzleStatId:Int!,url_code:String!): Mistake
        sendAnswer(puzzleId: Int!,puzzleStatId:Int!,url_code:String!,teamEventId: Int!): AnswerResponse
        giveUp(puzzleId: Int!,puzzleStatId:Int!,url_code:String!,teamEventId:Int!): SurrenderResponse
        notifyCoordinator(eventId: Int!,origin: String!): Event
    }

    type AnswerResponse {
      url_code:String
      newPart: Part
      newAnswer: Answer
    }
    type HintResponse {
      url_code:String
      newHint: Hint
      newUsedHint: UsedHint
    }
    type SurrenderResponse {
      url_code:String
      newAnswer: Answer
      newSurrender: Surrender
      newPart: Part
    }
    type TeamEventRate{
      teamEvents: [TeamEvent]
      isEndgame: Boolean
    }
    type EventsResponse{
      events:[Event]
      eventsCount: Int
    }
`;

function combineTypeDefs() {
  return _apolloServerExpress.gql`
    ${typeDefs}
  `;
}

function combineResolvers() {
  return _lodash2.default.merge(_user2.default.resolver(), _puzzle2.default.resolver(), _hint2.default.resolver(), _part2.default.resolver(), _game2.default.resolver(), _event2.default.resolver(), _teamEvent2.default.resolver(), _member2.default.resolver(), _team2.default.resolver(), _puzzleStats2.default.resolver(), _mistake2.default.resolver(), _usedHint2.default.resolver(), _surrender2.default.resolver(), _answer2.default.resolver());
}

const SERVER = new _apolloServerExpress.ApolloServer({
  typeDefs: combineTypeDefs(),
  resolvers: combineResolvers(),
  context: (() => {
    var _ref = _asyncToGenerator(function* ({ req, res }) {
      const context = { user: null };

      const token = req.headers.authorization;
      if (!token) return context;

      const user = yield _models2.default.User.getUserByToken(token);
      if (user) context.user = user;

      return context;
    });

    return function context(_x) {
      return _ref.apply(this, arguments);
    };
  })()

  // Это нужно для теста на дэве
  // playground: {
  //   endpoint: '/graphql',
  //   subscriptionsEndpoint: process.env.GRAPHQL_SUBSCRIPTIONS_URL
  // },
});

exports.default = SERVER;
const SCHEMA = exports.SCHEMA = (0, _graphqlTools.makeExecutableSchema)({
  typeDefs: combineTypeDefs(),
  resolvers: combineResolvers()
});