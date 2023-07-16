const { default: puppeteer } = require("puppeteer");

const fetchAutomate = async () => {
  try {
    // Launch headful browser and go to swap.defillama.com
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto("https://swap.defillama.com");

    // Fill the form
    await page.waitForSelector("#chain");
    await page.type("#chain", "Arbitrum One");
    await page.type("#sellAmountInput", "12");
    await page.type("#sellTokenSelect input", "WBTC");
    await page.type("#buyTokenSelect input", "USDC");

    // Wait for the "Select a route to perform a swap" section
    await page.waitForSelector(".listbox-route-item", { visible: true });

    // Select the second option
    const routeOptions = await page.$$(".listbox-route-item");
    await routeOptions[1].click();

    // Leave the browser window open
    await new Promise(() => {});
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

fetchAutomate();
