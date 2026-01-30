import { config as dotenvConfig } from 'dotenv';
import { join } from 'path';

dotenvConfig({ path: join(process.cwd(), '.env') });

export const BASE_URL =
  process.env.BASE_URL ?? 'https://practicesoftwaretesting.com';

export const USER = {
  email: process.env.USER_EMAIL ?? 'customer@practicesoftwaretesting.com',
  password: process.env.USER_PASSWORD!,
  fullName: process.env.USER_NAME ?? 'Jane Doe',
};
