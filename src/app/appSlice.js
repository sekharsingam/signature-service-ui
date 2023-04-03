const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  documentInfo: null,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setDocumentInfo: (state, action) => ({
      ...state,
      documentInfo: action.payload,
    }),
  },
});

export const { setDocumentInfo } = appSlice.actions;

export default appSlice.reducer;
