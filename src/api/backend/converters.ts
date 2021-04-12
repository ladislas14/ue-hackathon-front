import {ResponseProductDto, ResponseUserDto} from "./dto";
import {User} from "../../model/user";
import {FoodProduct} from "../../model/products";
import {OFFProductDto} from "../openfoodfacts/dto";

export function convertDtoToUser(dto: ResponseUserDto): User {
    return {...dto};
}

export function productFromDtos(offDto: OFFProductDto, backendDto: ResponseProductDto): FoodProduct {
    let cat = offDto.categories_hierarchy[0].split(":")[1];
    cat = cat.charAt(0).toUpperCase() + cat.substr(1);

    return {
        offId: offDto.id,
        name: offDto.product_name,
        category: cat,
        thumbnailUrl: offDto.image_small_url,
        date: new Date(backendDto.date),
        price: backendDto.price,
        id: backendDto.id,
        quantity: backendDto.quantity,
        remaningQuantity: backendDto.remainingQuantity,
    };
}
