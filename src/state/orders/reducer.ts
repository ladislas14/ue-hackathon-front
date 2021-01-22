import {OrdersState} from "../types";
import {
    SetOrdersDateAction,
    OrdersAction,
    ORDERS_ACTION_TYPES,
} from "./actions";

export const initialState: OrdersState = {
    date: new Date(),
};

export const availabilityReducer = (state: OrdersState = initialState, action: OrdersAction): OrdersState => {
    switch (action.type) {
        case ORDERS_ACTION_TYPES.ORDERS_SET_DATE: {
            const {date} = action as SetOrdersDateAction;
            return {...state, date};
        }
        default:
            return state;
    }
};