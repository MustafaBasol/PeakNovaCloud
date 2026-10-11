import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 0,
  use: {
    baseURL: "http://localhost:3001",
  },
  expect: {
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.01,
      animations: "disabled",
    },
  },
  snapshotPathTemplate: "{testDir}/reference/{arg}{ext}",
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3001/tr/",
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
