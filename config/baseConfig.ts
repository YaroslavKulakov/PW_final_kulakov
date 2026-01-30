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
  email: process.env.USER_EMAIL ?? 'customer@practicesoftwaretesting.com',
  password: process.env.USER_PASSWORD!,
  fullName: process.env.USER_NAME ?? 'Jane Doe',
};
