import { Page } from "@playwright/test";
import { CHECKOUT_PAGE_SELECTORS } from "../utils/constants";

export class CheckoutPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Fülle das Checkout-Formular aus
    async fillCheckoutForm(firstName: string, lastName: string, postalCode: string) {
        await this.page.fill(CHECKOUT_PAGE_SELECTORS.FIRST_NAME_INPUT, firstName);
        await this.page.fill(CHECKOUT_PAGE_SELECTORS.LAST_NAME_INPUT, lastName);
        await this.page.fill(CHECKOUT_PAGE_SELECTORS.POSTAL_CODE_INPUT, postalCode);
    }

    // Klicke auf die "Continue"-Schaltfläche, um zur Übersichtsseite zu gelangen
    async proceedToOverview() {
        await this.page.click(CHECKOUT_PAGE_SELECTORS.CONTINUE_BUTTON);
    }

    // Klicke auf die "Finish"-Schaltfläche, um den Kauf abzuschließen
    async completePurchase() {
        await this.page.click(CHECKOUT_PAGE_SELECTORS.FINISH_BUTTON);
    }

    // Überprüfe die Bestellbestätigungsnachricht
    async getConfirmationMessage() {
        return this.page.textContent(CHECKOUT_PAGE_SELECTORS.CONFIRMATION_MESSAGE);
    }

    // Ermittle die aktuelle URL der Seite
    async getCurrentUrl() {
        return this.page.url();
    }
}