import {AvailabilityState} from "../types";
import {
    AddToInventoryAction,
    AvailabilityAction,
    AVAILABILITY_ACTION_TYPES,
    RemoveFromInventoryAction,
    SetAvailabilityDateAction,
    SetAvailabilityOpeningHoursAction,
    SetAvailabilityClosingHoursAction,
} from "./actions";

export const initialState: AvailabilityState = {
    date: new Date(),
    openingHour: new Date(),
    closingHour: new Date(),
    inventory: [],
};

export const availabilityReducer = (state: AvailabilityState = initialState, action: AvailabilityAction): AvailabilityState => {
    switch (action.type) {
        case AVAILABILITY_ACTION_TYPES.AVAILABILITY_SET_DATE: {
            const {date} = action as SetAvailabilityDateAction;
            return {...state, date};
        }
        case AVAILABILITY_ACTION_TYPES.AVAILABILITY_SET_OPENINGHOURS: {
            const {openingHour} = action as SetAvailabilityOpeningHoursAction;
            return {...state, openingHour};
        }
        case AVAILABILITY_ACTION_TYPES.AVAILABILITY_SET_CLOSINGHOURS: {
            const {closingHour} = action as SetAvailabilityClosingHoursAction;
            return {...state, closingHour};
        }
        case AVAILABILITY_ACTION_TYPES.AVAILABILITY_INVENTORY_ADD: {
            const {product, quantity} = action as AddToInventoryAction;
            return {...state, inventory: state.inventory.concat([{product, quantity}])};
        }
        case AVAILABILITY_ACTION_TYPES.AVAILABILITY_INVENTORY_REMOVE: {
            const {productId} = action as RemoveFromInventoryAction;
            return {...state, inventory: state.inventory.filter((it) => it.product.id !== productId)};
        }
        default:
            return state;
    }
};