import { useState } from 'react';

export default function useStateObject(initialState) {
  const [state, setState] = useState(initialState);

  const setValue = (key, value) => {
    setState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const getValue = (key) => state[key];

  return {
    state,
    setValue,
    getValue,
  };
}
