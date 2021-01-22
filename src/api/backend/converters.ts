import {CreateProfileDto, ResponseProfileDto, ResponseUserDto} from "./dto";
import {UserProfile} from "../../model/user-profile";
import {User} from "../../model/user";

export function convertDtoToProfile(dto: ResponseProfileDto): UserProfile {
    return {
        ...dto,
    };
}

export function convertProfileToCreateDto(profile: UserProfile): CreateProfileDto {
    return {
        ...profile,
    };
}

export function convertPartialProfileToCreateDto(profile: Partial<UserProfile>): Partial<CreateProfileDto> {
    return {
        ...profile,
    };
}

export function convertDtoToUser(dto: ResponseUserDto): User {
    return {
        ...dto,
    };
}
