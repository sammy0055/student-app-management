import { useContext, createContext, useReducer } from "react";

const initialState = {
  token: "",
  courses: [],
  user: [],
  paneltabState:"1"
};

const reducer = (state, action) => {
  switch (action.type) {
    case "AddToken":
      return { ...state, token: action.value };
    case "AddCourse":
      return { ...state, courses: action.value };
    case "AddUser":
      return { ...state, user: action.value };
      case "paneltabState":
        return { ...state, paneltabState: action.value };

    default:
      return initialState;
  }
};

const Colorful = createContext();
export const useContexts = () => {
  return useContext(Colorful);
};

function Context({ children }) {
  return (
    <>
      <Colorful.Provider value={useReducer(reducer, initialState)}>
        {children}
      </Colorful.Provider>
    </>
  );
}

export default Context;
