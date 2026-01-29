import { expect, type APIRequestContext } from '@playwright/test';
import { testUser } from './testUser';

const API_BASE = 'https://api.practicesoftwaretesting.com';

type LoginResponse = {
  access_token?: string;
  token?: string;
};

export async function loginViaApi(request: APIRequestContext): Promise<LoginResponse> {
  const res = await request.post(`${API_BASE}/users/login`, {
    data: {
      email: testUser.email,
      password: testUser.password,
    },
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  expect(res.ok()).toBeTruthy();

  const json = (await res.json()) as LoginResponse;

  // перевірка, що токен прийшов
  expect(json.access_token, 'access_token is missing').toBeTruthy();

  return json;
}
