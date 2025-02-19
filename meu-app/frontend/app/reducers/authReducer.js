const initialState = {
  userId: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER_ID":
      return {
        ...state,
        userId: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
