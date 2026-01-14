import { test, expect } from '@playwright/test';

test('Mock de la liste des utilisateurs récupérée avec GET', async ({ page }) => {
    const mockData = {
        data: [
            { id: 1, first_name: 'Jean', last_name: 'Dupont', email: 'jean.dupont@example.com' },
            { id: 2, first_name: 'Claire', last_name: 'Martin', email: 'claire.martin@example.com' }
        ]
    };

    await page.route('**/api/users?page=2', async route => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({ data: mockData })
        });
    });

    await page.goto('https://reqres.in/');

    const data = await page.evaluate(() => 
        fetch('https://reqres.in/api/users?page=2')
            .then(res => res.json())
            .then(json => json.data)
    );

    expect(data).toEqual(mockData);    

    await page.unroute('**/api/users?page=2');
});

test('Création de la création d\'un utilisateur avec POST', async ({ page }) => {

    await page.route('**/api/users', async route => {
        const body = route.request().postDataJSON();

        await route.fulfill({
            status: 201,
            contentType: 'application/json',
            body: JSON.stringify({
                id: '123',
                name: body.name,
                job: body.job,
                createdAt: '2026-01-13T10:00:00.000Z',
            }),
        });
    });

    await page.goto('https://reqres.in/');
    
    const response = await page.evaluate(async () => {
        const res = await fetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
                name: 'test',
                job: 'user',
            }),
        });
        return {
            status: res.status,
            body: await res.json(),
        };
    });

    expect(response.status).toBe(201);
    expect(response.body.id).toBe('123');
    expect(response.body.name).toBe('test');
    expect(response.body.job).toBe('user');
    expect(response.body.createdAt).toBeDefined();

    await page.unroute('**/api/users');
});

test('Modification d\'un utilisateur avec PUT', async ({ page }) => {
    await page.route('**/api/users/123', async route => {

        const body = route.request().postDataJSON();

        await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
            id: '123',
            name: 'test',
            job: body.job,
            updatedAt: '2026-01-13T11:00:00.000Z',
        }),
        });
    });

    await page.goto('https://reqres.in/');

    const response = await page.evaluate(async () => {
        const res = await fetch('/api/users/123', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                job: 'user updated',
            }),
        });

        return {
            status: res.status,
            body: await res.json(),
        };
    });

    expect(response.status).toBe(200);
    expect(response.body.job).toBe('user updated');
    expect(response.body.updatedAt).toBeDefined();

    await page.unroute('**/api/users/123');
});

test('Modification d\'un utilisateur avec PATCH', async ({ page }) => {
    await page.route('**/api/users/123', async route => {
        const body = route.request().postDataJSON();

        await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
            id: '123',
            name: body.name,
            job: body.job,
            updatedAt: '2026-01-13T12:00:00.000Z',
        }),
        });
    });

    await page.goto('https://reqres.in/');

    const response = await page.evaluate(async () => {
        const res = await fetch('/api/users/123', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'teeeessssst',
                job: 'bouzigouloum',
            }),
        });

        return {
            status: res.status,
            body: await res.json(),
        };
    });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('teeeessssst');
    expect(response.body.job).toBe('bouzigouloum');

    await page.unroute('**/api/users/123');
});

test('DELETE /api/users/:id - delete user', async ({ page }) => {
    await page.route('**/api/users/123', async route => {
        expect(route.request().method()).toBe('DELETE');
            await route.fulfill({
            status: 204,
        });
    });

    await page.goto('https://reqres.in/');

    const status = await page.evaluate(async () => {
            const res = await fetch('/api/users/123', {
            method: 'DELETE',
        });

        return res.status;
    });

    expect(status).toBe(204);

    await page.unroute('**/api/users/123');
});