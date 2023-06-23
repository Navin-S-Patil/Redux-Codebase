const redux = require("redux");
const produce = require("immer").produce;

const initialState = {
  name: "Navin",
  address: {
    landmark: "ankur cinema",
    street: "govandi Station Road",
    pincode: "400088",
    state: "Maharashtra",
  },
};

const UPDATE_LANDMARK = "UPDATE_LANDMARK";
//action-creator
function updateLandmark(landmark) {
  return {
    type: UPDATE_LANDMARK,
    payload: landmark,
  };
}

//reducer
function reducer(state = initialState, action) {
  switch (action.type) {
    // case UPDATE_LANDMARK:
    //   return {
    //     ...state,
    //     address: {
    //       ...state.address,
    //       landmark: action.payload,
    //     },
    //   };
    
    case UPDATE_LANDMARK:
      return produce(state, (draft) => {
        draft.address.landmark = action.payload;
      });

    default:
      return state;
  }
}

const store = redux.createStore(reducer);

// const store = createStore(reducer);

console.log("Initial State", store.getState());

const unsubscribe = store.subscribe(() => {
  console.log("Updated State", store.getState());
});

store.dispatch(updateLandmark("Shivsena Offce"));

unsubscribe();
