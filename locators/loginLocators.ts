export const loginLocators: {
    incorrectUserEmailErrorMessage: string;
    incorrectPasswordErrorMessage: string;
    userEmailInput: string;
    userPasswordInput: string;
}={
    incorrectUserEmailErrorMessage: '//div[contains(@role, "alert")]//div[contains(text(), "The user was not found in the system")]',
    incorrectPasswordErrorMessage: '//div[contains(@role, "alert")]//div[contains(text(), "The password is invalid")]',
    userEmailInput: 'input[name="email"]',
    userPasswordInput: 'input[type="password"]',
};