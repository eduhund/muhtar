import { readFile, writeFile } from "./fs.js";

function rand() {
  return Math.random().toString(36).substring(2);
}

function createToken() {
  return rand() + rand();
}

const tokens = readFile("/temp/", "tokens.json") || {};
export function checkToken(token) {
  return tokens?.[token];
}

export function setToken({ userId }, data) {
  const aceessToken = createToken();
  tokens[aceessToken] = {
    userId,
    ip: data?.ip,
    ts: Date.now(),
    userAgent: data?.userAgent,
    geo: data?.geo,
  };
  writeFile("/temp/", "tokens.json", tokens);
  return aceessToken;
}
