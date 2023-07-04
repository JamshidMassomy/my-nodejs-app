import { genSalt, hash, compareSync } from 'bcrypt';
// import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export const encrypt = async (plainTextPassword: string) => {
  const salt = await genSalt(SALT_ROUNDS);
  const hashedPassword = await hash(plainTextPassword, salt);
  return hashedPassword;
};

export const matchPassword = async (
  hashedPassword: string,
  plainTextPassword: string,
) => {
  return await compareSync(plainTextPassword, hashedPassword);
};
