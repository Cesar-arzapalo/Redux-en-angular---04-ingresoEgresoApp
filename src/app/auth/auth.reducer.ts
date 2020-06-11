import { createReducer, on } from '@ngrx/store';
import { setUser, unSetUser } from './auth.action';
import { Usuario } from 'src/models/usuario.models';

export interface State {
    user: Usuario;
}

export const initialState: State = {
   user: null,
};

const _AUTH_REDUCER = createReducer(initialState,

    on(setUser, (state, {user}) => ({ ...state, user: { ...user } })),
    on(unSetUser, (state ) => ({ ...state, user: null })),

);

export function authReducer(state, action) {
    return _AUTH_REDUCER(state, action);
}
