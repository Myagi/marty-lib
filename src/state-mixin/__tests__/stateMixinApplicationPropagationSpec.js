var React = require('react');
var createReactClass = require('create-react-class');
var expect = require('chai').expect;
var buildMarty = require('../../../test/lib/buildMarty');
var { renderIntoDocument } = require('react/addons').addons.TestUtils;

describe('State Mixin application Propagation', () => {
  var Marty, app;

  beforeEach(() => {
    Marty = buildMarty();
    app = new Marty.Application();
  });

  describe('when I have a container component', () => {
    let childApp;

    beforeEach(() => {
      var Child = createReactClass({
        mixins: [Marty.createStateMixin()],
        render() {
          return false;
        },
        getInitialState() {
          childApp = this.app;

          return {};
        }
      });

      var Parent = createReactClass({
        mixins: [Marty.createStateMixin()],
        render() {
          return <Child />;
        }
      });

      renderIntoDocument(<Parent app={app} />);
    });

    it('should pass the component to any children', () => {
      expect(childApp).to.equal(app);
    });
  });
});
