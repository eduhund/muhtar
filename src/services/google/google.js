import fs from "fs";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import log from "../log4js/logger.js";
import { google } from "googleapis";
import readline from "readline";

import config from "../../../config.json" assert { type: "json" };

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const TOKEN_PATH = path.resolve(__dirname, "token.json");

export const client = new google.auth.OAuth2(
  process.env.GOOGlE_CLIENT_ID,
  process.env.GOOGLE_SECRET,
  config.google.auth.redirect_uris[0]
);

export const sheets = google.sheets({ auth: client, version: "v4" });

/**
 * Функция запрашивает генерацию нового токена,
 * сохраняет его в файл и возвращает токен.
 * _Важно_, что в первый раз бота нужно запускать в интерактивной консоли,
 * чтобы ввести код подтверждения для Google
 * @returns credentials(google.auth.Credentials) -- данные авторизации
 */
async function generateNewToken(client) {
  const url = client.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  // В первый раз нам нужно запросить у пользователя код подтверждения разрешений
  // Поэтому в первый раз приложение нужно запускать в интерактивной консоли
  const rlPromise = new Promise((resolve, reject) => {
    const rl = readline.createInterface(process.stdin, process.stdout);
    rl.question(">> Enter code from " + url + " here: ", (code) => {
      resolve(code);
    });
  });
  const code = await rlPromise;
  const { tokens } = await client.getToken(code);
  log.info("Done generating new auth token for google");
  return tokens;
}

/**
 * Функция производит авторизацию Google API
 * @returns authClient(google.auth.OAuth2Client) -- клиент OAuth2 для Google
 */
export async function auth() {
  let token;
  try {
    const tokenJson = fs.readFileSync(TOKEN_PATH, {
      encoding: "utf-8",
    });
    token = JSON.parse(tokenJson);
  } catch (e) {
    throw new Error("Can't read Google's token file\n", e);
  }

  if (Object.keys(token) === 0) {
    token = await generateNewToken(client);
    fs.writeFile(TOKEN_PATH, JSON.stringify(token), () => {
      log.debug("Done saving new token");
    });
  }

  client.setCredentials(token);
  log.info("Done authenticating at Google");
}
