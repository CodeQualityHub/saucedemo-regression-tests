// src/utils/constants.ts
export const LOGIN_PAGE_SELECTORS = {
    USERNAME_INPUT: "#user-name",
    PASSWORD_INPUT: "#password",
    LOGIN_BUTTON: "#login-button",
    ERROR_MESSAGE: "[data-test='error']",
};

export const PRODUCT_PAGE_SELECTORS = {
    PRODUCT_NAME: ".inventory_item_name", // Selector for product name in the list
    PRODUCT_IMAGE: ".inventory_item_img", // Selector for product image in the list
    ADD_TO_CART_BUTTON: "#add-to-cart", // Selector for "Add to Cart" button on the details page
    CART_COUNT: ".shopping_cart_link",
    CART_LINK: ".shopping_cart_link",
};

export const PRODUCT_DETAILS_PAGE_SELECTORS = {
    PRODUCT_NAME: ".inventory_item_name", // Selector for product name on the details page
    ADD_TO_CART_BUTTON: "#add-to-cart", // Selector for "Add to Cart" button on the details page
};

export const CART_PAGE_SELECTORS = {
    CHECKOUT_BUTTON: "#checkout",
    PRODUCT_NAME: ".inventory_item_name",
    REMOVE_BUTTON: "button:has-text('Remove')",
};

export const CHECKOUT_PAGE_SELECTORS = {
    FIRST_NAME_INPUT: "#first-name",
    LAST_NAME_INPUT: "#last-name",
    POSTAL_CODE_INPUT: "#postal-code",
    CONTINUE_BUTTON: "#continue",
    FINISH_BUTTON: "#finish",
    CONFIRMATION_MESSAGE: ".complete-header",
};