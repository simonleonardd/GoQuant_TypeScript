import { test, expect, APIResponse } from '@playwright/test';
import {
  valid_UserEmail,
  valid_Password,
  invalid_UserEmail,
  invalid_Password,
} from '../constants/loginConstant';

const BASE_URL: string = 'https://test1.gotrade.goquant.io';

test.describe('🔐 Login API Tests', () => {
  // ✅ 1. Successful login
  test('✅ Successful Login', async ({ request }) => {
    const response: APIResponse = await request.get(`${BASE_URL}/auth/login`, {
      data: {
        email: valid_UserEmail,
        password: valid_Password,
      },
    });

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    console.log('✅ Successful login response:');
  });

  // ❌ 2. Invalid username // Not able to asset due to application limitations
  test('❌ Invalid Username', async ({ request }) => {
    const response: APIResponse = await request.post(`${BASE_URL}/auth/login`, {
      data: {
        email: invalid_UserEmail,
        password: valid_Password,
      },
    });

    expect(response.ok()).toBeFalsy();
    expect(response.status()).toContain(404);

    console.log('⚠️ Invalid username response');
  });

  // ❌ 3. Invalid password // Not able to asset due to application limitations
  test('❌ Invalid Password', async ({ request }) => {
    const response: APIResponse = await request.post(`${BASE_URL}/auth/login`, {
      data: {
        email: valid_UserEmail,
        password: invalid_Password,
      },
    });

    expect(response.ok()).toBeFalsy();
    expect(404).toContain(response.status());
  });
});
