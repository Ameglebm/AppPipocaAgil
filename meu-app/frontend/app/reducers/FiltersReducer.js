const initialState = {
    selectedHealthParams: [],
    selectedTimePeriod: false,
};

const filtersReducer= (state = initialState, action) => {
    switch (action.type) {
        case "SET_SELECTED_FILTERS":
            return {
                ...state,
                selectedHealthParams: action.payload.selectedHealthParams,
                selectedTimeParams: action.payload.selectedTimeParams,
            };
            default:
                return state;
    }
}

export default filtersReducer;