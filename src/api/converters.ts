import {CreateProfileDto, ResponseProfileDto, ResponseUserDto} from "./dto";
import {UserProfile} from "../model/user-profile";
import {User} from "../model/user";

export function convertDtoToProfile(dto: ResponseProfileDto): UserProfile {
    return {
        ...dto,
        avatarUrl: dto.avatar,
        birthdate: new Date(dto.birthdate),
    };
}

export function convertProfileToCreateDto(profile: UserProfile): CreateProfileDto {
    return {
        ...profile,
        birthdate: profile.birthdate.toJSON(),
    };
}

export function convertPartialProfileToCreateDto(profile: Partial<UserProfile>): Partial<CreateProfileDto> {
    return {
        ...profile,
        birthdate: profile.birthdate?.toJSON(),
    };
}

export function convertDtoToUser(dto: ResponseUserDto): User {
    return {
        ...dto,
        profile: dto.profile ? convertDtoToProfile(dto.profile) : undefined,
    };
}
