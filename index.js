const redux = require("redux");
const reduxLogger = require("redux-logger");

const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;
const combineReducer = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;

const logger = reduxLogger.createLogger();

const CAKE_ORDER = "CAKE_ORDER";
const CAKE_RESTOCKED = "CAKE_RESTOCKED";
const ICECREAM_ORDER = "ICECREAM_ORDER";
const ICECREAM_RESTOCKED = "ICECREAM_RESTOCKED";

// actions

//action creater is a function which return a object
function orderCake() {
  //action is a object
  return {
    type: CAKE_ORDER,
    payload: 1,
  };
}

function restockCake(qty = 1) {
  return {
    type: CAKE_RESTOCKED,
    payload: qty,
  };
}

function orderIcecream(qty = 1) {
  return {
    type: ICECREAM_ORDER,
    payload: qty,
  };
}

function restockIcecream(qty = 1) {
  return {
    type: ICECREAM_RESTOCKED,
    payload: qty,
  };
}
//reducer

const initialCakeState = {
  numOfCakes: 10,
};
const intiialIcecreamState = {
  numOfIcecreams: 20,
};

//(previousState, action) => newState

const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case CAKE_ORDER:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1,
      };

    case CAKE_RESTOCKED:
      return {
        ...state,
        numOfCakes: state.numOfCakes + action.payload,
      };

    default:
      return state;
  }
};

const icecreamReducer = (state = intiialIcecreamState, action) => {
  switch (action.type) {
    case ICECREAM_ORDER:
      return {
        ...state,
        numOfIcecreams: state.numOfIcecreams - action.payload,
      };

    case ICECREAM_RESTOCKED:
      return {
        ...state,
        numOfIcecreams: state.numOfIcecreams + action.payload,
      };

    default:
      return state;
  }
};

//store
//combining reducers
const rootReducer = combineReducer({
  cake: cakeReducer,
  icecream: icecreamReducer,
});

const store = createStore(rootReducer,applyMiddleware(logger));
console.log("Initial State", store.getState());

const unsubscribe = store.subscribe(() =>
//this function calls whenever changes happens to the state
  {}
);

// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(restockCake(3));

const action = bindActionCreators(
  { orderCake, restockCake, orderIcecream, restockIcecream },
  store.dispatch
);

action.orderCake();
action.orderCake();
action.orderCake();
action.restockCake(3);

action.orderIcecream();
action.orderIcecream();
action.orderIcecream();
action.restockIcecream(3);

unsubscribe();
