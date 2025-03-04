import { readFile, writeFile } from "../fs/fs.js";

function rand() {
  return Math.random().toString(36).substring(2);
}

function createToken() {
  const accessToken = rand() + rand();
  const refreshToken = rand();
  const expiresAt = Date.now() + 5 * 24 * 60 * 60 * 1000;
  return {
    accessToken,
    expiresAt,
    refreshToken,
  };
}

const tokens = readFile("/temp/", "tokens.json") || {};
export function checkToken(token) {
  return tokens?.[token];
}

export function setToken({ userId }, data) {
  const { accessToken, expiresAt, refreshToken } = createToken();
  tokens[accessToken] = {
    userId,
    expiresAt,
    refreshToken,
    ip: data?.ip,
    ts: Date.now(),
    userAgent: data?.userAgent,
    geo: data?.geo,
  };
  writeFile("/temp/", "tokens.json", tokens);
  return newToken;
}
