import { useState } from "react";

export default function useVisualMode(initMode) {
  const [mode, setMode] = useState(initMode);
  const [history, setHistory] = useState([initMode]);

  function transition(newMode, replace = false) {

    setMode(newMode);
    setHistory((prev) => {
      if (replace) {
        return [...prev.slice(0, -1), newMode];
      } else {
        return [...prev, newMode];
      }
    });
  }

  //Every time we add a mode to our history it goes to the top of the stack, this means to transition back to the previous mode, all //we need to do is remove the last item from the stack, and then setMode with the last item in the array.

  const back = () => {
    //console.log('history from inside back, at the start')
    if (history.length > 1) {
      const newHistory = history.slice(0, -1);
      setMode(newHistory[newHistory.length - 1]);
      setHistory(() => [...newHistory]);
      //console.log('history from inside back, at the end')
    }
  }

  return { mode, transition, back };
}