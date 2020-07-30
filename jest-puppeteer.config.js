module.exports = {
  launch: {
    headless: !(process.env.HEADLESS === 'false'),
    slowMo: process.env.SLOWMO ? process.env.SLOWMO : 0,
    defaultViewport: { width: 1500, height: 700},
    executablePath: process.env.CHROMIUM_PATH || null,
    args: [
      '--disable-gpu',
      '--disable-dev-shm-usage',
      '--no-first-run',
      '--no-zygote',
      '--no-sandbox',
    ],
  },
  browserContext: 'incognito',
  exitOnPageError: false,
}; 