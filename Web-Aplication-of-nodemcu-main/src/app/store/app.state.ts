import { Users } from '../interfaces/users';
import { Nodemcu } from './../interfaces/nodemcu';
import { createAction, createReducer, on, props } from '@ngrx/store';


export interface IAppState{
  thdados: Nodemcu[];
  thdadosMachine: Nodemcu[];
  login: Users[];
}

export const appInitialState: IAppState = {
  thdados: [],
  thdadosMachine: [],
  login: []
}

export const setThdados = createAction('[App] Define thdados', props<{payload: Nodemcu[]}>());
export const setThdadosMachine = createAction('[App] Define thdados Machine', props<{payload: Nodemcu[]}>());
export const setLogin = createAction('[App] Define Login', props<{payload:Users[]}>());

export const loadThdados = createAction('[App] Carrega thdados');
export const loadThdadosMachine = createAction('[App] Carrega thdadosMachine');
export const loadLogin = createAction('[App] Carrega login');


export const sucessoThdados = createAction('[App] [sucesso] Carrega thdados');
export const sucessoThdadosMachine = createAction('[App] [sucesso] Carrega thdadosMachine');
export const sucessoLogin = createAction('[App] [sucesso] Carrega login');



export const appReducer = createReducer(
  appInitialState,
  on(setThdados, (state, {payload}) => {
    state = {
      ...state,
      thdados: payload
    }
    return state;
  }),
  on(setThdadosMachine, (state, {payload}) => {
    state = {
      ...state,
      thdadosMachine: payload
    }
    return state;
  }),
  on(setLogin, (state, {payload}) => {
    state = {
      ...state,
      login: payload
    }
    return state;
  }),
)
