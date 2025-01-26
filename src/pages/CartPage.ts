import { Page } from "@playwright/test";
import { CART_PAGE_SELECTORS } from "../utils/constants";
import { readTestData } from "../utils/jsonUtils";

const config = readTestData("config.json");

export class CartPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Überprüfe, ob ein Produkt anhand des Namens im Warenkorb ist
    async isProductInCart(productName: string) {
        const productInCart = this.page.locator(CART_PAGE_SELECTORS.PRODUCT_NAME, { hasText: productName });
        return await productInCart.isVisible();
    }

    // Klicke auf die "Checkout"-Schaltfläche
    async proceedToCheckout() {
        await this.page.click(CART_PAGE_SELECTORS.CHECKOUT_BUTTON);
    }

    // Entferne ein Produkt aus dem Warenkorb anhand des Namens
    async removeProductFromCart(productName: string) {
        const productItem = this.page.locator(".cart_item").filter({ hasText: productName });
        await productItem.locator("button:has-text('Remove')").click();
    }

    // Ermittle die aktuelle URL der Seite
    async getCurrentUrl() {
        return this.page.url();
    }
}