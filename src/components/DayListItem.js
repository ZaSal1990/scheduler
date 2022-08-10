import React from "react";
import 'components/DayListItem.scss'
import classNames from "classnames";

export default function DayListItem(props) {

  const formatSpots = function (spots) { //creating dispaly msg to pass pre-written tests for DayListItem
    if (spots === 1)
      return spots + " spot remaining";
    else if (spots > 1)
      return spots + " spots remaining";
    else if (!spots)
      return "no spots remaining";
  }

  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots
  });


  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)} selected={props.selected} data-testid="day">
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}


