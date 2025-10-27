export const gotradeLocators: {
    onBoardingCard: string;
    onBoardingCardProceedSymbol: string;
    tradeButton : string;
    shortorsellButton : string;
    exchangeSelector : string;
    usdmexchangeSelector : string;
    viewExchanges : string;
    usdmAccountSelection : string;
    coinmexchangeSelector : string;
    coinmAccountSelection : string;
    quantityInput : string;
    durationInput : string;
    thresholdInput : string;
    intervalInput : string;
    priceInput : string;
    targetInput : string;
    participationInput: string;
    orderTypeMarketEdge : string;
    orderTypeLimitEdge : string;
    orderTypeTWAPEdge : string;
    orderTypeMore : string;
    orderTypeLimit : string;
    orderTypeMarket : string;
    orderTypeTWAP : string;
    orderTypeVWAP : string;
    orderTypeRatioTrade : string;
    orderTypeTargetPosition : string;
    firstSymbolDropDown : string;
    secondSymbolDropDown : string;
    firstSymbolSelection : string;
    secondSymbolSelection : string;
}={
    onBoardingCard : '//div[contains(@data-testid,"onboarding-card")]',
    onBoardingCardProceedSymbol : '//span[contains(text(),"→")]',
    tradeButton : '//button[contains(@data-testid,"trade-button")]',
    shortorsellButton : '//button[contains(@data-testid,"short-button")]',
    exchangeSelector : '//button[contains(@data-testid,"exchange-selector-trigger")]',
    usdmexchangeSelector : '//button[contains(@data-testid,"exchange-selector-item-BINANCEUSDM")]',
    viewExchanges : '//p[contains(text(),"Select exchanges to view the accounts")]',
    usdmAccountSelection : '//button[contains(@data-testid,"BINANCEUSDM-selector-simon_usd")]',
    coinmexchangeSelector : '//button[contains(@data-testid,"exchange-selector-item-BINANCECOINM")]',
    coinmAccountSelection : '//button[contains(@data-testid,"BINANCECOINM-selector-simon_coinm")]',
    quantityInput : 'input[data-testid="quantity"]',
    durationInput : 'input[data-testid="duration"]',
    thresholdInput : 'input[data-testid="threshold"]',
    intervalInput : 'input[data-testid="interval"]',
    priceInput : 'input[data-testid="price"]',
    participationInput : 'input[name="participation"]',
    targetInput : '[inputname="targetPosition"]',
    // --- Order Type Buttons ---
    orderTypeMarketEdge: '//button[contains(@data-testid,"GOTRADE_ORDERTYPE_MARKET_EDGE")]',
    orderTypeLimitEdge: '//button[contains(@data-testid,"GOTRADE_ORDERTYPE_LIMIT_EDGE")]',
    orderTypeTWAPEdge: '//button[contains(@data-testid,"GOTRADE_ORDERTYPE_TWAP_EDGE")]',
    orderTypeMore: '//button[contains(@data-testid,"GOTRADE_ORDERTYPE_MORE")]',
    orderTypeLimit: '//button[contains(@data-testid,"GOTRADE_ORDERTYPE_LIMIT")]',
    orderTypeMarket: '//button[contains(@data-testid,"GOTRADE_ORDERTYPE_MARKET")]',
    orderTypeTWAP: '//button[contains(@data-testid,"GOTRADE_ORDERTYPE_TWAP")]',
    orderTypeVWAP: '//button[contains(@data-testid,"GOTRADE_ORDERTYPE_VWAP")]',
    orderTypeRatioTrade: '//button[contains(@data-testid,"GOTRADE_ORDERTYPE_RATIO_TRADE")]',
    orderTypeTargetPosition: '//button[contains(@data-testid,"GOTRADE_ORDERTYPE_TARGET_POSITION")]', 

    firstSymbolDropDown : '//label[contains(normalize-space(.),"First Symbol")]/following::div[@id="spotSymbolsDropdown"][1]',
    secondSymbolDropDown : '//label[contains(normalize-space(.),"Second Symbol")]/following::div[@id="spotSymbolsDropdown"][1]',
    firstSymbolSelection : '//div[contains(@data-value,"btcusd_perp")]',
    secondSymbolSelection : '//div[contains(@data-value,"ethusd_perp")]',
}