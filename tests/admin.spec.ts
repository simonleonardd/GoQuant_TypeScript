import { expect, test, Page } from '@playwright/test';
import { valid_URL, gotrade_URL, admin_URL } from '../constants/linkConstant';
import { valid_UserEmail, valid_Password } from '../constants/loginConstant';
import { LoginPage } from '../pages/loginPage';
import { OKX_Key, OKX_Secret, OKX_Passphrase } from '../constants/adminConstant';
import { AdminPage } from '../pages/adminPage';
import { adminLocators } from '../locators/adminLocators';
import { compareScreenshot } from '../common_functions/compareScreenshot';

test.beforeEach(async ({ page }: { page: Page }): Promise<void> => {
  await page.goto(valid_URL);
  const loginPage = new LoginPage(page);
  await loginPage.login(valid_UserEmail, valid_Password);
});


// Test case: Adding an account with less than minimum account name length
test('Adding an account with less than minimum account name length', async ({ page }) => {
  await expect(page).toHaveURL(gotrade_URL, { timeout: 5000 });
  await page.goto(admin_URL, { timeout: 6000 });

  const detailsPage = new AdminPage(page);
  await detailsPage.fillAccountDetails("ww", OKX_Key, OKX_Secret, OKX_Passphrase);
  
  const chart = page.locator(adminLocators.demoAccountDialogBox);
  const diffPixels = await compareScreenshot(chart, 'screenshots/admin_account_minimum.png', { threshold: 1 });
  expect(diffPixels).toBe(0);
});

// Test case: Adding an account with already existing name
test('Adding an account with already exisiting name', async ({ page }) => {
  await expect(page).toHaveURL(gotrade_URL, { timeout: 5000 });
  await page.goto(admin_URL, { timeout: 6000 });

  const detailsPage = new AdminPage(page);
  await detailsPage.fillAccountDetails("www", OKX_Key, OKX_Secret, OKX_Passphrase);

  const chart = page.locator(adminLocators.demoAccountDialogBox);
  const diffPixels = await compareScreenshot(chart, 'screenshots/admin_alreadyExisiting_name.png', { threshold: 1 });
  expect(diffPixels).toBe(0);
});

// Test case: Adding a new account
test('Adding an account with valid API credentials and unique username', async ({ page }) => {
  await expect(page).toHaveURL(gotrade_URL, { timeout: 5000 });
  await page.goto(admin_URL, { timeout: 6000 });
  const detailsPage = new AdminPage(page);
  const randomName = await detailsPage.generateRandomAccountName(10);
  await detailsPage.fillAccountDetails(randomName, OKX_Key, OKX_Secret, OKX_Passphrase);
  await page.waitForTimeout(5000);
  const tbody = page.locator('tbody');
  await expect(tbody).toContainText(randomName);
});

test('Delete an account', async({ page }) => {
  try {
  await expect(page).toHaveURL(gotrade_URL, { timeout: 5000 });
  await page.goto(admin_URL, { timeout: 6000 });
  await page.locator('//button[contains(@data-testid,"delete-account-tfwebkrrdk")]').click();
  await page.locator('input[placeholder="DELETE"]').pressSequentially('DELETE');
  await page.locator('//span[contains(text(), "Delete")]').click();
  const tbody = page.locator('tbody');
  await expect(tbody).not.toContainText('tfwebkrrdk');
} finally {
  const detailsPage = new AdminPage(page)
  await detailsPage.fillAccountDetails('tfwebkrrdk', OKX_Key, OKX_Secret, OKX_Passphrase);
  await page.waitForTimeout(10000);
}
});