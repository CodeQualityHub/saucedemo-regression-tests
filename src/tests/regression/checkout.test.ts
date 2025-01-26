import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { ProductPage } from "../../pages/ProductPage";
import { CartPage } from "../../pages/CartPage";
import { CheckoutPage } from "../../pages/CheckoutPage";
import { readTestData } from "../../utils/jsonUtils";
import { severity, description, step } from "allure-js-commons"; // Import non-deprecated Allure functions

const users = readTestData("users.json").users;
const products = readTestData("products.json").products;
const config = readTestData("config.json");

test.describe("Checkout Regression Tests", () => {
    let loginPage: LoginPage;
    let productPage: ProductPage;
    let cartPage: CartPage;
    let checkoutPage: CheckoutPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        productPage = new ProductPage(page);
        cartPage = new CartPage(page);
        checkoutPage = new CheckoutPage(page);

        const validUser = users.find(user => user.username === "standard_user");
        await loginPage.navigateToLoginPage();
        await loginPage.login(validUser.username, validUser.password);

        await productPage.navigateToProductPage();
        await productPage.navigateToProductDetails(products[0].name);
        await productPage.addProductToCart();
        await productPage.navigateToCart();

        await cartPage.proceedToCheckout();
    });

    test.afterEach(async ({ page }) => {
        // Beispiel: Zurück zur Login-Seite navigieren, um den Zustand zurückzusetzen
        await page.goto(config.loginUrl);
    });

    test("Fill out the checkout form and proceed to the overview page", async () => {
        severity("critical"); // Schweregrad des Tests festlegen
        description("Füllt das Checkout-Formular aus und navigiert zur Übersichtsseite."); // Beschreibung des Tests hinzufügen

        const validUser = users.find(user => user.username === "standard_user");
        const { firstName, lastName, postalCode } = validUser.checkout;

        await step("Checkout-Formular ausfüllen", async () => {
            await checkoutPage.fillCheckoutForm(firstName, lastName, postalCode);
        });

        await step("Zur Übersichtsseite navigieren", async () => {
            await checkoutPage.proceedToOverview();
        });

        await step("Überprüfen, ob die URL korrekt ist", async () => {
            const currentUrl = await checkoutPage.getCurrentUrl();
            expect(currentUrl).toContain("/checkout-step-two.html");
        });
    });

    test("Complete the purchase and verify the confirmation message", async () => {
        severity("critical"); // Schweregrad des Tests festlegen
        description("Schließt den Kauf ab und überprüft die Bestätigungsnachricht."); // Beschreibung des Tests hinzufügen

        const validUser = users.find(user => user.username === "standard_user");
        const { firstName, lastName, postalCode } = validUser.checkout;

        await step("Checkout-Formular ausfüllen", async () => {
            await checkoutPage.fillCheckoutForm(firstName, lastName, postalCode);
        });

        await step("Zur Übersichtsseite navigieren", async () => {
            await checkoutPage.proceedToOverview();
        });

        await step("Kauf abschließen", async () => {
            await checkoutPage.completePurchase();
        });

        await step("Bestätigungsnachricht überprüfen", async () => {
            const confirmationMessage = await checkoutPage.getConfirmationMessage();
            expect(confirmationMessage).toContain("Thank you for your order!");
        });
    });
});