import {AppState} from '../state/app.state';
import {createSelector} from '@ngrx/store';
import {UserState} from '../state/user.state';
import {GameState} from '../state/game.state';

const selectGames = (state: AppState) => state.games;

export const selectGameList = createSelector(
  selectGames,
  (state: GameState) => state.games
);

export const selectGameListByGenre = createSelector(
  selectGames,
  (state: GameState, props) => state.games.filter(game => {
    let val;
    game.genre.forEach(genre => {
      if (genre === props.gameGenre) { val = true; }
    });
    return val;
  })
);


export const selectGame = createSelector(
  selectGames,
  (state: GameState, props) => state && state.games.find(game => game.id === props.gameID)
);

export const selectGameIdWithDiscount = createSelector(
  selectGames,
  (state: GameState) => state.gameIdWithDiscount
);

export const selectNewPriceWithDiscount = createSelector(
  selectGames,
  (state: GameState) => state.newPriceWithDiscount
);


