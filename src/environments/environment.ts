// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

const hostname = document.location.hostname;
let apiServer = 'http://music-api/api';  // vhost
// apiServer = 'http://localhost:5000/api',  // music-api
apiServer = 'http://127.0.0.1:8020/api';  // served for iPad
if (hostname === 'music-client.10.0.1.6.xip.io' ||
  hostname === 'music-client.vhx.cloud'
) { // client on iPad
  // PyCharm must run music-api on 0.0.0.0:8020
  apiServer = 'http://10.0.1.6:8020/api';
}
console.log('api server', apiServer);
export const environment = {
  apiServer: apiServer,
  googleUrl: 'https://google.nl/search?q=',
  freedbUrl: 'http://www.freedb.org/freedb_discid_check.php?discid=',
  amazonUrl: 'https://www.amazon.com/dp/',
  musicbrainz: 'https://musicbrainz.org/otherlookup/freedbid?other-lookup.freedbid=',
  production: false
};
