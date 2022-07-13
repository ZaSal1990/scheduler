import React from "react";

import "components/Button.scss";

import classNames from "classnames";

export default function Button(props) {
   const buttonClass = classNames("button", { //if/elsing to create className string if prop.property exist
     "button--confirm": props.confirm, //appending to classname for additional CSS styling
     "button--danger": props.danger //classNames('foo', { bar: false }); // => 'foo' FORMAT
   });
 
   return (
     <button className={buttonClass} onClick={props.onClick} disabled={props.disabled}>{props.children}</button>
   );
 }

 //props.children is extracted from props, the button text is passed down as props //props.children contains anything that is inside the tags of a component.
