import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {switchMap, withLatestFrom} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';
import {of} from 'rxjs';
import {AppState} from '../state/app.state';
import {SteamService} from '../../services/steam.service';

import {
  EGameActions,
  GetGames,
  GetGamesSuccess, GetNewPriceWithDiscount, GetNewPriceWithDiscountSuccess
} from '../actions/game.actions';
import {GameHttp} from '../models/http-models/game-http.interface';
import {selectGameIdWithDiscount, selectGameList} from '../selectors/game.selector';
import {IGame} from '../models/game';



@Injectable()
export class GameEffects {

  constructor(
    private steamService: SteamService,
    private actions$: Actions,
    private store: Store<AppState>
  ) {}

  @Effect()
  getGames$ = this.actions$.pipe(
    ofType<GetGames>(EGameActions.GetGames),
    switchMap(() => this.steamService.getGames()),
    switchMap((gameHttp: GameHttp) => of(new GetGamesSuccess(gameHttp.games)))
  );

  @Effect()
  GetNewPriceWithDiscount$ = this.actions$.pipe(
    ofType<GetNewPriceWithDiscount>(EGameActions.GetNewPriceWithDiscount),
    withLatestFrom(this.store.pipe(select(selectGameList)), this.store.pipe(select(selectGameIdWithDiscount))),
    switchMap(([, games, id]: [object, IGame[], string]) => {
      const selectedGame = games.filter(game => game.id === id)[0];
      return of(new GetNewPriceWithDiscountSuccess(selectedGame.price));
    })
  );
}
