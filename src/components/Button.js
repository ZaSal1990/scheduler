import React from "react";

import "components/Button.scss";

import classNames from "classnames";

export default function Button(props) {
  const buttonClass = classNames("button", { //if/elsing to create className string if prop.property exist
    "button--confirm": props.confirm, //appending to classname for additional CSS styling
    "button--danger": props.danger
  });

  return (
    <button className={buttonClass} onClick={props.onClick} disabled={props.disabled}>{props.children}</button>
  );
}

