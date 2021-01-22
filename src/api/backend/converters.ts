import {ResponseUserDto} from "./dto";
import {User} from "../../model/user";

export function convertDtoToUser(dto: ResponseUserDto): User {
    return {...dto};
}
