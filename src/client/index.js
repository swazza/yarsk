import React from "react";
import { render } from "react-dom";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { ConnectedRouter as Router, routerReducer, routerMiddleware, push } from "react-router-redux";
import createHistory from "history/createBrowserHistory";
import { ApolloClient, ApolloProvider, createNetworkInterface } from "react-apollo";
import { StyleSheet } from "aphrodite";
import { App } from "common/App";
import { appStore, appReducers } from "pods";
import { dataIdFromObject, resolvers } from "resolvers";

StyleSheet.rehydrate(window.__RENDERED_CLASS_NAMES);

const networkInterface = createNetworkInterface({ uri: process.env.gqlEndpoint }),
  client = new ApolloClient({
    networkInterface,
    dataIdFromObject,
    customResolvers: { Query: { ...resolvers } },
    initialState: window.__PRELOADED_STATE__ || {},
    shouldBatch: true
  }),
  history = createHistory(),
  reactRouterMiddleware = routerMiddleware(history),
  apolloMiddleware = client.middleware(),
  composeEnhancers =
    process.env.NODE_ENV === "production" ? compose : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose,
  store = createStore(
    combineReducers({ router: routerReducer, apollo: client.reducer(), ...appReducers }),
    { ...window.__PRELOADED_STATE__, ...appStore },
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
