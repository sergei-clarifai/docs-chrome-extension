import React, { Dispatch, createContext, useContext, useReducer } from "react";

const defaultState = {
  key1: "INITIAL VALUE 1",
  github: {
    token: "",
    username: ""
  }
};

const initialState = localStorage.config ? {
  ...defaultState,
  ...(JSON.parse(localStorage.config)),
} : defaultState;

const MyContextDispatch = createContext(() => null);
const MyContextState = createContext(initialState);

const myHandlerMap = {
  UpadateKey: (state, action) => ({
    ...state,
    key1: action.payload
  }),
  UpadateGithub: (state, action) => ({
    ...state,
    github: {
      ...state.github,
      ...action.payload
    }
  })
};

const reducer = (state, action) => {
  const handler = myHandlerMap[action.type];

  const newState = handler ? handler(state, action) : state;
  localStorage.setItem('config', JSON.stringify(newState));
  return newState; 
};

export const LocalStorageContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <MyContextState.Provider value={state}>
      <MyContextDispatch.Provider value={dispatch}>
        {children}
      </MyContextDispatch.Provider>
    </MyContextState.Provider>
  );
};

export function useMyContextState() {
  return useContext(MyContextState);
}

export function useMyContextActions() {
  const dispatch = useContext(MyContextDispatch);

  const updateKey = (value) => {
    dispatch({
      type: 'UpadateKey',
      payload: value
    });
  };

  const UpadateGithub = (obj) =>
    dispatch({
      type: 'UpadateGithub',
      payload: obj
    });

  return { updateKey, UpadateGithub };
}

export function wrapContext(comp) {
  return (<LocalStorageContext>{comp}</LocalStorageContext>);
}