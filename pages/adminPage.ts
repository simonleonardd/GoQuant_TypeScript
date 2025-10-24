import { Page, Locator } from '@playwright/test';
import { adminLocators } from '../locators/adminLocators';

export class AdminPage {
  readonly page: Page;
  readonly accountName: Locator;
  readonly OKX_Key: Locator;
  readonly OKX_Secret: Locator;
  readonly OKX_Passphrase: Locator;
  readonly testModeSwitch: Locator;
  readonly saveAccountButton: Locator;
  readonly AddAccountButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.accountName = page.getByPlaceholder('Enter your OKX Account Name');
    this.OKX_Key = page.getByPlaceholder('Enter your OKX API Key');
    this.OKX_Secret = page.getByPlaceholder('Enter your OKX secret key');
    this.OKX_Passphrase = page.getByPlaceholder('Enter your OKX passphrase');
    this.testModeSwitch = page.locator(adminLocators.testModeSwitchButton);
    this.saveAccountButton = page.locator(adminLocators.saveAccountButton);
    this.AddAccountButton = page.getByRole('button', { name: 'Add Account' });
  }

  async fillAccountDetails(accountName: string, key: string, secret: string, passphrase: string): Promise<void> {
    await this.AddAccountButton.click();
    await this.accountName.fill(accountName);
    await this.OKX_Key.fill(key);
    await this.OKX_Secret.fill(secret);
    await this.OKX_Passphrase.fill(passphrase);
    await this.testModeSwitch.click();
    await this.saveAccountButton.click();
  }

  async generateRandomAccountName(length: number = 8): Promise<string> {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      result += chars[randomIndex];
    }
    return result;
  }
}

