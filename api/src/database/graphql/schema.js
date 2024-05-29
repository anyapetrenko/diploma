import { ApolloServer, gql } from "apollo-server-express";
import { makeExecutableSchema } from "graphql-tools";
import models from "../database/models";
import _ from "lodash";

import User from "./types/user";
import Token from "./types/token";
import Game from "./types/game";
import Part from "./types/part";
import Hint from "./types/hint";
import Member from "./types/member";
import Puzzle from "./types/puzzle";
import Event from "./types/event";
import Team from "./types/team";
import PuzzleStats from "./types/puzzleStats";
import TeamEvent from "./types/teamEvent";
import Mistake from "./types/mistake";
import UsedHint from "./types/usedHint";
import Surrender from "./types/surrender";
import Answer from "./types/answer";

const typeDefs = `
    type Subscription {
      hintWasUsed(eventId: Int!, teamEventId: Int!): HintResponse
      puzzleWasGaveUp(eventId: Int!, teamEventId: Int!): SurrenderResponse
      puzzleWasSolved(eventId: Int!, teamEventId: Int!): AnswerResponse
      puzzleWasUnsolved(eventId: Int!, teamEventId: Int!): Mistake
    }

    ${
      Token.typeDefs() +
      User.typeDefs() +
      Puzzle.typeDefs() +
      Part.typeDefs() +
      Hint.typeDefs() +
      Game.typeDefs() +
      Event.typeDefs() +
      TeamEvent.typeDefs() +
      Member.typeDefs() +
      Team.typeDefs() +
      PuzzleStats.typeDefs() +
      Mistake.typeDefs() +
      UsedHint.typeDefs() +
      Surrender.typeDefs() +
      Answer.typeDefs()
    }
    
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
  return gql`
    ${typeDefs}
  `;
}

function combineResolvers() {
  return _.merge(
    User.resolver(),
    Puzzle.resolver(),
    Hint.resolver(),
    Part.resolver(),
    Game.resolver(),
    Event.resolver(),
    TeamEvent.resolver(),
    Member.resolver(),
    Team.resolver(),
    PuzzleStats.resolver(),
    Mistake.resolver(),
    UsedHint.resolver(),
    Surrender.resolver(),
    Answer.resolver()
  );
}

const SERVER = new ApolloServer({
  typeDefs: combineTypeDefs(),
  resolvers: combineResolvers(),
  context: async ({ req, res }) => {
    const context = { user: null };

    const token = req.headers.authorization;
    if (!token) return context;

    const user = await models.User.getUserByToken(token);
    if (user) context.user = user;

    return context;
  },

  // Это нужно для теста на дэве
  // playground: {
  //   endpoint: '/graphql',
  //   subscriptionsEndpoint: process.env.GRAPHQL_SUBSCRIPTIONS_URL
  // },
});

export default SERVER;
export const SCHEMA = makeExecutableSchema({
  typeDefs: combineTypeDefs(),
  resolvers: combineResolvers(),
});
