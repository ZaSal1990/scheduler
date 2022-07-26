import { useState } from "react";

export default function useVisualMode(initMode) {
  const [mode, setMode] = useState(initMode);
  const [history, setHistory] = useState([initMode]);

  function transition(newMode, replace = false) { //value of rplace decides if 
    if (newMode !== mode) {
      setMode(newMode);
      (replace ? history[history.length - 1] = newMode : history.push(newMode));
      setHistory([ ...history ]);
    }
  }

  //Every time we add a mode to our history it goes to the top of the stack, this means to transition back to the previous mode, all //we need to do is remove the last item from the stack, and then setMode with the last item in the array.

  const back = () => {
    if (history.length > 1) {
      history.pop();
      setMode(history[history.length - 1]);
      setHistory([ ...history ]);
    }
  }

  return { mode, transition, back };
}