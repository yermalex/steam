import {IGame} from '../models/game';


export interface GameState {
  games: IGame[];
  gameIdWithDiscount: string;
  newPriceWithDiscount: number;
}
export const initialGameState: GameState = {
  games: [],
  gameIdWithDiscount: null,
  newPriceWithDiscount: null,
};
