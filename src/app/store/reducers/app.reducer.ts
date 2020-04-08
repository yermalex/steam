import {ActionReducerMap} from '@ngrx/store';
import {AppState} from '../state/app.state';
import {routerReducer} from '@ngrx/router-store';
import {userReducer} from './user.reducer';
import {gameReducer} from './game.reducer';


export const appReducer: ActionReducerMap<AppState, any> = {
  router: routerReducer,
  users: userReducer,
  games: gameReducer,
};
