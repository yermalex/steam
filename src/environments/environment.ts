// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {Environment} from './interface';

export const environment: Environment = {
  production: false,
  apiKey: 'AIzaSyDzXzSgEkc9zRwnntQzUaMiS-vzU9nUVt8',
  fbDbUrl: 'https://steam-36441.firebaseio.com'
  // firebaseConfig: {
  //   apiKey: 'AIzaSyDzXzSgEkc9zRwnntQzUaMiS-vzU9nUVt8',
  //   authDomain: 'steam-36441.firebaseapp.com',
  //   databaseURL: 'https://steam-36441.firebaseio.com',
  //   projectId: 'steam-36441',
  //   storageBucket: 'steam-36441.appspot.com',
  //   messagingSenderId: '708808005911',
  //   appId: '1:708808005911:web:269ed49b6be41b9e413f52'
  // }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
