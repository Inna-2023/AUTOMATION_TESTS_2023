// Use public e-shop site >> https://demowebshop.tricentis.com/

// •	Verify that allows register a User

const { Builder, By, Key, until } = require('selenium-webdriver');
const { assert } = require('chai');
describe('E-shop User Registration Test', function () {
  let driver;
  before(async function () {
      driver = await new Builder().forBrowser('chrome').build();
  });
  after(async function () {
    await driver.quit();
  });
  it('Verify User Registration on E-shop', async function () {
    await testUserRegistration(driver);
  });
});
async function testUserRegistration(driver) {
  try {
    await driver.get('https://demowebshop.tricentis.com/');
    const registerLink = await driver.findElement(By.linkText('Register'));
    await registerLink.click();
    const firstNameInput = await driver.findElement(By.id('FirstName'));
    await firstNameInput.sendKeys('Bruce');
    const lastNameInput = await driver.findElement(By.id('LastName'));
    await lastNameInput.sendKeys('Willis');
    const emailInput = await driver.findElement(By.id('Email'));
    const randomEmail = `testuser${Math.floor(Math.random() * 100000)}@example.com`;
    await emailInput.sendKeys(randomEmail);
    const passwordInput = await driver.findElement(By.id('Password'));
    await passwordInput.sendKeys('Test1234');
    const confirmPasswordInput = await driver.findElement(By.id('ConfirmPassword'));
    await confirmPasswordInput.sendKeys('Test1234');
    const registerButton = await driver.findElement(By.id('register-button'));
    await registerButton.click();
    await driver.wait(until.urlIs('https://demowebshop.tricentis.com/registerresult/1'), 10000);
    const currentUrl = await driver.getCurrentUrl();
    assert.equal(currentUrl, 'https://demowebshop.tricentis.com/registerresult/1', 'User registration failed.');
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

// •	Verify that allows login a User

const { Builder, By, Key, until } = require('selenium-webdriver');
const { assert } = require('chai');
describe('E-shop User Login Test', function () {
  let driver;
  before(async function () {
    driver = await new Builder().forBrowser('chrome').build();
  });
  after(async function () {
    await driver.quit();
  });
  it('Verify User Login on E-shop', async function () {
    await testUserLogin(driver);
  });
});
async function testUserLogin(driver) {
  try {
    await driver.get('https://demowebshop.tricentis.com/');
    const loginLink = await driver.findElement(By.linkText('Log in'));
    await loginLink.click();
    const emailInput = await driver.findElement(By.id('Email'));
    await emailInput.sendKeys('writer_inna_stage@getnada.com');
    const passwordInput = await driver.findElement(By.id('Password'));
    await passwordInput.sendKeys('Test1234');
    const loginButton = await driver.findElement(By.css('.login-button'));
    await loginButton.click();
    await driver.wait(until.urlIs('https://demowebshop.tricentis.com/'), 10000);
    const currentUrl = await driver.getCurrentUrl();
    assert.equal(currentUrl, 'https://demowebshop.tricentis.com/', 'User login failed.');
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

// •	Verify that ‘Computers’ group has 3 sub-groups with correct names

const { Builder, By, until } = require('selenium-webdriver');
const { assert } = require('chai');
describe('E-shop Computers Group Test', function () {
  let driver;
  before(async function () {
     driver = await new Builder().forBrowser('chrome').build();
  });
  after(async function () {
    await driver.quit();
  });
  it('Verify Computers Group and Sub-groups on E-shop', async function () {
    await testComputersGroup(driver);
  });
});
async function testComputersGroup(driver) {
  try {
    await driver.get('https://demowebshop.tricentis.com/');
    const computersGroupLink = await driver.findElement(By.linkText('Computers'));
    await computersGroupLink.click();
    await driver.wait(until.elementLocated(By.css('.sub-category-grid')), 10000);
    const subGroupElements = await driver.findElements(By.css('.sub-category-grid .item-box h2'));
    const subGroupNames = await Promise.all(subGroupElements.map(element => element.getText()));
    const expectedSubGroupNames = ['Desktops', 'Notebooks', 'Accessories'];
    assert.deepEqual(subGroupNames, expectedSubGroupNames, 'Computers group sub-groups are not as expected.');
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

// •	Verify that allows sorting items (different options)

const { Builder, By, Key, until } = require('selenium-webdriver');
const { assert } = require('chai');
describe('E-shop Sorting Items Test', function () {
  let driver;
  before(async function () {
    driver = await new Builder().forBrowser('chrome').build();
  });
  after(async function () {
    await driver.quit();
  });
  it('Verify Sorting Items on E-shop', async function () {
    await testSortingItems(driver);
  });
});
async function testSortingItems(driver) {
  try {
    await driver.get('https://demowebshop.tricentis.com/');
    const booksCategoryLink = await driver.findElement(By.linkText('Books'));
    await booksCategoryLink.click();
    await driver.wait(until.elementLocated(By.css('.product-grid')), 5000);
    const sortingDropdown = await driver.findElement(By.id('products-orderby'));
    const sortingOptions = await sortingDropdown.findElementsBy.tagName('option');
    for (const option of sortingOptions) {
    const optionText = await option.getText();
    await sortingDropdown.sendKeys(optionText);
    await driver.wait(until.elementLocated(By.css('.product-grid')), 50000);
    const sortedItems = await driver.findElements(By.css('.product-grid .product-title'));
    assert.isAbove(sortedItems.length, 1, `Items are not sorted for option: ${optionText}`);
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

// •	Verify that allows changing number of items on page

const { Builder, By, until } = require('selenium-webdriver');
const { assert } = require('chai');
describe('E-shop Change Items Per Page Test', function () {
  let driver;
  before(async function () {
    driver = await new Builder().forBrowser('chrome').build();
  });
  after(async function () {
    await driver.quit();
  });
  it('Verify Changing Items Per Page on E-shop', async function () {
    await testChangeItemsPerPage(driver);
  });
});
async function testChangeItemsPerPage(driver) {
  try {
    await driver.get('https://demowebshop.tricentis.com/');
    const booksCategoryLink = await driver.findElement(By.linkText('Books'));
    await booksCategoryLink.click();
    await driver.wait(until.elementLocated(By.css('.product-grid')), 5000);
    const itemsPerPageDropdown = await driver.findElement(By.name('products-pagesize'));
    await itemsPerPageDropdown.sendKeys('4');
    await driver.wait(until.elementLocated(By.css('.product-grid')), 5000);
    const itemsOnPage = await driver.findElements(By.css('.product-grid .product-item'));
    assert.equal(itemsOnPage.length, 4, 'Number of items per page is not as expected.');
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

// •	Verify that allows adding an item to the Wishlist

const { Builder, By, until } = require('selenium-webdriver');
const { assert } = require('chai');
describe('E-shop Add to Wishlist Test', function () {
  let driver;
  before(async function () {
    driver = await new Builder().forBrowser('chrome').build();
  });
  after(async function () {
    await driver.quit();
  });
  it('Verify Adding an Item to Wishlist on E-shop', async function () {
    await testAddToWishlist(driver);
  });
});

async function testAddToWishlist(driver) {
  try {
    await driver.get('https://demowebshop.tricentis.com/apparel-shoes');
    const productLink = await driver.findElement(By.css('.product-item .product-title'));
    await productLink.click();
    await driver.wait(until.elementLocated(By.css('.product-essential')), 5000);
    const addToWishlistButton = await driver.findElement(By.css('.add-to-wishlist-button'));
    await addToWishlistButton.click();
    await driver.wait(until.elementLocated(By.css('.bar-notification.success')), 5000);
    const successMessage = await driver.findElement(By.css('.bar-notification.success')).getText();
    assert.include(successMessage, 'The product has been added to your wishlist', 'Adding to wishlist failed.');
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

// •	Verify that allows adding an item to the card

const { Builder, By, until } = require('selenium-webdriver');
const { assert } = require('chai');
describe('E-shop Add to Cart Test', function () {
  let driver;
  before(async function () {
    driver = await new Builder().forBrowser('chrome').build();
  });
  after(async function () {
    await driver.quit();
  });
  it('Verify Adding an Item to Cart on E-shop', async function () {
    await testAddToCart(driver);
  });
});
async function testAddToCart(driver) {
  try {
    await driver.get('https://demowebshop.tricentis.com/apparel-shoes');
    const productLink = await driver.findElement(By.css('.product-item .product-title'));
    await productLink.click();
    await driver.wait(until.elementLocated(By.css('.product-essential')), 5000);
    const addToCartButton = await driver.findElement(By.id('add-to-cart-button-5'));
    await addToCartButton.click();
    await driver.wait(until.elementLocated(By.css('.bar-notification.success')), 5000);
    const successMessage = await driver.findElement(By.css('.bar-notification.success')).getText();
    assert.include(successMessage, 'The product has been added to your shopping cart', 'Adding to cart failed.');
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

// •	Verify that allows removing an item from the card

const { Builder, By, until } = require('selenium-webdriver');
const { assert } = require('chai');
describe('E-shop Remove from Cart Test', function () {
  let driver;
  before(async function () {
    driver = await new Builder().forBrowser('chrome').build();
  });
  after(async function () {
    await driver.quit();
  });
  it('Verify Removing an Item from Cart on E-shop', async function () {
    await testRemoveFromCart(driver);
  });
});
async function testRemoveFromCart(driver) {
  try {
    await driver.get('https://demowebshop.tricentis.com/apparel-shoes');
    const productLink = await driver.findElement(By.css('.product-item .product-title'));
    await productLink.click();
    await driver.wait(until.elementLocated(By.css('.product-essential')), 5000);
    const addToCartButton = await driver.findElement(By.id('add-to-cart-button-5'));
    await addToCartButton.click();
    await driver.wait(until.elementLocated(By.css('.bar-notification.success')), 5000);
    const shoppingCartLink = await driver.findElement(By.css('.cart-label'));
    await shoppingCartLink.click();
    const removeLink = await driver.findElement(By.name('removefromcart'));
    await removeLink.click();
    const updateLink = await driver.findElement(By.name('updatecart'));
    await updateLink.click();
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

// •	Verify that allows checkout an item

const { Builder, By, until } = require('selenium-webdriver');
const { assert } = require('chai');
describe('E-shop Checkout Test', function () {
  let driver;
  before(async function () {
    driver = await new Builder().forBrowser('chrome').build();
  });
  after(async function () {
    await driver.quit();
  });
  it('Verify Checking Out an Item on E-shop', async function () {
    await testCheckout(driver);
  });
});
async function testCheckout(driver) {
  try {
    await driver.get('https://demowebshop.tricentis.com/apparel-shoes');
    const productLink = await driver.findElement(By.css('.product-item .product-title'));
    await productLink.click();
    await driver.wait(until.elementLocated(By.css('.product-essential')), 5000);
    const addToCartButton = await driver.findElement(By.id('add-to-cart-button-5'));
    await addToCartButton.click();
    await driver.wait(until.elementLocated(By.css('.bar-notification.success')), 5000);
    const shoppingCartLink = await driver.findElement(By.css('.cart-label'));
    await shoppingCartLink.click();
    const termsofService = await driver.findElement(By.id('termsofservice'));
    await termsofService.click();
    const checkoutButton = await driver.findElement(By.css('.checkout-button'));
    await checkoutButton.click();
    await driver.wait(until.elementLocated(By.css('.checkout')), 5000);
    const checkoutPageTitle = await driver.findElement(By.css('.page-title')).getText();
    assert.equal(checkoutPageTitle, 'Checkout', 'Checkout page is not displayed.');
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

