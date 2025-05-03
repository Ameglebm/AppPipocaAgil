// actions/filtersActions.js

export const SET_SELECTED_FILTERS = "SET_SELECTED_FILTERS";
export const CLEAR_FILTERS = "CLEAR_FILTERS";

// Define os filtros selecionados
export const setFilter = (filter, time) => ({
  type: SET_SELECTED_FILTERS,
  payload: {
    selectedHealthParams: filter,
    selectedTimeParams: time,
  }
});

// Reseta os filtros
export const clearFilters = () => ({
  type: CLEAR_FILTERS,
});
