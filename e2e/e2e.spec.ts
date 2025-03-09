import { test, expect } from '@playwright/test';

test.use({ viewport: { width: 1920, height: 1080 } });

test('should exist the text Dashboard', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await expect(page.locator('text=Dashboard')).toBeVisible();
});

test('should click button Pulso and find MUI chip with PULSO text', async ({
  page,
}) => {
  await page.goto('http://localhost:3000');

  const pulsoButton = page.locator('.MuiButton-root', { hasText: 'Pulso' });

  await pulsoButton.click();

  const pulsoChip = page.locator('.MuiChip-root', { hasText: 'PULSO' });

  await expect(pulsoChip).toBeVisible();
});

test('should hide tables when YTD/YTG button is pressed', async ({ page }) => {
  await page.goto('http://localhost:3000');

  const ytdChipButton = page.locator('.MuiChip-root', { hasText: 'YTD/YTG' });

  await ytdChipButton.click();

  const tables = page.locator('.MuiDataGrid-root');

  const count = await tables.count();

  await expect(count).toBe(0);
});

test('should render 2 charts when YTD/YTG button is pressed', async ({
  page,
}) => {
  await page.goto('http://localhost:3000');

  const ytdChipButton = page.locator('.MuiChip-root', { hasText: 'YTD/YTG' });

  await ytdChipButton.click();

  const charts = page.locator('.MuiChartsGrid-root');

  const count = await charts.count();

  await expect(count).toBe(2);
});

test('should render 3 tables when Dinero button is clicked', async ({
  page,
}) => {
  await page.goto('http://localhost:3000');

  const dineroChip = page.locator('.MuiChip-root', { hasText: 'Dinero' });

  await dineroChip.click();

  const tables = page.locator('.MuiDataGrid-root');

  const count = await tables.count();

  await expect(count).toBe(3);
});
