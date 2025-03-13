import { createSelector } from "@reduxjs/toolkit";

// Selectors for order details
export const selectOrderNummer = (state) => state.order.orderNummer;

// Selectors for cart
export const selectCartItems = (state) => state.cart.items;

// Memoized selector to calculate total price efficiently
export const selectCartTotal = createSelector(
    (state) => state.cart.items,
    (items) => items.reduce((total, item) => total + item.price * item.quantity, 0)
);
