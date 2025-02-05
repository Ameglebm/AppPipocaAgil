export const pushInsulin = (insulin) => ({
  type: "PUSH_INSULIN",
  payload: insulin,
});

export const updateInsulinField = (id, value) => ({
  type: "UPDATE_INSULIN_FIELD",
  payload: { id, value },
});

export const removeInsulin = (id) => ({
  type: "REMOVE_INSULIN",
  payload: id,
});

export const resetInsulin = () => ({
  type: "RESET_INSULIN",
});
