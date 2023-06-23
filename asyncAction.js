const redux = require("redux");
const thunkMiddleware = require("redux-thunk").default;
const axios = require("axios");

const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;

//state
const initialState = {
  loading: false,
  users: [],
  error: "",
};

//action creator
const FETCH_USER_REQUESTED = "FETCH_USER_REQUESTED";
const FETCH_USER_SUCCEEDED = "FETCH_USER_SUCCEEDED";
const FETCH_USER_FAILED = "FETCH_USER_FAILED";

const fetchUserRequest = () => {
  return {
    type: FETCH_USER_REQUESTED,
  };
};

const fetchUserSucces = (users) => {
  return {
    type: FETCH_USER_SUCCEEDED,
    payload: users,
  };
};

const fetchUserFailure = (error) => {
  return {
    type: FETCH_USER_FAILED,
    payload: error,
  };
};


//passing fuction as a return state which has a side effect of performing async task
const fetchUser = () => {
  return function (dispatch) {
    dispatch(fetchUserRequest());
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        //response.data is the data
        const user = response.data.map((user) => user.id);
        dispatch(fetchUserSucces(user));
      })
      .catch((error) => {
        //error.message is the error
        dispatch(fetchUserFailure(error.message));
      });
  };
};


//reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_REQUESTED:
      return {
        ...state,
        loading: true,
      };

    case FETCH_USER_SUCCEEDED:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };

    case FETCH_USER_FAILED:
      return {
        ...state,
        loading: false,
        user: [],
        error: action.payload,
      };

    default:
      return state;
  }
};


//store
const store = createStore(reducer, applyMiddleware(thunkMiddleware));

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(fetchUser());
