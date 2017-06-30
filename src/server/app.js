import React from "react";
import { renderToString, renderToStaticMarkup } from "react-dom/server";
import { createStore, combineReducers } from "redux";
import { StaticRouter as Router } from "react-router";
import { routerReducer } from "react-router-redux";
import { ApolloClient, ApolloProvider, createNetworkInterface, getDataFromTree } from "react-apollo";
import { App } from "common/App";

export const renderApp = (html, req, res) => {
  const networkInterface = createNetworkInterface({ uri: "http://localhost:4000/graphql" }),
    client = new ApolloClient({ networkInterface, ssrMode: true }),
    store = createStore(combineReducers({ router: routerReducer, apollo: client.reducer() }));

  let context = {};
  let app = (
    <ApolloProvider client={client}>
      <Router location={req.url} context={context}>
        <App />
      </Router>
    </ApolloProvider>
  );

  getDataFromTree(app).then(() => {
    let appString = renderToString(app);
    let preloadedState = store.getState();
    let { data } = client.getInitialState();
    preloadedState.apollo.data = data;
    let renderedApp = html
      .replace("<!--ssr-->", appString)
      .replace("$ssrState", JSON.stringify(preloadedState).replace(/</g, "\\u003c"));

    res.status(200).send(renderedApp);
  });
};
