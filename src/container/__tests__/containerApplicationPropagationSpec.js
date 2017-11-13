var React = require('react');
var createReactClass = require('create-react-class');
var expect = require('chai').expect;
var buildMarty = require('../../../test/lib/buildMarty');
var { renderIntoDocument } = require('react/addons').addons.TestUtils;

describe('Container application Propagation', () => {
  var Marty, app;

  beforeEach(() => {
    Marty = buildMarty();
    app = new Marty.Application();
  });

  describe('when I have a container component', () => {
    let childApp;

    beforeEach(() => {
      var Child = createReactClass({
        render() {
          return false;
        },
        getInitialState() {
          childApp = this.app;

          return {};
        }
      });

      var ChildContainer = Marty.createContainer(Child);

      var Parent = createReactClass({
        render() {
          return <ChildContainer />;
        }
      });

      var ParentContainer = Marty.createContainer(Parent);

      renderIntoDocument(<ParentContainer app={app} />);
    });

    it('should pass the component to any children', () => {
      expect(childApp).to.equal(app);
    });
  });
});
