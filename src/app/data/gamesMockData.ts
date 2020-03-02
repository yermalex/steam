import {IGame} from '../interfaces/game';

export enum genreEnum {
  Action = 'Экшен',
  Shooter = 'Шутер',
  Puzzle = 'Головоломка',
  RPG = 'РПГ',
  Strategy = 'Стратегия',
  Indi = 'Инди',
  singlePlayer = 'Одиночная игра',
  multiPlayer = 'Мультиплеер'
}

export const gamesMockData: IGame[] = [
  {
    id: '1',
    title: 'Metro: Exodus',
    description: 'Metro: Exodus - это сиквел Metro: Last Light,' +
      ' события которого разворачиваются в постапокалиптическом мире. https://kanobu.ru/games/metro-exodus/',
    genre: [genreEnum.Action, genreEnum.Indi],
    rating: 3.7,
    price: 1000
  },
  {
    id: '2',
    title: 'The Elder Scrolls Online',
    description: 'The Elder Scrolls Online — это многопользовательская ролевая онлайн-игра.' +
      'https://kanobu.ru/games/the-elder-scrolls-online/',
    genre: [genreEnum.RPG],
    rating: 2,
    price: 2000
  },
  {
    id: '3',
    title: 'The Elder Scrolls Online',
    description: 'The Elder Scrolls Online — это многопользовательская ролевая онлайн-игра.' +
      'https://kanobu.ru/games/the-elder-scrolls-online/',
    genre: [genreEnum.Action],
    rating: 5,
    price: 500
  }
];
