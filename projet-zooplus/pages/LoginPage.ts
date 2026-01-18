import { Page, expect } from "@playwright/test";

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async gotoLoginPage() {
    await this.page.goto("https://www.zooplus.fr/account/login");
  }

  async acceptCookies() {
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
    return this.page.locator('[data-zta="welcome-section-title"]');
  }

  async getAlertText() {
    return this.page.locator('[data-zta="alertText"]');
  }
}
