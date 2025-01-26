import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { ProductPage } from "../../pages/ProductPage";
import { CartPage } from "../../pages/CartPage";
import { readTestData } from "../../utils/jsonUtils";
import { severity, description, step } from "allure-js-commons"; // Import non-deprecated Allure functions

const users = readTestData("users.json").users;
const products = readTestData("products.json").products;

test.describe("Cart Regression Tests", () => {
    let loginPage: LoginPage;
    let productPage: ProductPage;
    let cartPage: CartPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        productPage = new ProductPage(page);
        cartPage = new CartPage(page);

        const validUser = users.find(user => user.username === "standard_user");
        await loginPage.navigateToLoginPage();
        await loginPage.login(validUser.username, validUser.password);

        await productPage.navigateToProductPage();
        await productPage.navigateToProductDetails(products[0].name);
        await productPage.addProductToCart();
        await productPage.navigateToCart();
    });

    test("Verify the product is in the cart", async () => {
        severity("critical"); // Schweregrad des Tests festlegen
        description("Überprüft, ob das Produkt im Warenkorb ist."); // Beschreibung des Tests hinzufügen

        await step("Überprüfen, ob das Produkt im Warenkorb ist", async () => {
            const isProductInCart = await cartPage.isProductInCart(products[0].name);
            expect(isProductInCart).toBeTruthy();
        });
    });

    test("Proceed to checkout", async () => {
        severity("normal"); // Schweregrad des Tests festlegen
        description("Navigiert zur Kasse und überprüft die URL."); // Beschreibung des Tests hinzufügen

        await step("Zur Kasse navigieren", async () => {
            await cartPage.proceedToCheckout();
        });

        await step("Überprüfen, ob die URL korrekt ist", async () => {
            const currentUrl = await cartPage.getCurrentUrl();
            expect(currentUrl).toContain("/checkout-step-one.html");
        });
    });
});