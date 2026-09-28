import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({

  testDir: './tests',
  testMatch: '**/*.spec.ts',

  timeout: 30000,

  fullyParallel: false,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['list'],
    ['./utils/PdfReporter.ts'],
    ['allure-playwright']
  ],

  use: {
    trace: 'on',
    headless: false,
    baseURL: 'https://rahulshettyacademy.com',
    launchOptions: {
      args: [
        '--start-maximized',
        '--window-size=1920,1080',
      ],
    },
    actionTimeout: 5000,
  },

  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        viewport: null,
      },
    },
  ],
});
