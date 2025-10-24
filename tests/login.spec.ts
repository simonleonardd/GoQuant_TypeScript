import { expect, test, Page } from '@playwright/test';
import { valid_URL, gotrade_URL } from '../constants/linkConstant';
import { LoginPage } from '../pages/loginPage';
import { valid_UserEmail, valid_Password, invalid_UserEmail, invalid_Password } from '../constants/loginConstant';
import { loginLocators } from '../locators/loginLocators';

// Test for successful login page navigation using valid credentials
test('Successful Login Page Navigation', async ({ page }: { page: Page }): Promise<void> => {
  const loginPage = new LoginPage(page);
  await page.goto(valid_URL);
  await loginPage.login(valid_UserEmail, valid_Password);
  await expect(page).toHaveURL(gotrade_URL, { timeout: 5000 });
});

// Test for invalid login attempt with incorrect userEmail
test('Invalid userEmail Login Attempt', async ({ page }: { page: Page }): Promise<void> => {
  const loginPage = new LoginPage(page);
  await page.goto(valid_URL);
  await loginPage.login(invalid_UserEmail, valid_Password);

  const errorPopup = page.locator(loginLocators.incorrectUserEmailErrorMessage);
  await expect(errorPopup).toBeVisible({ timeout: 5000 });
  await expect(errorPopup).toHaveText('The user was not found in the system');
});

// Test for invalid login attempt with incorrect password
test('Invalid Password Login Attempt', async ({ page }: { page: Page }): Promise<void> => {
  const loginPage = new LoginPage(page);
  await page.goto(valid_URL);
  await loginPage.login(valid_UserEmail, invalid_Password);

  const errorPopup = page.locator(loginLocators.incorrectPasswordErrorMessage);
  await expect(errorPopup).toBeVisible({ timeout: 5000 });
  await expect(errorPopup).toHaveText('The password is invalid');
});
