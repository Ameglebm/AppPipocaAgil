const initialState = {
  userId: null,
  userName: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER_ID":
      return {
        ...state,
        userId: action.payload,
      };
    case "SET_USER_NAME": // Nova action para armazenar o nome do usuário
      return {
        ...state,
        userName: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
