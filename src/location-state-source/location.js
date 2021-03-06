let _ = require('../mindash');
let StateSource = require('../core/stateSource');
let locationFactory = defaultLocationFactory;

class LocationStateSource extends StateSource {
  constructor(options) {
    super(options);
    this._isLocationStateSource = true;
  }

  getLocation(location) {
    return locationFactory(this.app, location);
  }

  static setLocationFactory(value) {
    locationFactory = value;
  }
}

module.exports = LocationStateSource;

function defaultLocationFactory(app, location) {
  let l = location || window.location;

  return {
    url: l.url,
    path: l.pathname,
    hostname: l.hostname,
    query: query(l.search),
    protocol: l.protocol.replace(':', '')
  };

  function query(search) {
    let result = {};

    _.each(search.substr(1).split('&'), function (part) {
      let item = part.split('=');
      result[item[0]] = decodeURIComponent(item[1]);
    });

    return result;
  }
}