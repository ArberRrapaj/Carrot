// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  countriesUrl: 'http://localhost:8123/api/countries',
  gamesUrl: 'http://localhost:8123/api/games',
  genresUrl: 'http://localhost:8123/api/genres',
  librariesUrl: 'http://localhost:8123/api/libraries',
  usersUrl: 'http://localhost:8123/api/users',
  loginUrl: 'http://localhost:8123/api/users/login'
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
