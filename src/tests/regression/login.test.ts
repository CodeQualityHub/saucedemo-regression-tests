import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { readTestData } from "../../utils/jsonUtils";
import { severity, description, step } from "allure-js-commons"; 

const users = readTestData("users.json").users;
const config = readTestData("config.json");
const products = readTestData("products.json").products;

test.describe("Login Regression Tests", () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.navigateToLoginPage();
    });

    test.afterEach(async ({ page }) => {
        // Beispiel: Zurück zur Login-Seite navigieren, um den Zustand zurückzusetzen
        await page.goto(config.loginUrl);
    });

    test("Login with valid credentials", async () => {
        severity("critical"); // Schweregrad des Tests festlegen
        description("Testet den Login mit gültigen Anmeldedaten."); // Beschreibung des Tests hinzufügen

        const validUser = users.find(user => user.username === "standard_user");
        await step("Login mit gültigen Anmeldedaten durchführen", async () => {
            await loginPage.login(validUser.username, validUser.password);
        });

        await step("Überprüfen, ob die Inventarseite angezeigt wird", async () => {
            const isInventoryPageDisplayed = await loginPage.isInventoryPageDisplayed();
            expect(isInventoryPageDisplayed).toBeTruthy();
        });
    });

    test("Login with invalid credentials", async () => {
        severity("normal"); // Schweregrad des Tests festlegen
        description("Testet den Login mit ungültigen Anmeldedaten."); // Beschreibung des Tests hinzufügen

        const invalidUser = users.find(user => user.username === "invalid_user_1");
        await step("Login mit ungültigen Anmeldedaten durchführen", async () => {
            await loginPage.login(invalidUser.username, invalidUser.password);
        });

        await step("Fehlermeldung überprüfen", async () => {
            const errorMessage = await loginPage.getErrorMessage();
            expect(errorMessage).toContain("Username and password do not match");
        });
    });

    test("Login with special characters", async () => {
        severity("normal"); // Schweregrad des Tests festlegen
        description("Testet den Login mit Sonderzeichen in den Anmeldedaten."); // Beschreibung des Tests hinzufügen

        const specialCharUser = users.find(user => user.username === "special_char_user!@#");
        await step("Login mit Sonderzeichen durchführen", async () => {
            await loginPage.login(specialCharUser.username, specialCharUser.password);
        });

        await step("Fehlermeldung überprüfen", async () => {
            const errorMessage = await loginPage.getErrorMessage();
            expect(errorMessage).toContain("Username and password do not match");
        });
    });
});