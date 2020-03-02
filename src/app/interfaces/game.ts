import {genreEnum} from '../data/gamesMockData';

export interface IGame {
  id: string;
  title: string;
  description: string;
  genre: Array<genreEnum>;
  rating: number;
  price: number;
}


