import { RouterReducerState } from '@ngrx/router-store';
import { initialGiftState, GiftState } from './gift.state';

export interface AppState {
    router?: RouterReducerState;
    gifts: GiftState;
}

export const initialAppState: AppState = {
    gifts: initialGiftState
};

export function getInitialState(): AppState {
    return initialAppState;
}
