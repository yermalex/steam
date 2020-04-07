import {Action} from '@ngrx/store';
import {IUser} from '../models/user';
import {IGame} from '../models/game';
import {Update} from '@ngrx/entity';

export enum EUserActions {
  GetUsers = '[User] Get Users',
  GetUsersSuccess = '[User] Get Users Success',
  GetUser = '[User] Get User',
  GetUserSuccess = '[User] Get User Success',

  DelSelectedUser = '[User] Delete Selected User',
  AddUser = '[User] Add User',

  BuyGame = '[User] Buy Game',
  BuyGameSuccess = '[User] Buy Game Success',

  InstallGame = '[User] InstallGame'
}

export class GetUsers implements Action {
  public readonly type = EUserActions.GetUsers;
}

export class GetUsersSuccess implements Action {
  public readonly type = EUserActions.GetUsersSuccess;
  constructor(public payload: IUser[]) {}
}

export class GetUser implements Action {
  public readonly type = EUserActions.GetUser;
  constructor(public payload: string) {}
}

export class GetUserSuccess implements Action {
  public readonly type = EUserActions.GetUserSuccess;
  constructor(public payload: IUser) {}
}

export class DelSelectedUser implements Action {
  public readonly type = EUserActions.DelSelectedUser;
}

export class AddUser implements Action {
  public readonly type = EUserActions.AddUser;
  constructor(public payload: IUser) {}
}

export class BuyGame implements Action {
  public readonly type = EUserActions.BuyGame;
  constructor(public payload: string) {}
}

export class BuyGameSuccess implements Action {
  public readonly type = EUserActions.BuyGameSuccess;
  constructor(public payload: IGame) {}
}

export class InstallGame implements Action {
  public readonly type = EUserActions.InstallGame;
  constructor(public payload: IGame) {}
}

export type UserActions =
  AddUser
  | BuyGame
  | BuyGameSuccess
  | GetUsers
  | GetUsersSuccess
  | GetUser
  | GetUserSuccess
  | DelSelectedUser
  | InstallGame;


