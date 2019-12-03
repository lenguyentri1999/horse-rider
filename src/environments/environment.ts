// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const version = '10';

export const environment = {
  production: false,
  version,
  firebase: {
    apiKey: 'AIzaSyA9WtOMm-vC_4oTp89ixutagUJWpYR3Ry0',
    authDomain: 'horse-riding-app.firebaseapp.com',
    databaseURL: 'https://horse-riding-app.firebaseio.com',
    projectId: 'horse-riding-app',
    storageBucket: 'horse-riding-app.appspot.com',
    messagingSenderId: '215364264641',
    appId: '1:215364264641:web:75095f272cfe5cba'
  },
  firebasePath: `App/Dev/v${version}/`,
  mapboxKey: `pk.eyJ1IjoibGVuZ3V5ZW50cmkxOTk5IiwiYSI6ImNrMTJyM3dwejAxbWwzaHA2d3BvMmhzMXAifQ.x0Iy-kvy7uv7rsbi4dixrQ`
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
