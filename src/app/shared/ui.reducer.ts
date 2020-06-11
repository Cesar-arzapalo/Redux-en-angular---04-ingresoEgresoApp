import { createReducer, on } from '@ngrx/store';
import { isLoading } from './ui.actions';

export interface State {
    isLoading: boolean;
}

export const initialState: State = {
   isLoading: false,
}

const _COUNTER_REDUCER = createReducer(initialState,

    on(isLoading, state => ({ ...state, isLoading: 'true'})),

);

export function counterReducer(state, action) {
    return _COUNTER_REDUCER(state, action);
}