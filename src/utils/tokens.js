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

export function setToken(userId) {
  const aceessToken = createToken();
  tokens[aceessToken] = {
    userId,
    ts: Date.now(),
  };
  writeFile("/temp/", "tokens.json", tokens);
  return aceessToken;
}
