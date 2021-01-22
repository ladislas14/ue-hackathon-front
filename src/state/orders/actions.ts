export enum ORDERS_ACTION_TYPES {
    ORDERS_SET_DATE = "ORDERS/SET_DATE",
}

export type SetOrdersDateAction = {
    type: string;
    date: Date | null;
};

export type OrdersAction = SetOrdersDateAction;

export const setOrdersDate = (date: Date): SetOrdersDateAction => ({
    type: ORDERS_ACTION_TYPES.ORDERS_SET_DATE,
    date,
});
