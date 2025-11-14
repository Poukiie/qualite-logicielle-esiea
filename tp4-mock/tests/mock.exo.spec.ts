import { test, expect } from '@playwright/test';

test('mock localStorage avec tâches existantes', async ({ page }) => {
  // Injecter un jeu de données avant que la page ne se charge
    await page.addInitScript(() => {
        const mockedTodos = [
            { title: 'Acheter du pain', completed: false },
            { title: 'Préparer le repas', completed: false },
            { title: 'Lire la documentation Playwright', completed: true },
            { title: 'Rentrer à la maison', completed: false }
        ];
        localStorage.setItem('react-todos', JSON.stringify(mockedTodos));
    });

    await page.goto('https://demo.playwright.dev/todomvc');

    // supprimer 1re tache
    const todoItem = page.locator('.todo-list li').filter({ hasText: 'Acheter du pain' });
    await todoItem.hover();
    await todoItem.locator('.destroy').click();
    
    // Vérification des tâches visibles dans l’interface
    await expect(page.getByText('Acheter du pain')).not.toBeVisible();
    await expect(page.getByText('Préparer le repas')).toBeVisible();
    await expect(page.getByText('Lire la documentation Playwright')).toBeVisible();
    await expect(page.getByText('Rentrer à la maison')).toBeVisible();
    await page.pause;
});