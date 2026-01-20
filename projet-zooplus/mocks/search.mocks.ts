import { Page } from "@playwright/test";

export async function mockSearch(page: Page) {
  await page.route("**/search/results**", async route => {
    await route.fulfill({
      status: 200,
      contentType: "text/html",
      body: `
        <html>
          <body>
            <h1 data-zta="page-title">Résultats pour "croquettes"</h1>

            <div data-testid="product-card">
              <h2>Croquettes premium pour chat</h2>
            </div>

            <div data-testid="product-card">
              <h2>Croquettes bio pour chat</h2>
            </div>
          </body>
        </html>
      `
    });
  });
}

export async function mockSearchNoResults(page: Page) {
  await page.route("**/search**", async route => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        products: []
      })
    });
  });
}
