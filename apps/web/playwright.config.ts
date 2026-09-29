import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  workers: 1,
  use: { baseURL: 'http://127.0.0.1:4175', viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' },
  webServer: { command: 'npm run preview -- --port 4175 --strictPort', url: 'http://127.0.0.1:4175', reuseExistingServer: !process.env.CI },
});
