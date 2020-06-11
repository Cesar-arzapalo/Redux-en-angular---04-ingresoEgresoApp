import { createReducer, on, ActionCreator } from '@ngrx/store';
import { isLoading, stopLoading } from './ui.actions';

export interface State {
    isLoading: boolean;
}

export const initialState: State = {
   isLoading: false,
};

const _UI_REDUCER = createReducer(initialState,

    on(isLoading, state => ({ ...state, isLoading: true })),
    on(stopLoading, state => ({ ...state, isLoading: false })),

);

export function uiReducer(state: State, action: ActionCreator) {
    return _UI_REDUCER(state, action);
}
