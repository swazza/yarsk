import React from "react";
import { render } from "react-dom";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { ConnectedRouter as Router, routerReducer, routerMiddleware, push } from "react-router-redux";
import createHistory from "history/createBrowserHistory";
import { ApolloClient, ApolloProvider, createNetworkInterface } from "react-apollo";
import { App } from "common/App";

const networkInterface = createNetworkInterface({ uri: "http://localhost:4000/graphql" }),
  client = new ApolloClient({ networkInterface, initialState: window.__PRELOADED_STATE__ || {} }),
  history = createHistory(),
  reactRouterMiddleware = routerMiddleware(history),
  apolloMiddleware = client.middleware(),
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose,
  store = createStore(
    combineReducers({ router: routerReducer, apollo: client.reducer() }),
    window.__PRELOADED_STATE__,
    composeEnhancers(applyMiddleware(reactRouterMiddleware, apolloMiddleware))
  );

const renderApp = () =>
  render(
    <ApolloProvider store={store} client={client}>
      <Router history={history}>
        <App />
      </Router>
    </ApolloProvider>,
    document.querySelector("#mount")
  );

renderApp();

if (module.hot) {
  module.hot.accept("common/App", () => {
    renderApp();
  });
}
