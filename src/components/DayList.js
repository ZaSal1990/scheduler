import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
return ( <ul>
  {props.days.map(day => <DayListItem key={day.id} setDay selected={day.name === props.day}/>)}
</ul>)
}