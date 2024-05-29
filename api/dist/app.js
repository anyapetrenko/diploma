"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _cookieParser = require("cookie-parser");

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _http = require("http");

var _http2 = _interopRequireDefault(_http);

var _schema = require("./graphql/schema.js");

var _schema2 = _interopRequireDefault(_schema);

var _cors = require("cors");

var _cors2 = _interopRequireDefault(_cors);

var _subscriptionsTransportWs = require("subscriptions-transport-ws");

var _graphql = require("graphql");

var _event = require("./database/models/event.js");

var _event2 = _interopRequireDefault(_event);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

require("dotenv").config();

const app = (0, _express2.default)();
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use((0, _cookieParser2.default)());
app.use((0, _cors2.default)());
_schema2.default.applyMiddleware({ app });

const port = process.env.PORT || "4000";
app.set("port", port);
const server = _http2.default.createServer(app);

//Return img from server
app.get("/files/img/:name", (req, res) => {
  res.sendFile(_path2.default.join(__dirname, "../files/img", req.params.name));
});

//Return pdf from server
app.get("/files/pdf/:event/:folder/:name", (() => {
  var _ref = _asyncToGenerator(function* (req, res) {
    const { event, folder, name } = req.params;

    const isAvailable = yield _event2.default.isPdfAvailable(event);
    if (isAvailable) res.sendFile(_path2.default.join(__dirname, "../files/pdf/", folder, name));else res.status(400).send("Can't get file");
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
})());

server.listen(port, () => {
  new _subscriptionsTransportWs.SubscriptionServer({
    execute: _graphql.execute,
    subscribe: _graphql.subscribe,
    schema: _schema.SCHEMA
  }, {
    server: server,
    path: "/subscriptions"
  });
});