import {Action} from '@ngrx/store';
import {IUser} from '../models/user';
import {IGame} from '../models/game';
import {EUserActions} from './user.actions';


export enum EGameActions {
  GetGames = '[Game] Get Games',
  GetGamesSuccess = '[Game] Get Games Success',
  GetNewPriceWithDiscount = '[Game] Get New Price With Discount',
  GetNewPriceWithDiscountSuccess = '[Game] Get New Price With Discount Success',
}


export class GetGames implements Action {
  public readonly type = EGameActions.GetGames;
}

export class GetGamesSuccess implements Action {
  public readonly type = EGameActions.GetGamesSuccess;
  constructor(public payload: IGame[]) {}
}

export class GetNewPriceWithDiscount implements Action {
  public readonly type = EGameActions.GetNewPriceWithDiscount;
}

export class GetNewPriceWithDiscountSuccess implements Action {
  public readonly type = EGameActions.GetNewPriceWithDiscountSuccess;
  constructor(public payload: number) {}
}


export type GameActions = GetGames
  | GetGamesSuccess
  | GetNewPriceWithDiscount
  | GetNewPriceWithDiscountSuccess;


