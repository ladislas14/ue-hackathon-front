import {CreateProfileDto} from "../../api/backend/dto";
import {createProfile} from "../../state/profile/actions";
import store from "../../state/store";
import {MyThunkDispatch, OnboardingState} from "../../state/types";

function onboardingStateToDto(onboardingState: OnboardingState): CreateProfileDto {
    /* eslint-disable @typescript-eslint/no-non-null-assertion */

    return {
        firstName: onboardingState.firstname!,
        lastName: onboardingState.lastname!,
        cardCode: onboardingState.barCode ? parseInt(onboardingState.barCode) : undefined,
        role: onboardingState.role!,
    };
}

export function finishOnboarding(onboardingState: OnboardingState): void {
    const createProfileDto = onboardingStateToDto(onboardingState);
    if (createProfileDto) (store.dispatch as MyThunkDispatch)(createProfile(createProfileDto));
}
