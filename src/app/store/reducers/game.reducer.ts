import {GameState, initialGameState} from '../state/game.state';
import {EGameActions, GameActions} from '../actions/game.actions';


export const gameReducer = (
  state = initialGameState,
  action: GameActions
): GameState => {
  switch (action.type) {
    case EGameActions.GetGamesSuccess: {
      return {
        ...state,
        games: action.payload,
        gameIdWithDiscount: (Math.floor(Math.random() * ((action.payload.length) - 1 + 1)) + 1).toString()
      };
    }
    case EGameActions.GetNewPriceWithDiscountSuccess: {
      return {
        ...state,
        newPriceWithDiscount: action.payload * 0.5
      };
    }
    default:
      return state;
  }
};
