export const adminLocators: {
    demoAccountDialogBox: string;
    testModeSwitchButton: string;
    saveAccountButton: string;
    deleteButton: string;
    deleteConfirmationTextbox: string;
    deletePopupButton: string;
    accountTBody:string;
}={
    demoAccountDialogBox: '//div[contains(@role, "dialog")]',
    testModeSwitchButton: '//button[contains(@data-testid, "test-mode-switch")]',
    saveAccountButton: '//button[contains(@data-testid, "button-submit-account")]',
    deleteButton: '//button[contains(@data-testid,"delete-account-tfwebkrrdk")]',
    deleteConfirmationTextbox: 'input[placeholder="DELETE"]',
    deletePopupButton: '//span[contains(text(), "Delete")]',
    accountTBody: 'tbody',
};