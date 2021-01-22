import {requestBackend} from "../../api/backend";
import {BackendSuccessfulResponse} from "../../api/backend/dto";
import {HttpStatusCode} from "../../constants/http-status";
import {FoodProduct} from "../../model/products";
import {AppThunk} from "../types";

export enum BOOKING_ACTION_TYPES {
    BOOKING_SET_DATE = "BOOKING/SET_DATE",
    BOOKING_SET_PICK_UP = "BOOKING/SET_PICK_UP",
    BOOKING_CART_ADD = "BOOKING/CART_ADD",
    BOOKING_CART_REMOVE = "BOOKING/CART_REMOVE",
    BOOKING_COMMENT_SET = "BOOKING/COMMENT_SET",
    BOOKING_VALIDATE_ORDER_BEGIN = "BOOKING/VALIDATE_ORDER_BEGIN",
    BOOKING_VALIDATE_ORDER_SUCCESS = "BOOKING/VALIDATE_ORDER_SUCCESS",
    BOOKING_VALIDATE_ORDER_FAILURE = "BOOKING/VALIDATE_ORDER_FAILURE",
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

export type ValidateOrderBeginAction = {
    type: string;
};

export type ValidateOrderSuccessAction = {
    type: string;
};

export type ValidateOrderFailureAction = {
    type: string;
};

export type BookingAction =
    | SetBookingDateAction
    | SetBookingPickUpAction
    | SetBookingCommentAction
    | AddToCartAction
    | RemoveFromCartAction
    | ValidateOrderBeginAction
    | ValidateOrderFailureAction
    | ValidateOrderSuccessAction;

export const setBookingDate = (date: Date): SetBookingDateAction => ({
    type: BOOKING_ACTION_TYPES.BOOKING_SET_DATE,
    date,
});

export const setBookingPickUp = (pick_up: Date): SetBookingPickUpAction => ({
    type: BOOKING_ACTION_TYPES.BOOKING_SET_PICK_UP,
    pick_up,
});

export const setBookingComment = (comment: string): SetBookingCommentAction => ({
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

const validateOrderBegin = (): ValidateOrderBeginAction => ({
    type: BOOKING_ACTION_TYPES.BOOKING_VALIDATE_ORDER_BEGIN,
});

const validateOrderFailure = (): ValidateOrderFailureAction => ({
    type: BOOKING_ACTION_TYPES.BOOKING_VALIDATE_ORDER_FAILURE,
});

const validateOrderSuccess = (): ValidateOrderSuccessAction => ({
    type: BOOKING_ACTION_TYPES.BOOKING_VALIDATE_ORDER_SUCCESS,
});

export const validateOrder = (): AppThunk<Promise<boolean>> => async (dispatch) => {
    dispatch(validateOrderBegin());

    const response = await requestBackend("auth/register", "POST", {}, {});

    if (response.status == HttpStatusCode.OK) {
        const successResp = response as BackendSuccessfulResponse;
        dispatch(validateOrderSuccess());
        return true;
    } else {
        dispatch(validateOrderFailure());
        return false;
    }
};

export const getBookingProducts = (): AppThunk<Promise<FoodProduct[]>> => async (dispatch, getState) => {
    const token = getState().auth.token;
    const {date} = getState().booking;

    const response = await requestBackend("", "GET", {}, {});

    if (response.status == HttpStatusCode.OK) {
        const successResp = response as BackendSuccessfulResponse;
        return [];
    } else {
        return [];
    }
};

/*
requestOFF("cgi/search.pl", "GET", {action: "process", json: true, page_size: 50}).then((r) => {
                const resp = r as OFFPaginatedResponse;
                const products = (resp.products as OFFProductDto[]).map(
                    (p: OFFProductDto): FoodProduct => ({
                        id: p.id,
                        name: p.product_name,
                        category: p.categories_hierarchy[0].split(":")[1],
                        thumbnailUrl: p.image_small_url,
                    }),
                );

                /*const p = resp.products[0];
                console.log(
                    Object.keys(p)
                        .filter((k) => k.match("categor") !== null)
                        .map((k) => `${k}: ${JSON.stringify(p[k])}`),
                );*/
/*
                //console.log((resp.products as OFFProductDto[]).map((p: OFFProductDto) => p.categories));*/
