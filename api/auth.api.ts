import { expect, type APIRequestContext } from "@playwright/test";
import { API_BASE } from "./config";

type LoginResponse = {
  access_token?: string;
  token?: string;
};

export const loginApi = async (
  request: APIRequestContext,
  email: string,
  password: string,
): Promise<string> => {
  const response = await request.post(`${API_BASE}/users/login`, {
    data: { email, password },
  });

  expect(response.ok()).toBeTruthy();

  const jsonData = (await response.json()) as LoginResponse;
  const token = jsonData.access_token ?? jsonData.token;

  if (!token) {
    throw new Error(`Login response has no token: ${JSON.stringify(jsonData)}`);
  }

  return token;
};
