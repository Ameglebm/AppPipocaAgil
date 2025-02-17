export const pushInsulin = (insulin) => ({
  type: "PUSH_INSULIN",
  payload: insulin,
});

export const updateInsulinField = (id, updatedData) => {
  console.log(
    "Disparando UPDATE_INSULIN_FIELD com ID:",
    Number(id),
    "Dados:",
    updatedData
  );
  return {
    type: "UPDATE_INSULIN_FIELD",
    payload: { id: Number(id), ...updatedData },
  };
};

export const removeInsulin = (id) => ({
  type: "REMOVE_INSULIN",
  payload: id,
});

export const resetInsulin = () => ({
  type: "RESET_INSULIN",
});
