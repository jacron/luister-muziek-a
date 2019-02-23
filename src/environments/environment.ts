// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

const hostname = document.location.hostname;
let apiServer;  // music-api
let moviesServer; // movies18
let booksServer;
let host;

console.log(document.location);
const myhost = '10.0.1.3';

if (hostname.includes('xip.io')
  || hostname.includes('vhx.cloud')
  || hostname.includes(myhost)) {
  host = 'http://' + myhost;
  apiServer = host + ':8020/api';
  moviesServer = host + ':5080';
  booksServer = host + '';
} else if (hostname.includes('127.0.0.1') ||
      hostname.includes('localhost')) {
  // use dev
  host = 'http://127.0.0.1';
  apiServer = host + ':8030/api';
  moviesServer = host + ':5090';
  booksServer = host + ':5050';
} else {
  // use 'prod'
  host = 'http://127.0.0.1';
  apiServer = 'http://music-api/api';
  moviesServer = 'http://movies18';
  booksServer = 'http://booklibrary';

}
console.log('api server', apiServer);
console.log('movie server', moviesServer);
console.log('book server', booksServer);
export const environment = {
  apiServer,
  moviesServer,
  booksServer,
  googleUrl: 'https://google.nl/search?q=',
  freedbUrl: 'http://www.freedb.org/freedb_discid_check.php?discid=',
  amazonUrl: 'https://www.amazon.com/dp/',
  musicbrainz: 'https://musicbrainz.org/otherlookup/freedbid?other-lookup.freedbid=',
  imdbTitle: 'https://www.imdb.com/title/',
  imdbTitleFind: 'https://www.imdb.com/find?s=tt&q=',
  production: false
};
