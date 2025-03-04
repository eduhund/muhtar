import log from "../log4js/logger.js";
import express from "express";
import cors from "cors";

const server = express();
const { SERVER_PORT = 8081 } = process.env;

server.use(cors());

server.use(express.urlencoded({ extended: true }));

server.use(express.json());

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
