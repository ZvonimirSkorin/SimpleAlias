import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  timovi: [],
  value: 0,
  timBodovi: [],
  words: ["Initial"],
  details: { duration: 10, count: 50 },
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },

    dodajPoene: (state, action) => {
      state.timBodovi[action.payload.index] += action.payload.bodovi;
    },
    dodajTimove: (state, action) => {
      state.timovi = action.payload;
      let temporary = new Array(action.payload.length).fill(0);
      state.timBodovi = temporary;
    },
    set_words: (state, action) => {
      state.words = action.payload;
    },
    set_details: (state, action) => {
      state.details = { duration: Number(action.payload.duration), count: Number(action.payload.count) };
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount, dodajPoene, dodajTimove, set_words, set_details } = counterSlice.actions;

export default counterSlice.reducer;
