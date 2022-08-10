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
      } //creating LIFO method
    });
  }

  const back = () => {

    if (history.length > 1) {
      const newHistory = history.slice(0, -1);
      setMode(newHistory[newHistory.length - 1]);
      setHistory(() => [...newHistory]);

    }
  }

  return { mode, transition, back };
}