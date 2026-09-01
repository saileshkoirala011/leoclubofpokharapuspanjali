import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir:   "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries:   process.env.CI ? 2 : 0,
  workers:   process.env.CI ? 1 : undefined,
  reporter:  "html",

  use: {
    baseURL:       process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3000",
    trace:         "on-first-retry",
    screenshot:    "only-on-failure",
    video:         "retain-on-failure",
  },

  projects: [
    {
      name: "chromium",
      use:  { ...devices["Desktop Chrome"] },
    },
    // Mobile Chrome is only run locally — CI installs chromium only to keep
    // the runner fast. Add it back once a full browser matrix is needed.
    ...(process.env.CI ? [] : [
      {
        name: "Mobile Chrome",
        use:  { ...devices["Pixel 5"] },
      },
    ]),
  ],

  /* webServer is used for local development only.
   * In CI the server is started manually before `playwright test` runs,
   * so we skip this block to avoid a port-conflict on 3000.           */
  ...(process.env.CI ? {} : {
    webServer: {
      command:             "npm run dev",
      url:                 "http://localhost:3000",
      reuseExistingServer: true,
      timeout:             120_000,
    },
  }),
});
