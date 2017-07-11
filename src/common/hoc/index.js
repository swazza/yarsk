import React, { Component } from "react";
import { gql, graphql, compose } from "react-apollo";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { StyleSheet, css } from "aphrodite/no-important";

export default compose;
export const withNav = WrappedComponent => <WrappedComponent />;

export const withStyles = styles => WrappedComponent =>
  class extends Component {
    render() {
      const stylesheet = StyleSheet.create(styles);
      const classNames = Object.keys(stylesheet)
        .map(className => ({
          key: className,
          value: css(stylesheet[className])
        }))
        .reduce((acc, className) => {
          acc[className.key] = className.value;
          return acc;
        }, {});

      return <WrappedComponent styles={classNames} {...this.props} />;
    }
  };

export const withQuery = (query, options = {}) => WrappedComponent => graphql(gql`${query}`, options)(WrappedComponent);
export const withMutation = (mutation, options = {}) => WrappedComponent =>
  graphql(gql`${mutation}`, options)(WrappedComponent);

export const withState = (selector, actions) => WrappedComponent =>
  connect(
    (state, ownProps) => ({ ...selector(state), ...ownProps }),
    dispatch => bindActionCreators({ ...actions }, dispatch)
  )(WrappedComponent);
