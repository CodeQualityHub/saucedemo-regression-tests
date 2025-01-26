import { Page } from "@playwright/test";
import { LOGIN_PAGE_SELECTORS } from "../utils/constants";
import { readTestData } from "../utils/jsonUtils";

const config = readTestData("config.json");

export class LoginPage {
    private page: Page;

    // Konstruktor zur Initialisierung des Page-Objekts
    constructor(page: Page) {
        this.page = page;
    }

    // Navigiere zur Login-Seite
    async navigateToLoginPage() {
        await this.page.goto(config.loginUrl);
    }

    // Benutzername und Passwort eingeben, dann auf den Login-Button klicken
    async login(username: string, password: string) {
        await this.page.fill(LOGIN_PAGE_SELECTORS.USERNAME_INPUT, username);
        await this.page.fill(LOGIN_PAGE_SELECTORS.PASSWORD_INPUT, password);
        await this.page.click(LOGIN_PAGE_SELECTORS.LOGIN_BUTTON);
    }

    // Fehlermeldung bei fehlgeschlagenem Login abrufen
    async getErrorMessage() {
        return this.page.textContent(LOGIN_PAGE_SELECTORS.ERROR_MESSAGE); // Fehlermeldungselement
    }

    // Überprüfen, ob der Benutzer nach erfolgreichem Login zur Inventarseite weitergeleitet wird
    async isInventoryPageDisplayed() {
        return this.page.url().includes("/inventory.html");
    }
}