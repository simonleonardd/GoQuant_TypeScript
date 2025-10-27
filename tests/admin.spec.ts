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
test('Adding an account with less than minimum account name length', async ({ page }: { page: Page }): Promise<void> => {
  await expect(page).toHaveURL(gotrade_URL, { timeout: 5000 });
  await page.goto(admin_URL, { timeout: 6000 });

  const detailsPage = new AdminPage(page);
  await detailsPage.fillAccountDetails("ww", OKX_Key, OKX_Secret, OKX_Passphrase);
  
  const chart = page.locator(adminLocators.demoAccountDialogBox);
  const diffPixels = await compareScreenshot(chart, 'screenshots/admin_account_minimum.png', { threshold: 1 });
  expect(diffPixels).toBe(0);
});

// Test case: Adding an account with already existing name
test('Adding an account with already exisiting name', async ({ page }: { page: Page }): Promise<void> => {
  await expect(page).toHaveURL(gotrade_URL, { timeout: 5000 });
  await page.goto(admin_URL, { timeout: 6000 });

  const detailsPage = new AdminPage(page);
  await detailsPage.fillAccountDetails("www", OKX_Key, OKX_Secret, OKX_Passphrase);

  const chart = page.locator(adminLocators.demoAccountDialogBox);
  const diffPixels = await compareScreenshot(chart, 'screenshots/admin_alreadyExisiting_name.png', { threshold: 1 });
  expect(diffPixels).toBe(0);
});

// Test case: Adding a new account
test('Adding an account with valid API credentials and unique username', async ({ page }: { page: Page }): Promise<void> => {
  await expect(page).toHaveURL(gotrade_URL, { timeout: 5000 });
  await page.goto(admin_URL, { timeout: 6000 });
  const detailsPage = new AdminPage(page);
  const randomName = await detailsPage.generateRandomAccountName(10);
  await detailsPage.fillAccountDetails(randomName, OKX_Key, OKX_Secret, OKX_Passphrase);
  await page.waitForTimeout(5000);
  const tbody = page.locator(adminLocators.accountTBody);
  await expect(tbody).toContainText(randomName);
});

// Test case: Adding an account only with account name
test('Adding an account only with account name', async({ page }: { page: Page }): Promise<void> => {
  await expect(page).toHaveURL(gotrade_URL, { timeout: 5000 });
  await page.goto(admin_URL, { timeout: 6000 });
  const detailsPage = new AdminPage(page);
  await detailsPage.fillAccountDetails('MR37V2G91v', '', '', '');
  const chart = page.locator(adminLocators.demoAccountDialogBox);
  const diffPixels = await compareScreenshot(chart, 'screenshots/admin_only_accountname.png', { threshold: 1});
  expect(diffPixels).toBe(0);
})

// Test case: Deleting an account
test('Delete an account', async({ page }: { page: Page }): Promise<void> => {
  try {
  await expect(page).toHaveURL(gotrade_URL, { timeout: 5000 });
  await page.goto(admin_URL, { timeout: 6000 });
  await page.locator(adminLocators.deleteButton).click();
  await page.locator(adminLocators.deleteConfirmationTextbox).pressSequentially('DELETE');
  await page.locator(adminLocators.deletePopupButton).click();
  const tbody = page.locator(adminLocators.accountTBody);
  await expect(tbody).not.toContainText('tfwebkrrdk');
} finally {
  const detailsPage = new AdminPage(page)
  await detailsPage.fillAccountDetails('tfwebkrrdk', OKX_Key, OKX_Secret, OKX_Passphrase);
  await page.waitForTimeout(10000);
}
});

// Test case: Modifying an account name
// Not yet completed
test('Modifying an account name', async({page}: { page: Page }): Promise<void> =>{
  await expect(page).toHaveURL(gotrade_URL, { timeout: 5000 });
  await page.goto(admin_URL, { timeout: 6000 });
  await page.locator('//button[@data-testid="delete-account-f2sphzxrbr"]/preceding-sibling::button[contains(text(), "Modify")]').click();

});