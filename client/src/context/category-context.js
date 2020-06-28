import React, { useReducer, createContext } from "react";

export const CategoryContext = createContext();

const initialState = {
  categories: [],
  category:{},
  message: {}, // {type: 'success|fail', title:info|error' content:'error'}
};

function reducer(state, action) {
  //console.log(action.type);
  switch (action.type) {
    case "FETCH_CATEGORIES": {
      return {
        ...state,
        categories: action.payload,
      };
    }
     case "SET_CATEGORY": {
      return {
        ...state,
         category: [action.payload],
      };
    }
    case "FLASH_MESSAGE": {
      return {
        ...state,
        message: action.payoad,
      };
    }

    default:
      throw new Error();
  }
}

export const CategoryContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { children } = props;

  return (
    <CategoryContext.Provider value={[state, dispatch]}>
      {children}
    </CategoryContext.Provider>
  );
};
