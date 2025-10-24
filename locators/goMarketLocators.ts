export const goMarketLocators: {
  goMarketDataPopup: string;
  symbolsDropdown: string;
  searchSymbolInput: string;
  symbolOption: (symbol: string) => string;
  selectedSymbol: (symbol: string) => string;
  symbolDiscovery: string;
  discoveryModeToggle: string;
  addSymbolButton: string;
} = {
  goMarketDataPopup: '//button[contains(text(),"Skip")]',
  symbolsDropdown: '#symbolsDropdown',
  searchSymbolInput: 'Search symbol...',
  symbolOption: (symbol: string) => `//div[contains(text(), "${symbol}")]`,
  selectedSymbol: (symbol: string) => `//span[contains(text(),"${symbol}")]`,
  symbolDiscovery: '#symbolDiscovery',
  discoveryModeToggle: '//div[contains(@class,"z-50 w-72")]',
  addSymbolButton: '.min-w-fit',
};
