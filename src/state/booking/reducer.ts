import {BookingState} from "../types";
import {
    AddToCartAction,
    BookingAction,
    BOOKING_ACTION_TYPES,
    RemoveFromCartAction,
    SetBookingDateAction,
} from "./actions";

export const initialState: BookingState = {
    date: new Date(),
    cart: [],
};

export const bookingReducer = (state: BookingState = initialState, action: BookingAction): BookingState => {
    switch (action.type) {
        case BOOKING_ACTION_TYPES.BOOKING_SET_DATE: {
            const {date} = action as SetBookingDateAction;
            return {...state, date};
        }
        case BOOKING_ACTION_TYPES.BOOKING_CART_ADD: {
            const {product, quantity} = action as AddToCartAction;
            return {...state, cart: state.cart.concat([{product, quantity}])};
        }
        case BOOKING_ACTION_TYPES.BOOKING_CART_REMOVE: {
            const {productId} = action as RemoveFromCartAction;
            return {...state, cart: state.cart.filter((it) => it.product.id !== productId)};
        }
        default:
            return state;
    }
};
