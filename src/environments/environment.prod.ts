export const environment = {
  apiServer: 'http://127.0.0.1:8010',
  weather: {
    apiWeather: 'http://api.openweathermap.org/data/2.5/weather?',
    apiWeatherKey: 'f9ce00dd6d4f56c2087a820370bb1ab0',
    windkaartUrl: 'http://members.ziggo.nl/hbruch/weer/windrichting.html',
    latlngNet: 'https://www.latlong.net/Show-Latitude-Longitude.html',
    buienradar: 'https://www.buienradar.nl/nederland/neerslag/buienradar/3uurs',
    buienradarApi: 'https://api.buienradar.nl/image/1.0/RadarMapNL?',
    windMap: '//cdn.knmi.nl/knmi/map/page/weer/actueel-weer/windkracht.png',
    tempMap: '//cdn.knmi.nl/knmi/map/page/weer/actueel-weer/temperatuur.png',
    weerliveApi: 'http://weerlive.nl/api/json-10min.php?locatie='
  },
  renamingCuesheet: true,
  googleUrl: 'https://google.nl/search?q=',
  freedbUrl: 'http://www.freedb.org/freedb_discid_check.php?discid=',
  amazonUrl: 'https://www.amazon.com/dp/',
  musicbrainz: 'https://musicbrainz.org/otherlookup/freedbid?other-lookup.freedbid=',
  production: true
};
