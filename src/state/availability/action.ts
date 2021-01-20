import {FoodProduct} from "../../model/products";

export enum AVAILABILITY_ACTION_TYPES {
    AVAILABILITY_SET_DATE = "AVAILABILITY/SET_DATE",
    AVAILABILITY_INVENTORY_ADD = "AVAILABILITY/INVENTORY_ADD",
    AVAILABILITY_INVENTORY_REMOVE = "AVAILABILITY/INVENTORY_REMOVE",
}

export type SetAvailabilityDateAction = {
    type: string;
    date: Date | null;
};

export type AddToInventoryAction = {
    type: string;
    product: FoodProduct;
    quantity: number;
};

export type RemoveFromInventoryAction = {
    type: string;
    productId: string;
};

export type AvailabilityAction = SetAvailabilityDateAction | AddToInventoryAction | RemoveFromInventoryAction;

export const setAvailabilityDate = (date: Date): SetAvailabilityDateAction => ({
    type: AVAILABILITY_ACTION_TYPES.AVAILABILITY_SET_DATE,
    date,
});

export const addToInventory = (product: FoodProduct, quantity: number): AddToInventoryAction => ({
    type: AVAILABILITY_ACTION_TYPES.AVAILABILITY_INVENTORY_ADD,
    product,
    quantity,
});

export const removeFromInventory = (productId: string): RemoveFromInventoryAction => ({
    type: AVAILABILITY_ACTION_TYPES.AVAILABILITY_INVENTORY_REMOVE,
    productId,
});