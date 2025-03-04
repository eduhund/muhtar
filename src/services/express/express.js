import log from "../log4js/logger.js";
import express from "express";
import cors from "cors";

import API from "../../API/methods.js";

import { checkAuth } from "./security.js";
import { handlePath, handleResponce } from "./responces.js";

const { SERVER_PORT = 8081 } = process.env;

const server = express();
const api = express.Router();

server.use(cors());
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

server.use("/api", api);

api.use(checkAuth);

for (const { path, method, handler } of API) {
  api[method](path, handler);
}

server.use(handleResponce);
server.use(handlePath);

async function start() {
  return new Promise((resolve, reject) => {
    server.listen(SERVER_PORT, (err) => {
      if (err) {
        return reject(err);
      }
      log.info("Server starts on port", SERVER_PORT);
      return resolve();
    });
  });
}

export default { server, start };
