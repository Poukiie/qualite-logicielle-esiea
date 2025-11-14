import { test, expect } from '@playwright/test';
    test('ajouter une tâche TODO', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc');
    await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Acheter du pain');
    await page.keyboard.press('Enter');
    await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Aller courir');
    await page.keyboard.press('Enter');

    await expect(page.getByText('Acheter du pain')).toBeVisible();
    await expect(page.getByText('Aller courir')).toBeVisible();

    await page.getByText('Acheter du pain').hover()
    await page.getByRole('button', { name: 'Delete' }).click();

    await expect(page.getByText('Aller courir')).toBeVisible();
    await expect(page.getByText('Acheter du pain')).not.toBeVisible();
    await page.pause();
});