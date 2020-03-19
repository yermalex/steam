import {RouterReducerState} from '@ngrx/router-store';
import {initialUserState, UserState} from './user.state';
import {ConfigState, initialConfigState} from './config.state';

export interface AppState {
  router?: RouterReducerState;
  users: UserState;
  config: ConfigState;
}

export const initialAppState: AppState = {
  users: initialUserState,
  config: initialConfigState
};

export function getInitialState(): AppState {
  return initialAppState;
}
