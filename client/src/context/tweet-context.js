import React, { useReducer, createContext } from "react";

export const TweetContext = createContext();

const initialState = {
  tweets: [],
  tweet: {},
  author: {},
  message: {}, // {type: 'success|fail', title:info|error' content:'error'}
};

function reducer(state, action) {
  //console.log(action.type);
  switch (action.type) {
    case "FETCH_TWEETS": {
      return {
        ...state,
        tweets: action.payload,
        tweet: {},
        message: {},
      };
    }
    case "FETCH_TWEET": {
      return {
        ...state,
        tweet: action.payload,
        message: {},
      };
    }
    case "CREATE_TWEET": {
      return {
        ...state,
        tweets: [...state.tweets, action.payload],
        message: {
          type: "success",
          title: "Success",
          content: "New Tweet created",
        },
      };
    }
    case "ADD_COMMENT": {
      return {
        ...state,
        message: action.payoad,
      };
    }

    case "LIKE_TWEET": {
      const tweet = action.payload;
      return {
        ...state,
        tweets: state.tweets.map((item) =>
          item._id === tweet._id ? tweet : item
        ),
        message: {
          type: "succes",
          title: "Like succesfull",
          content: "Tweet is liked by you",
        },
      };
    }

    case "DISLIKE_TWEET": {
      const tweet = action.payload;
      return {
        ...state,
        tweets: state.tweets.map((item) =>
          item._id === tweet._id ? tweet : item
        ),
        message: {
          type: "succes",
          title: "Like succesfull",
          content: "Tweet is liked by you",
        },
      };
    }

    case "FETCH_AUTHOR": {
      return {
        ...state,
        author: action.payload,
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

export const TweetContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { children } = props;

  return (
    <TweetContext.Provider value={[state, dispatch]}>
      {children}
    </TweetContext.Provider>
  );
};
