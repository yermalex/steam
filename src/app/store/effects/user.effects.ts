import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {BuyGame, BuyGameSuccess, EUserActions, GetUser, GetUsers, GetUsersSuccess, GetUserSuccess} from '../actions/user.actions';
import {map, switchMap, withLatestFrom} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';
import {of} from 'rxjs';
import {AppState} from '../state/app.state';


import {UserHttp} from '../models/http-models/user-http.interface';
import {SteamService} from '../../services/steam.service';
import {selectUserList} from '../selectors/user.selector';
import {selectGameList} from '../selectors/game.selector';


@Injectable()
export class UserEffects {

  constructor(
    private steamService: SteamService,
    private actions$: Actions,
    private store: Store<AppState>
  ) {}

  @Effect()
  getUsers$ = this.actions$.pipe(
    ofType<GetUsers>(EUserActions.GetUsers),
    switchMap(() => this.steamService.getUsers()),
    switchMap((userHttp: UserHttp) => of(new GetUsersSuccess(userHttp.users)))
  );

  @Effect()
  getUser$ = this.actions$.pipe(
    ofType<GetUser>(EUserActions.GetUser),
    map(action => action.payload),
    withLatestFrom(this.store.pipe(select(selectUserList))),
    switchMap(([id, allUsers]) => {
      const selectedUser = allUsers.filter(user => user.id === id)[0];
      return of(new GetUserSuccess(selectedUser));
    })
  );

  @Effect()
  BuyGame$ = this.actions$.pipe(
    ofType<BuyGame>(EUserActions.BuyGame),
    map(action => action.payload),
    withLatestFrom(this.store.pipe(select(selectGameList))),
    switchMap(([id, games]) => {
      const selectedGame = games.filter(game => game.id === id)[0];
      return of(new BuyGameSuccess(selectedGame));
    })
  );
}
