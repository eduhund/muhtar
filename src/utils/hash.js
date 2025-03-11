import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export async function hash(data) {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hash = await bcrypt.hash(data, salt);
  return hash;
}

// Проверка пароля при логине
export async function compare(inputData, storedHash) {
  return await bcrypt.compare(inputData, storedHash);
}
