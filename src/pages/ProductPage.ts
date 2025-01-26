import { Page } from "@playwright/test";
import { PRODUCT_PAGE_SELECTORS, CART_PAGE_SELECTORS } from "../utils/constants";
import { readTestData } from "../utils/jsonUtils";

const config = readTestData("config.json");

export class ProductPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Navigiere zur Produktlistenseite
    async navigateToProductPage() {
        await this.page.goto(config.inventoryUrl);
    }

    // Navigiere zur Produktdetailseite, indem auf den Produktnamen geklickt wird
    async navigateToProductDetails(productName: string) {
        const productItem = this.page.locator(".inventory_item").filter({ hasText: productName });
        await productItem.locator(PRODUCT_PAGE_SELECTORS.PRODUCT_NAME).click();
    }

    // Füge das Produkt vom Produktdetailseite zum Warenkorb hinzu
    async addProductToCart() {
        await this.page.click(PRODUCT_PAGE_SELECTORS.ADD_TO_CART_BUTTON);
    }

    // Entferne ein Produkt aus dem Warenkorb anhand des Namens
    async removeProductFromCart(productName: string) {
        const productItem = this.page.locator(".cart_item").filter({ hasText: productName });
        await productItem.locator("button:has-text('Remove')").click();
    }

    // Leere alle Artikel aus dem Warenkorb
    async clearCart() {
        await this.navigateToCart();
        const removeButtons = await this.page.locator("button:has-text('Remove')").all();
        for (const button of removeButtons) {
            await button.click();
        }
    }

    // Ermittle die Anzahl der Artikel im Warenkorb
    async getCartCount() {
        return this.page.textContent(PRODUCT_PAGE_SELECTORS.CART_COUNT);
    }
    
    // Überprüfe, ob ein Produkt im Warenkorb ist
    async isProductInCart(productName: string) {
        const productInCart = this.page.locator(".cart_item").filter({ hasText: productName });
        return await productInCart.isVisible();
    }

    // Navigiere zur Warenkorbseite
    async navigateToCart() {
        await this.page.click(PRODUCT_PAGE_SELECTORS.CART_LINK);
    }

    // Ermittle die aktuelle URL der Seite
    async getCurrentUrl(): Promise<string> {
        return this.page.url();
    }
}