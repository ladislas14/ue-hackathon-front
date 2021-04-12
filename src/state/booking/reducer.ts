import {BookingState} from "../types";
import {
    AddToCartAction,
    BookingAction,
    BOOKING_ACTION_TYPES,
    RemoveFromCartAction,
    SetBookingDateAction,
    SetBookingPickUpAction,
    SetBookingCommentAction,
} from "./actions";

export const initialState: BookingState = {
    date: new Date(),
    pick_up: new Date(),
    comment: "",
    cart: [],
};

export const bookingReducer = (state: BookingState = initialState, action: BookingAction): BookingState => {
    switch (action.type) {
        case BOOKING_ACTION_TYPES.BOOKING_SET_DATE: {
            const {date} = action as SetBookingDateAction;
            return {...state, date};
        }
        case BOOKING_ACTION_TYPES.BOOKING_SET_PICK_UP: {
            const {pick_up} = action as SetBookingPickUpAction;
            return {...state, pick_up};
        }
        case BOOKING_ACTION_TYPES.BOOKING_COMMENT_SET: {
            const {comment} = action as SetBookingCommentAction;
            return {...state, comment};
        }
        case BOOKING_ACTION_TYPES.BOOKING_CART_ADD: {
            const {product, quantity} = action as AddToCartAction;
            const index = state.cart.findIndex((it) => it.product.id === product.id);
            if (index === -1) return {...state, cart: state.cart.concat([{product, quantity}])};
            else {
                return {
                    ...state,
                    cart: state.cart.map((it, i) => {
                        if (i === index) return {...it, quantity: it.quantity + 1};
                        else return it;
                    }),
                };
            }
        }
        case BOOKING_ACTION_TYPES.BOOKING_CART_REMOVE: {
            const {productId} = action as RemoveFromCartAction;
            const index = state.cart.findIndex((it) => it.product.id === productId);
            console.log(index);
            if (index === -1) return state;
            else if (state.cart[index].quantity === 1) {
                return {...state, cart: state.cart.filter((it) => it.product.id !== productId)};
            } else {
                return {
                    ...state,
                    cart: state.cart.map((it, i) => {
                        if (i === index) return {...it, quantity: it.quantity - 1};
                        else return it;
                    }),
                };
            }
        }
        default:
            return state;
    }
};
