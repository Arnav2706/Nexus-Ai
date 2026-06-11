const puppeteer = require('puppeteer');

(async () => {
  console.log('Launching browser...');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const errors = [];
  
  page.on('console', msg => {
    if (msg.type() === 'error' || msg.type() === 'warning') {
      errors.push(`[${msg.type()}] ${msg.text()}`);
    }
  });
  
  page.on('pageerror', error => {
    errors.push(`[pageerror] ${error.message}`);
  });

  const routes = ['/', '/schedule', '/network', '/map', '/insights', '/memory', '/graph', '/career', '/pulse', '/wow', '/achievements', '/settings', '/landing'];

  for (const route of routes) {
    console.log(`Checking http://localhost:5173${route}`);
    try {
      await page.goto(`http://localhost:5173${route}`);
      await new Promise(r => setTimeout(r, 1000));
    } catch (e) {
      console.log(`Failed to navigate to ${route}:`, e);
    }
  }

  console.log("\n--- DOM ERRORS & WARNINGS ---");
  if (errors.length === 0) {
    console.log("No errors found!");
  } else {
    const uniqueErrors = [...new Set(errors)];
    uniqueErrors.forEach(e => console.log(e));
  }
  
  await browser.close();
})();
