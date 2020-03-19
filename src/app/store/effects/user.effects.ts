import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {EUserActions, GetUser, GetUsers, GetUsersSuccess, GetUserSuccess} from '../actions/user.actions';
import {map, switchMap, withLatestFrom} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';
import {of} from 'rxjs';
import {AppState} from '../state/app.state';

import {UserService} from '../../services/user.service';
import {UserHttp} from '../models/http-models/user-http.interface';
import { selectUserList } from '../selectors/user.selector';


@Injectable()
export class UserEffects {
  @Effect()
  getUser$ = this._actions$.pipe(
    ofType<GetUser>(EUserActions.GetUser),
    map(action => action.payload),
    withLatestFrom(this._store.pipe(select(selectUserList))),
    switchMap(([id, users]) => {
      const selectedUser = users.filter(user => user.id === +id)[0];
      return of(new GetUserSuccess(selectedUser));
    })
  );

  @Effect()
  getUsers$ = this._actions$.pipe(
    ofType<GetUsers>(EUserActions.GetUsers),
    switchMap(() => this._userService.getUsers()),
    switchMap((userHttp: UserHttp) => of(new GetUsersSuccess(userHttp.users)))
  );

  constructor(
    private _userService: UserService,
    private _actions$: Actions,
    private _store: Store<AppState>
  ) {}
}
