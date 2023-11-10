// 1) Check the title is correct

const { Builder, By, Key, until } = require('selenium-webdriver');
const { assert } = require('chai');
describe('EPAM Website Title Check', function () {
  let driverChrome, driverFirefox;
  before(async function () {
        driverChrome = await new Builder().forBrowser('chrome').build();
        driverFirefox = await new Builder().forBrowser('firefox').build();
  });
  after(async function () {
   await Promise.all([driverChrome.quit(), driverFirefox.quit()]);
  });
  it('Check the title in Google Chrome', async function () {
    await testTitle(driverChrome);
  });
  it('Check the title in Mozilla Firefox', async function () {
    await testTitle(driverFirefox);
  });
});
async function testTitle(driver) {
  try {
    await driver.get('https://www.epam.com');
    const pageTitle = await driver.getTitle();
    const expectedTitle = "EPAM | Software Engineering & Product Development Services";
    assert.equal(pageTitle, expectedTitle, 'Page title is not as expected.');
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

// 2) Check the ability to switch Light / Dark mode

const { Builder, By, Key, until } = require('selenium-webdriver');
const { assert } = require('chai');
describe('EPAM Website Theme Toggle Test', function () {
  let driverChrome, driverFirefox;
  before(async function () {
    driverChrome = await new Builder().forBrowser('chrome').build();
    driverFirefox = await new Builder().forBrowser('firefox').build();
  });
  after(async function () {
     await Promise.all([driverChrome.quit(), driverFirefox.quit()]);
  });
  it('Check the ability to switch Light/Dark mode in Google Chrome', async function () {
    await testThemeToggle(driverChrome);
  });
  it('Check the ability to switch Light/Dark mode in Mozilla Firefox', async function () {
    await testThemeToggle(driverFirefox);
  });
});
async function testThemeToggle(driver) {
  try {
    await driver.get('https://www.epam.com/');
    const themeToggle = await driver.findElement(By.xpath("(//section[@class='theme-switcher-ui']//div[@class='theme-switcher'])[2]"));
    const initialState = await themeToggle.isSelected();
    await themeToggle.click();
    const finalState = await themeToggle.isSelected();
    assert.notEqual(initialState, finalState, 'Theme toggle did not change the theme to the opposite state.');
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

// 3) Check that allow to change language to UA

const { Builder, By, Key, until } = require('selenium-webdriver');
const { assert } = require('chai');
describe('EPAM Website Language Change Test', function () {
  let driverChrome, driverFirefox;
  before(async function () {
    driverChrome = await new Builder().forBrowser('chrome').build();
    driverFirefox = await new Builder().forBrowser('firefox').build();
  });
  after(async function () {
    await Promise.all([driverChrome.quit(), driverFirefox.quit()]);
  });
  it('Check the ability to change language to UA in Google Chrome', async function () {
    await testLanguageChange(driverChrome);
  });
  it('Check the ability to change language to UA in Mozilla Firefox', async function () {
    await testLanguageChange(driverFirefox);
  });
});
async function testLanguageChange(driver) {
  try {
    await driver.get('https://www.epam.com/');
    const languageSwitch = await driver.findElement(By.xpath("(//div[@class='location-selector__button-language-prefix'][text()='(EN)'])[2]"));
    await languageSwitch.click(By.xpath("(//div[@class='location-selector__button-language-prefix'][text()='(EN)'])[2]"));
    await languageSwitch.click(By.xpath("//a[@class='location-selector__link']//span[text()='(Українська)']"));
    await driver.wait(until.urlContains('/ua'), 10000);
    const currentUrl = await driver.getCurrentUrl();
    assert.include(currentUrl, '/ua', 'Language change to UA was not successful.');
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

// 4) Check the policies list

const { Builder, By, until } = require('selenium-webdriver');
const { assert } = require('chai');
describe('EPAM Policies List Test', function () {
  let driverChrome, driverFirefox;
  before(async function () {
    driverChrome = await new Builder().forBrowser('chrome').build();
    driverFirefox = await new Builder().forBrowser('firefox').build();
  });
  after(async function () {
    await Promise.all([driverChrome.quit(), driverFirefox.quit()]);
  });
  it('Check Policies List in Google Chrome', async function () {
    await testPoliciesList(driverChrome);
  });
  it('Check Policies List in Mozilla Firefox', async function () {
    await testPoliciesList(driverFirefox);
  });
});
async function testPoliciesList(driver) {
  try {
    await driver.get('https://www.epam.com/');
    await driver.executeScript('window.scrollTo(0, document.body.scrollHeight)');
    const policiesList = await driver.findElements(By.xpath("//div[@class='policies']"));
    const expectedPolicies = [
      'INVESTORS',
      'COOKIE POLICY',
      'OPEN SOURCE',
      'APPLICANT PRIVACY NOTICE',
      'PRIVACY POLICY',
      'WEB ACCESSIBILITY'
    ];
    const policiesText = await Promise.all(policiesList.map(element => element.getText()));
    assert.deepEqual(policiesText, expectedPolicies, 'Policies list is not as expected.');
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

// 5) Check that allow to switch location list by region

const { Builder, By, Key, until } = require('selenium-webdriver');
const { assert } = require('chai');
describe('EPAM Website Regions and Locations Test', function () {
  let driverChrome, driverFirefox;
  before(async function () {
    driverChrome = await new Builder().forBrowser('chrome').build();
    driverFirefox = await new Builder().forBrowser('firefox').build();
  });
  after(async function () {
    await Promise.all([driverChrome.quit(), driverFirefox.quit()]);
  });
  it('Check regions and locations in Google Chrome', async function () {
    await testRegionsAndLocations(driverChrome);
  });
  it('Check regions and locations in Mozilla Firefox', async function () {
    await testRegionsAndLocations(driverFirefox);
  });
});
async function testRegionsAndLocations(driver) {
  try {
    await driver.get('https://www.epam.com/');
    const regionsList = await driver.findElements(By.xpath("//span[text()='Our']['Locations']/../../../../following-sibling::div[@class='tabs']//div[@role='tablist']"));
    const expectedRegions = ['AMERICAS', 'EMEA', 'APAC'];
    const regionsText = await Promise.all(regionsList.map(element => element.getText()));
    assert.deepEqual(regionsText, expectedRegions, 'Regions are not as expected.');
    for (const region of regionsList) {
      await region.click(By.xpath("//div[@role='tablist']//a[text()='AMERICAS']"));
      await region.click(By.xpath("//div[@role='tablist']//a[text()='EMEA']"));
      await region.click(By.xpath("//div[@role='tablist']//a[text()='APAC']"));

    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

// 6) Check the search function

const { Builder, By, Key, until } = require('selenium-webdriver');
const { assert } = require('chai');
describe('EPAM Website Search Test', function () {
  let driverChrome, driverFirefox;
  before(async function () {
    driverChrome = await new Builder().forBrowser('chrome').build();
    driverFirefox = await new Builder().forBrowser('firefox').build();
  });
  after(async function () {
    await Promise.all([driverChrome.quit(), driverFirefox.quit()]);
  });
  it('Check search function in Google Chrome', async function () {
    await testSearch(driverChrome);
  });
  it('Check search function in Mozilla Firefox', async function () {
    await testSearch(driverFirefox);
  });
});
async function testSearch(driver) {
  try {
    await driver.get('https://www.epam.com/');
    const searchIcon = await driver.findElement(By.xpath("//span[@class='search-icon dark-iconheader-search__search-icon']"));
    await searchIcon.click();
    const searchInput = await driver.findElement(By.xpath("//input[@type='search']"));
    await searchInput.sendKeys('AI', Key.RETURN);
    await driver.wait(until.elementLocated(By.xpath("//h2[contains(text(),'results for')]/following-sibling::div[@class='search-results__items']")), 5000);
    const searchResults = await driver.findElements(By.xpath("//h2[contains(text(),'results for')]/following-sibling::div[@class='search-results__items']"));
    assert.isAbove(searchResults.length, 0, 'Search results are not displayed.');
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

// 7)  Chack form's fields validation

const { Builder, By, Key, until } = require('selenium-webdriver');
const { assert } = require('chai');
describe('EPAM Contact Form Fields Validation Test', function () {
  let driverChrome, driverFirefox;
  before(async function () {
    driverChrome = await new Builder().forBrowser('chrome').build();
    driverFirefox = await new Builder().forBrowser('firefox').build();
  });
  after(async function () {
    await Promise.all([driverChrome.quit(), driverFirefox.quit()]);
  });
  it('Check form fields validation in Google Chrome', async function () {
    await testFormFieldsValidation(driverChrome);
  });
  it('Check form fields validation in Mozilla Firefox', async function () {
    await testFormFieldsValidation(driverFirefox);
  });
});
async function testFormFieldsValidation(driver) {
  try {
    await driver.get('https://www.epam.com/about/who-we-are/contact');
    const submitButton = await driver.findElement(By.xpath("//button[@class='button-ui']"));
    await submitButton.click();
    await driver.wait(until.elementLocated(By.xpath("//div[@data-required-msg='This is a required field']//input[@aria-invalid='true']")), 2000);
    const validationMessages = await driver.findElements(By.xpath("//div[@data-required-msg='This is a required field']//input[@aria-invalid='true']"));
    const expectedValidationMessagesCount = 4;
    assert.lengthOf(validationMessages, expectedValidationMessagesCount, 'Incorrect number of validation messages.');
    const validationMessagesText = await Promise.all(validationMessages.map(element => element.getText()));
    assert.include(validationMessagesText.join(''), 'This is a required field', 'Validation message content is incorrect.');
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

// 8) Check that the Company logo on the header lead to the main page

const { Builder, By, Key, until } = require('selenium-webdriver');
const { assert } = require('chai');
describe('EPAM Company Logo Test', function () {
  let driverChrome, driverFirefox;
  before(async function () {
    driverChrome = await new Builder().forBrowser('chrome').build();
    driverFirefox = await new Builder().forBrowser('firefox').build();
  });
  after(async function () {
    await Promise.all([driverChrome.quit(), driverFirefox.quit()]);
  });
  it('Check Company Logo leads to the main page in Google Chrome', async function () {
    await testCompanyLogo(driverChrome);
  });
  it('Check Company Logo leads to the main page in Mozilla Firefox', async function () {
    await testCompanyLogo(driverFirefox);
  });
});
async function testCompanyLogo(driver) {
  try {
    await driver.get('https://www.epam.com/about');
    const companyLogo = await driver.findElement(By.xpath("//img[@class='header__logo header__logo-placeholder'][@alt='EPAM']"));
    await companyLogo.click();
    await driver.wait(until.urlIs('https://www.epam.com/'), 5000);
    const currentUrl = await driver.getCurrentUrl();
    assert.equal(currentUrl, 'https://www.epam.com/', 'Clicking on the company logo did not lead to the main page.');
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

// 9) Check that allows to download report

const { Builder, By, Key, until } = require('selenium-webdriver');
const { assert } = require('chai');
const fs = require('fs');
describe('EPAM Report Download Test', function () {
  let driverChrome, driverFirefox;
  before(async function () {
    driverChrome = await new Builder().forBrowser('chrome').build();
    driverFirefox = await new Builder().forBrowser('firefox').build();
  });
  after(async function () {
    await Promise.all([driverChrome.quit(), driverFirefox.quit()]);
  });
  it('Check Report Download in Google Chrome', async function () {
    await testReportDownload(driverChrome);
  });
  it('Check Report Download in Mozilla Firefox', async function () {
    await testReportDownload(driverFirefox);
  });
});
async function testReportDownload(driver) {
  try {
    await driver.get('https://www.epam.com/about');
    const downloadLink = await driver.findElement(By.xpath("//span[text()='EPAM at ']['  a Glance']/../../../../following-sibling::div[@class='button']//a[@download='']"));
    const downloadLinkHref = await downloadLink.getAttribute('href');
    await driver.get(downloadLinkHref);
    await driver.sleep(8000);
    const expectedFileName = 'EPAM_Corporate_Overview_Q3_october.pdf';
    assert.isTrue(fs.existsSync(expectedFileName), 'File was not downloaded.');
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

