import {FoodProduct} from "../../model/products";

export enum BOOKING_ACTION_TYPES {
    BOOKING_SET_DATE = "BOOKING/SET_DATE",
    BOOKING_CART_ADD = "BOOKING/CART_ADD",
    BOOKING_CART_REMOVE = "BOOKING/CART_REMOVE",
}

export type SetBookingDateAction = {
    type: string;
    date: Date | null;
};

export type AddToCartAction = {
    type: string;
    product: FoodProduct;
    quantity: number;
};

export type RemoveFromCartAction = {
    type: string;
    productId: string;
};

export type BookingAction = SetBookingDateAction | AddToCartAction | RemoveFromCartAction;

export const setBookingDate = (date: Date): SetBookingDateAction => ({
    type: BOOKING_ACTION_TYPES.BOOKING_SET_DATE,
    date,
});

export const addToCart = (product: FoodProduct, quantity: number): AddToCartAction => ({
    type: BOOKING_ACTION_TYPES.BOOKING_CART_ADD,
    product,
    quantity,
});

export const removeFromCart = (productId: string): RemoveFromCartAction => ({
    type: BOOKING_ACTION_TYPES.BOOKING_CART_REMOVE,
    productId,
});
