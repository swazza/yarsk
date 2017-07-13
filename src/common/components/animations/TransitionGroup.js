import React, { Component, Children, cloneElement } from "react";
import { TransitionMotion, spring } from "react-motion";

export const _TransitionGroup = ({ children, transitionType, className }) => {
  let { style, defaultStyle, enter, leave, transform } = transitionType;
  let styles = Children.map(children, child => ({
    key: child.key,
    data: { child },
    style: style
  }));

  let defaultStyles = Children.map(children, child => ({
    key: child.key,
    style: defaultStyle
  }));

  return (
    <TransitionMotion defaultStyles={defaultStyles} styles={styles} willEnter={() => enter} willLeave={() => leave}>
      {styleConfigs =>
        <div className={className}>
          {styleConfigs.map(({ key, style: { x }, data }, index) => {
            return (
              <div
                key={key}
                style={{ position: "absolute", top: "0", bottom: "0", width: "100%", transform: transform(x) }}
              >
                {data.child}
              </div>
            );
          })}
        </div>}
    </TransitionMotion>
  );
};
