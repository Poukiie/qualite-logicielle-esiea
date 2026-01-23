import { Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async gotoLoginPage() {
    await this.page.goto("https://www.zooplus.fr/account/overview");
    await this.page.waitForLoadState("networkidle"); // attendre que la page soit chargée
    await this.page.getByRole('button', { name: 'Utiliser uniquement les cookies nécessaires' }).click();
  }

  async fillEmail(email: string) {
    await this.page.getByLabel("Adresse e-mail").fill(email);
  }

  async fillPassword(password: string) {
    await this.page.getByRole('textbox', { name: "Mot de passe" }).fill(password);
  }

  async submitLogin() {
    await this.page.getByRole("button", { name: "M'identifier" }).click();
  }

  async login(email: string, password: string) {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.submitLogin();
  }

  async getWelcomeTitle() {
    await this.page.waitForLoadState("networkidle");
    return this.page.locator('[data-zta="welcome-section-title"]');
  }

  async getAlertText() {
    return this.page.locator('[data-zta="alertText"]');
  }
}
