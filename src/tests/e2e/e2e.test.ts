import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { ProductPage } from "../../pages/ProductPage";
import { CartPage } from "../../pages/CartPage";
import { CheckoutPage } from "../../pages/CheckoutPage";
import { readTestData } from "../../utils/jsonUtils";
import { severity, description, step } from "allure-js-commons"; // Import non-deprecated Allure functions

// Schritt 1: Testdaten aus JSON-Dateien lesen
const users = readTestData("users.json").users;
const products = readTestData("products.json").products;
const config = readTestData("config.json");

test.describe("End-to-End Test Suite", () => {
    let loginPage: LoginPage;
    let productPage: ProductPage;
    let cartPage: CartPage;
    let checkoutPage: CheckoutPage;

    // Schritt 2: Vor jedem Test einrichten
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        productPage = new ProductPage(page);
        cartPage = new CartPage(page);
        checkoutPage = new CheckoutPage(page);

        // Mit gültigen Anmeldedaten einloggen
        const validUser = users.find(user => user.username === "standard_user");
        await loginPage.navigateToLoginPage();
        await loginPage.login(validUser.username, validUser.password);
    });

    // Schritt 3: Nach jedem Test aufräumen
    test.afterEach(async ({ page }) => {
        // Zurück zur Inventarseite navigieren, um den Zustand zurückzusetzen
        await page.goto(config.inventoryUrl);
    });

    test.afterEach(async () => {
        // Warenkorb leeren, um Testisolation sicherzustellen
        await productPage.clearCart();
    });

    // Testfall: Vollständiger End-to-End-Kaufprozess
    test("Complete end-to-end purchase flow", async () => {
        severity("critical"); // Schweregrad des Tests festlegen
        description("Testet den vollständigen End-to-End-Kaufprozess."); // Beschreibung des Tests hinzufügen

        // Schritt 4: Ein Produkt zum Warenkorb hinzufügen
        const productName = products[0].name; // Verwende das erste Produkt aus der JSON-Datei
        await step("Zur Produktseite navigieren", async () => {
            await productPage.navigateToProductPage();
        });

        await step("Zur Produktdetailseite navigieren", async () => {
            await productPage.navigateToProductDetails(productName);
        });

        await step("Produkt zum Warenkorb hinzufügen", async () => {
            await productPage.addProductToCart();
        });

        // Schritt 5: Überprüfen, ob das Produkt im Warenkorb ist
        await step("Zur Warenkorbseite navigieren", async () => {
            await productPage.navigateToCart();
        });

        await step("Überprüfen, ob das Produkt im Warenkorb ist", async () => {
            const isProductInCart = await cartPage.isProductInCart(productName);
            expect(isProductInCart).toBeTruthy();
        });

        // Schritt 6: Zur Kasse gehen
        await step("Zur Kasse navigieren", async () => {
            await cartPage.proceedToCheckout();
        });

        // Schritt 7: Checkout-Formular ausfüllen
        const validUser = users.find(user => user.username === "standard_user");
        const { firstName, lastName, postalCode } = validUser.checkout;
        await step("Checkout-Formular ausfüllen", async () => {
            await checkoutPage.fillCheckoutForm(firstName, lastName, postalCode);
        });

        // Schritt 8: Kauf abschließen
        await step("Zur Übersichtsseite navigieren", async () => {
            await checkoutPage.proceedToOverview();
        });

        await step("Kauf abschließen", async () => {
            await checkoutPage.completePurchase();
        });

        // Schritt 9: Bestätigungsnachricht überprüfen
        await step("Bestätigungsnachricht überprüfen", async () => {
            const confirmationMessage = await checkoutPage.getConfirmationMessage();
            expect(confirmationMessage).toContain("Thank you for your order!");
        });
    });
});