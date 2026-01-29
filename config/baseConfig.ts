import { config as dotenvConfig } from 'dotenv';
import { join } from 'path';

dotenvConfig({ path: join(process.cwd(), '.env') });

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`❌ Missing env variable: ${name}`);
  }
  return value;
}

export const BASE_URL = requireEnv('BASE_URL');

export const USER = {
  email: requireEnv('USER_EMAIL'),
  password: requireEnv('USER_PASSWORD'),
  fullName: requireEnv('USER_NAME'),
};
