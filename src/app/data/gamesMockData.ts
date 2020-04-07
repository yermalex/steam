import {genreEnum, IGame} from '../store/models/game';

export const gamesMockData: IGame[] = [
  {
    id: '1',
    title: 'Metro: Exodus',
    description: 'Metro: Exodus - это сиквел Metro: Last Light,' +
      ' события которого разворачиваются в постапокалиптическом мире. https://kanobu.ru/games/metro-exodus/',
    genre: [genreEnum.Action],
    rating: 3.7,
    price: 1000,
    isInstall: false
  },
  {
    id: '2',
    title: 'The Elder Scrolls Online',
    description: 'The Elder Scrolls Online — это многопользовательская ролевая онлайн-игра.' +
      'https://kanobu.ru/games/the-elder-scrolls-online/',
    genre: [genreEnum.MMO, genreEnum.RPG],
    rating: 2,
    price: 2000,
    isInstall: false
  },
  {
    id: '3',
    title: 'Far Cry 3',
    description: 'qwerty',
    genre: [genreEnum.Shooter],
    rating: 5,
    price: 500,
    isInstall: false
  }
];
