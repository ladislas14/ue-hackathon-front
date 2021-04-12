import {CondOperator, RequestQueryBuilder} from "@nestjsx/crud-request";
import {requestBackend} from "../../api/backend";
import {productFromDtos} from "../../api/backend/converters";
import {BackendSuccessfulResponse, ResponseProductDto} from "../../api/backend/dto";
import {requestOFF} from "../../api/openfoodfacts";
import {OFFProductDto, OFFResponse} from "../../api/openfoodfacts/dto";
import {HttpStatusCode} from "../../constants/http-status";
import {FoodProduct} from "../../model/products";
import {AppThunk} from "../types";

export enum AVAILABILITY_ACTION_TYPES {
    AVAILABILITY_SET_DATE = "AVAILABILITY/SET_DATE",
    AVAILABILITY_INVENTORY_ADD = "AVAILABILITY/INVENTORY_ADD",
    AVAILABILITY_INVENTORY_REMOVE = "AVAILABILITY/INVENTORY_REMOVE",
    AVAILABILITY_SET_OPENINGHOURS = "AVAILABILITY/SET_OPENINGHOURS",
    AVAILABILITY_SET_CLOSINGHOURS = "AVAILABILITY/SET_CLOSINGHOURS",
}

export type SetAvailabilityDateAction = {
    type: string;
    date: Date | null;
};

export type SetAvailabilityOpeningHoursAction = {
    type: string;
    openingHour: Date | null;
};

export type SetAvailabilityClosingHoursAction = {
    type: string;
    closingHour: Date | null;
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

export type AvailabilityAction =
    | SetAvailabilityDateAction
    | SetAvailabilityOpeningHoursAction
    | SetAvailabilityClosingHoursAction
    | AddToInventoryAction
    | RemoveFromInventoryAction;

export const setAvailabilityDate = (date: Date): SetAvailabilityDateAction => ({
    type: AVAILABILITY_ACTION_TYPES.AVAILABILITY_SET_DATE,
    date,
});

export const setAvailabilityOpeningHours = (openingHour: Date): SetAvailabilityOpeningHoursAction => ({
    type: AVAILABILITY_ACTION_TYPES.AVAILABILITY_SET_OPENINGHOURS,
    openingHour,
});

export const setAvailabilityClosingHours = (closingHour: Date): SetAvailabilityClosingHoursAction => ({
    type: AVAILABILITY_ACTION_TYPES.AVAILABILITY_SET_CLOSINGHOURS,
    closingHour,
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

export const getAvailabilityProducts = (): AppThunk<Promise<FoodProduct[]>> => async (dispatch, getState) => {
    const {date} = getState().availability;

    if (!date) return [];

    const qb = RequestQueryBuilder.create();

    qb.setFilter({
        field: "date",
        operator: CondOperator.EQUALS,
        value: date.toISOString(),
    });

    const response = await requestBackend("products", "GET", {}, {}, undefined, true, "?" + qb.query());

    if (response.status == HttpStatusCode.OK) {
        const resp = response as BackendSuccessfulResponse;
        const products = resp.products as ResponseProductDto[];
        const promises = products.map((p: ResponseProductDto) =>
            requestOFF(`api/v0/product/${p.offId}.json`, "GET", {}),
        );

        const prods: FoodProduct[] = (await Promise.all(promises)).map((resp: OFFResponse, i: number) =>
            productFromDtos(resp.product as OFFProductDto, products[i]),
        );
        return prods;
    } else {
        return [];
    }
};
