var React = require('react');
var createReactClass = require('create-react-class');

module.exports = function(Marty) {
  var MessageStore = Marty.createStore({
    getInitialState() {
      return {};
    },
    getMessage(message) {
      return this.fetch({
        id: message,
        locally() {
          return this.state[message];
        },
        remotely() {
          return new Promise(resolve => {
            setTimeout(() => {
              this.state[message] = message;
              resolve();
            }, 10);
          });
        }
      });
    }
  });

  var Application = Marty.createApplication(function() {
    this.register('messageStore', MessageStore);
  });

  var Child = createReactClass({
    render() {
      return <span id="child">{this.props.message}</span>;
    }
  });

  var ChildContainer = Marty.createContainer(Child, {
    listenTo: 'messageStore',
    fetch: {
      message() {
        return this.app.messageStore.getMessage('Child');
      }
    }
  });

  var Parent = createReactClass({
    render() {
      return (
        <div>
          <span id="parent">{this.props.message}</span>
          <ChildContainer />
        </div>
      );
    }
  });

  var ParentContainer = Marty.createContainer(Parent, {
    listenTo: 'messageStore',
    fetch: {
      message() {
        return this.app.messageStore.getMessage('Parent');
      }
    }
  });

  return {
    Application: Application,
    Component: ParentContainer
  };
};
