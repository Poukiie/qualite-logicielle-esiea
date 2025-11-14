import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc/#/');
    await page.getByRole('textbox', { name: 'What needs to be done?' }).dblclick();
    await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
    await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('p');
    await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
    await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('envoyer doc');
    await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
    await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('télécharger fiche de salaire');
    await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
    await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('faire un truc spécifique');
    await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
    await expect(page.getByText('envoyer doc')).toBeVisible();
    await expect(page.getByText('télécharger fiche de salaire')).toBeVisible();
    await expect(page.getByText('faire un truc spécifique')).toBeVisible();
});