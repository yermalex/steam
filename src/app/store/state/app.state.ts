import {RouterReducerState} from '@ngrx/router-store';
import {initialUserState, UserState} from './user.state';
import {initialGameState, GameState} from './game.state';


export interface AppState {
  router?: RouterReducerState;
  users: UserState;
  games: GameState;
}

export const initialAppState: AppState = {
  users: initialUserState,
  games: initialGameState
};

// export function getInitialState(): AppState {
//   return initialAppState;
// }
