import { Page } from '@playwright/test';
import { gotradeLocators } from '../locators/gotradeLocators';

export interface TradeField {
  selector: string;
  value: string;
}

export interface TradeConfig {
  name: string;
  orderTypeButton?: string | string[];
  fields: TradeField[];
  screenshotPath: string;
  extraStep?: (page: Page) => Promise<void>;
}

export const tradeConfigs: TradeConfig[] = [
  {
    name: 'MarketEdge',
    fields: [
      { selector: gotradeLocators.quantityInput, value: '1' },
      { selector: gotradeLocators.durationInput, value: '5' },
    ],
    screenshotPath: 'screenshots/gotradeAccepted.png',
  },
  {
    name: 'LimitEdge',
    orderTypeButton: gotradeLocators.orderTypeLimitEdge,
    fields: [
      { selector: gotradeLocators.quantityInput, value: '1' },
      { selector: gotradeLocators.durationInput, value: '5' },
      { selector: gotradeLocators.thresholdInput, value: '5' },
    ],
    screenshotPath: 'screenshots/gotradeAccepted.png',
  },
  {
    name: 'TWAPEdge',
    orderTypeButton: gotradeLocators.orderTypeTWAPEdge,
    fields: [
      { selector: gotradeLocators.quantityInput, value: '1' },
      { selector: gotradeLocators.durationInput, value: '5' },
      { selector: gotradeLocators.intervalInput, value: '5' },
    ],
    screenshotPath: 'screenshots/gotradeAccepted.png',
  },
  {
    name: 'Limit',
    orderTypeButton: [
      gotradeLocators.orderTypeMore,
      gotradeLocators.orderTypeLimit,
    ],
    fields: [
      { selector: gotradeLocators.quantityInput, value: '1' },
      { selector: gotradeLocators.priceInput, value: '114500.00' },
    ],
    screenshotPath: 'screenshots/gotradeAccepted.png',
  },
  {
    name: 'Market',
    orderTypeButton: [
      gotradeLocators.orderTypeMore,
      gotradeLocators.orderTypeMarket,
    ],
    fields: [{ selector: gotradeLocators.quantityInput, value: '1' }],
    screenshotPath: 'screenshots/gotradeAccepted.png',
  },
  {
    name: 'TWAP',
    orderTypeButton: [
      gotradeLocators.orderTypeMore,
      gotradeLocators.orderTypeTWAP,
    ],
    fields: [
      { selector: gotradeLocators.quantityInput, value: '1' },
      { selector: gotradeLocators.durationInput, value: '5' },
      { selector: gotradeLocators.intervalInput, value: '5' },
    ],
    screenshotPath: 'screenshots/gotradeAccepted.png',
  },
  {
    name: 'VWAP',
    orderTypeButton: [
      gotradeLocators.orderTypeMore,
      gotradeLocators.orderTypeVWAP,
    ],
    fields: [
      { selector: gotradeLocators.quantityInput, value: '1' },
      { selector: gotradeLocators.durationInput, value: '5' },
      { selector: gotradeLocators.participationInput, value: '1' },
    ],
    screenshotPath: 'screenshots/gotradeAccepted.png',
  },
  {
    name: 'Ratio Trade',
    orderTypeButton: [
      gotradeLocators.orderTypeMore,
      gotradeLocators.orderTypeRatioTrade,
    ],
    fields: [{ selector: gotradeLocators.quantityInput, value: '1' }],
    extraStep: async (page: Page) => {
      await page.locator(gotradeLocators.firstSymbolDropDown).click();
      await page.locator(gotradeLocators.firstSymbolSelection).click();
      await page.locator(gotradeLocators.secondSymbolDropDown).click();
      await page.locator(gotradeLocators.secondSymbolSelection).click();
    },
    screenshotPath: 'screenshots/gotradeAccepted.png',
  },
  {
    name: 'Target Position',
    orderTypeButton: [
      gotradeLocators.orderTypeMore,
      gotradeLocators.orderTypeTargetPosition,
    ],
    fields: [
      { selector: gotradeLocators.targetInput, value: '5' },
      { selector: gotradeLocators.durationInput, value: '5' },
    ],
    screenshotPath: 'screenshots/gotradeAccepted.png',
  },
];
