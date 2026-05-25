const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

jest.setTimeout(60000);

describe('Prueba ChromeDriver', () => {

  let driver;

  beforeAll(async () => {

    const options = new chrome.Options();

    options.addArguments('--remote-allow-origins=*');
    options.addArguments('--start-maximized');

    options.setChromeBinaryPath(
      'C:/Program Files/Google/Chrome/Application/chrome.exe'
    );

    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();

  });

  afterAll(async () => {

    if (driver) {
      await driver.quit();
    }

  });

  test('abre Google correctamente', async () => {

    await driver.get('https://www.google.com');

    const title = await driver.getTitle();

    console.log("Título encontrado:", title);

    expect(title).toContain('Google');

  });

});