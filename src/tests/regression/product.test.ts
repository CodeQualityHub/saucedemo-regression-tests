import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { ProductPage } from "../../pages/ProductPage";
import { readTestData } from "../../utils/jsonUtils";
import { severity, description, step } from "allure-js-commons"; // Import non-deprecated Allure functions

const users = readTestData("users.json").users;
const products = readTestData("products.json").products;
const config = readTestData("config.json");

test.describe("Product Regression Tests", () => {
    let loginPage: LoginPage;
    let productPage: ProductPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        productPage = new ProductPage(page);

        const validUser = users.find(user => user.username === "standard_user");
        await loginPage.navigateToLoginPage();
        await loginPage.login(validUser.username, validUser.password);
    });

    test.afterEach(async ({ page }) => {
        // Beispiel: Zurück zur Inventarseite navigieren, um den Zustand zurückzusetzen
        await page.goto(config.inventoryUrl);
    });

    test.afterEach(async () => {
        // Warenkorb nach jedem Test leeren, um Isolation sicherzustellen
        await productPage.clearCart();
    });

    test("Add a product to the cart", async () => {
        severity("critical"); // Schweregrad des Tests festlegen
        description("Fügt ein Produkt zum Warenkorb hinzu und überprüft die Warenkorbanzahl."); // Beschreibung des Tests hinzufügen

        await step("Zur Produktseite navigieren", async () => {
            await productPage.navigateToProductPage();
        });

        await step("Zur Produktdetailseite navigieren", async () => {
            await productPage.navigateToProductDetails(products[0].name);
        });

        await step("Produkt zum Warenkorb hinzufügen", async () => {
            await productPage.addProductToCart();
        });

        await step("Überprüfen, ob die Warenkorbanzahl aktualisiert wurde", async () => {
            const cartCount = await productPage.getCartCount();
            expect(cartCount).toBe("1");
        });
    });

    test("Remove a product from the cart", async () => {
        severity("normal"); // Schweregrad des Tests festlegen
        description("Entfernt ein Produkt aus dem Warenkorb und überprüft, ob es nicht mehr vorhanden ist."); // Beschreibung des Tests hinzufügen

        await step("Zur Produktseite navigieren", async () => {
            await productPage.navigateToProductPage();
        });

        await step("Zur Produktdetailseite navigieren", async () => {
            await productPage.navigateToProductDetails(products[0].name);
        });

        await step("Produkt zum Warenkorb hinzufügen", async () => {
            await productPage.addProductToCart();
        });

        await step("Zur Warenkorbseite navigieren", async () => {
            await productPage.navigateToCart();
        });

        await step("Produkt aus dem Warenkorb entfernen", async () => {
            await productPage.removeProductFromCart(products[0].name);
        });

        await step("Überprüfen, ob das Produkt nicht mehr im Warenkorb ist", async () => {
            const isProductInCartAfterRemoval = await productPage.isProductInCart(products[0].name);
            expect(isProductInCartAfterRemoval).toBeFalsy();
        });
    });
});