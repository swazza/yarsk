import React from "react";
import { renderToString, renderToStaticMarkup } from "react-dom/server";
import { createStore, combineReducers } from "redux";
import { StaticRouter as Router } from "react-router";
import { routerReducer } from "react-router-redux";
import { ApolloClient, ApolloProvider, createNetworkInterface, getDataFromTree } from "react-apollo";
import { StyleSheetServer, StyleSheetTestUtils } from "aphrodite/no-important";
import { App } from "common/App";
import { appStore, appReducers } from "pods";
import { dataIdFromObject, resolvers } from "resolvers";

export const renderApp = (html, req, res) => {
  const networkInterface = createNetworkInterface({ uri: process.env.gqlEndpoint }),
    client = new ApolloClient({
      networkInterface,
      dataIdFromObject,
      customResolvers: { Query: { ...resolvers } },
      ssrMode: true,
      shouldBatch: true
    }),
    store = createStore(combineReducers({ router: routerReducer, apollo: client.reducer(), ...appReducers }), {
      ...appStore
    });

  let context = {};
  let app = (
    <ApolloProvider store={store} client={client}>
      <Router location={req.url} context={context}>
        <App />
      </Router>
    </ApolloProvider>
  );

  // Aphrodite won't support async style injection. So we disable it till Apollo collects all the required data asynchronously.
  StyleSheetTestUtils.suppressStyleInjection();
  getDataFromTree(app)
    .then(() => {
      // Now that all the data has been collected by Apollo, we can resume style injection for Aphrodite.
      StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
      let { html: appString, css } = StyleSheetServer.renderStatic(() => renderToString(app));
      let preloadedState = store.getState();
      let { data } = client.getInitialState();
      preloadedState.apollo.data = data;
      let renderedApp = html
        .replace("<!--ssr-->", appString)
        .replace("window.$ssrState", JSON.stringify(preloadedState).replace(/</g, "\\u003c"))
        .replace("window.$renderedClasses", JSON.stringify(css.renderedClassNames))
        .replace("/*css.content*/", css.content);

      res.status(200).send(renderedApp);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
};
