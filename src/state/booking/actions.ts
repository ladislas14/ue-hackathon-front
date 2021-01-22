import {FoodProduct} from "../../model/products";

export enum BOOKING_ACTION_TYPES {
    BOOKING_SET_DATE = "BOOKING/SET_DATE",
    BOOKING_SET_PICK_UP = "BOOKING/SET_PICK_UP",
    BOOKING_CART_ADD = "BOOKING/CART_ADD",
    BOOKING_CART_REMOVE = "BOOKING/CART_REMOVE",
    BOOKING_COMMENT_SET = "BOOKING/COMMENT_SET"
}

export type SetBookingDateAction = {
    type: string;
    date: Date | null;
};

export type SetBookingPickUpAction = {
    type: string;
    pick_up: Date | null;
};

export type SetBookingCommentAction = {
    type: string;
    comment: string;
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

export type BookingAction = SetBookingDateAction | SetBookingPickUpAction | SetBookingCommentAction | AddToCartAction | RemoveFromCartAction;

export const setBookingDate = (date: Date): SetBookingDateAction => ({
    type: BOOKING_ACTION_TYPES.BOOKING_SET_DATE,
    date,
});

export const SetBookingPickUp = (pick_up: Date): SetBookingPickUpAction => ({
    type: BOOKING_ACTION_TYPES.BOOKING_SET_PICK_UP,
    pick_up,
});

export const SetBookingComment = (comment: string): SetBookingCommentAction => ({
    type: BOOKING_ACTION_TYPES.BOOKING_COMMENT_SET,
    comment,
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
