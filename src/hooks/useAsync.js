import { useEffect, useReducer, useRef } from 'react';
import axios from 'axios';

const initialState = { status: 'idle', data: null, error: null };

function reducer(state, action) {
  switch (action.type) {
    case 'pending':
      return { status: 'pending', data: null, error: null };
    case 'success':
      return { status: 'success', data: action.data, error: null };
    case 'error':
      return { status: 'error', data: null, error: action.error };
    default:
      return state;
  }
}

export function useAsync(asyncFn, deps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const fnRef = useRef(asyncFn);
  fnRef.current = asyncFn;

  useEffect(() => {
    const controller = new AbortController();
    dispatch({ type: 'pending' });

    fnRef.current(controller.signal)
      .then((data) => {
        if (!controller.signal.aborted) {
          dispatch({ type: 'success', data });
        }
      })
      .catch((error) => {
        if (axios.isCancel(error) || controller.signal.aborted) return;
        dispatch({ type: 'error', error });
      });

    return () => controller.abort();
  }, deps);

  return {
    ...state,
    isLoading: state.status === 'pending' || state.status === 'idle',
    isSuccess: state.status === 'success',
    isError: state.status === 'error',
  };
}
