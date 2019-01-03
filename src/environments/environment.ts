// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

const hostname = document.location.hostname;
let apiServer;  // music-api
let moviesServer; // movies18
let host;
const lanHostname = 'music-client.10.0.1.6.xip.io';
const localVirtualHostname = 'music-client.vhx.cloud';

if (hostname === lanHostname || hostname === localVirtualHostname) { // client on iPad
  // PyCharm runs music-api on 0.0.0.0:8020
  host = '10.0.1.6';
} else {
  host = '127.0.0.1';
}
apiServer = 'http://' + host + ':8020/api';
moviesServer = 'http://' + host + ':5080';
console.log('api server', apiServer);
export const environment = {
  apiServer,
  moviesServer,
  googleUrl: 'https://google.nl/search?q=',
  freedbUrl: 'http://www.freedb.org/freedb_discid_check.php?discid=',
  amazonUrl: 'https://www.amazon.com/dp/',
  musicbrainz: 'https://musicbrainz.org/otherlookup/freedbid?other-lookup.freedbid=',
  production: false
};
