import log from "../log4js/logger.js";
import express from "express";
import cors from "cors";

import { publicMethods, privateMethods } from "../../API/methods.js";

import { checkAuth } from "./security.js";
import { handlePath, handleResponse } from "./responses.js";
import { validateParams } from "./validator.js";

const { SERVER_PORT = 8081 } = process.env;

const server = express();
const publicRouter = express.Router();
const privateRouter = express.Router();

server.use(cors());
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

privateRouter.use(checkAuth);

for (const { path, method, handler } of publicMethods) {
  publicRouter[method](
    path,
    (req, res, next) => validateParams(path, req, next),
    handler
  );
}

for (const { path, method, handler } of privateMethods) {
  privateRouter[method](
    path,
    (req, res, next) => validateParams(path, req, next),
    handler
  );
}

server.use("/api", publicRouter, privateRouter);

server.use(handleResponse);
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
