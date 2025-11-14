import { test } from '@playwright/test';
import { TodoPage } from '../pages/TodoPage';

test('ajouter une tâche TODO', async ({ page }) => {
    const todoPage = new TodoPage(page);
    await todoPage.goto();
    await todoPage.addTask('Acheter du pain');
    await todoPage.addTask('Aller courir');
    await todoPage.isTaskVisible('Acheter du pain');
    await todoPage.isTaskVisible('Aller courir');

    await todoPage.deleteTask('Acheter du pain');
    
    // Vérifier que la tâche "Acheter du pain" a été supprimée
    await todoPage.isTaskNotVisible('Acheter du pain');
    await todoPage.isTaskVisible('Aller courir');
});