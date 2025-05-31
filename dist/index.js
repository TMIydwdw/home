"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { MongoMemoryServer } from 'mongodb-memory-server'
require("dotenv/config");
require("module-alias/register");
var validateEnv_1 = __importDefault(require("@/helpers/validateEnv"));
var app_1 = __importDefault(require("./app"));
var setup_1 = require("./setup");
(0, validateEnv_1.default)();
var _a = process.env, MONGO_PATH = _a.MONGO_PATH, PORT = _a.PORT;
var app = new app_1.default(setup_1.controllers, Number(PORT), false, {
    mogodbUri: MONGO_PATH,
});
// MongoMemoryServer.create().then((sever) => {
//   console.log(sever.getUri())
// })
app.listen();
