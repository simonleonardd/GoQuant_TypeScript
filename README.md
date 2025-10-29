This repository contains automated testing of GoTrade platform of GoQuant.
The detailed report is under "**Reports/GoQuant Report**"

-------------------------------------------------------------------------

In Order to run this automated scripts follow the below instructions:
1. Install VSCode, If not installed
2. Install npm
3.  In VSCode, Click extensions and install playwright test for vscode
4.  After installation, In Command pallete Install playwright
-------------------------------------------------------------------------

To execute playwright test
// To execute all tests
1. npx playwright test
// To execute particular test
npx playwright test <testname>.spec.ts
// To execute particular test and view visually
npx playwright test <testname>.spec.ts --headed
// To execute a particular test case in the test
npx playwright test <testname>.spec.ts -g "test case name"
-------------------------------------------------------------------------

The repository structure

DataSet Folder:
1.gotrade_Dataset.ts - Contains the values for the trade. eg , quantity,threshold,duration

Constants Folder:
1. AdminConstant.ts - Contains the admin page constant values
2. linkConstant.ts - Contains the urls.
3. loginConstant.ts - Contains login page constant values

Common_functions:
1. compareScreenshot - Code to take and compare screenshots

evidence:
Contains the  screenshot of bugs included in the report.

locators:
1. adminLocators.ts - Contains selectors of admin page
2. goMarketLocators.ts - Contains selectors of goMarket page
3. goTradeLocators.ts - Contains selectors of goTrade page
4. loginLocators.ts - Contains selectors of login page

pages:
1. adminPage.ts - Contains common functions needed for admin page
2. loginPage.ts - Contains common functions needed for login page

screenshots:
Contains screenshot of testcases

tests:
Contains all the test classes
6.
 
