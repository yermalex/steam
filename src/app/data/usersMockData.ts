import {IUser} from '../interfaces/user';
import {IGame} from '../interfaces/game';
import {gamesMockData, genreEnum} from './gamesMockData';

export const usersMockData: IUser[] = [
  {
    id: '1',
    nickname: 'alex',
    email: 'yermakov@ya.ru',
    password: '000000',
    returnSecureToken: null,
    purchasedGames: [gamesMockData[0], gamesMockData[1]]
  },
  {
    id: '2',
    nickname: 'ivan',
    email: 'ivan@mail.ru',
    password: '0000000',
    returnSecureToken: null,
    purchasedGames: []
  }
];
