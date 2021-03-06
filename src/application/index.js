module.exports = function(marty, React, ReactDOMServer) {
  let Application = require('./application')(React, ReactDOMServer);
  let PropTypes = require('prop-types');
  marty.ApplicationContainer = require('./applicationContainer')(React);
  marty.createApplication = require('./createApplication')(Application);
  marty.Application = Application;
  marty.contextTypes = {
    app: PropTypes.instanceOf(Application)
  };
};
