import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  coin: [],
};

export const getData = createAsyncThunk("getData/crypto", async () => {
  const response = await axios.get("http://172.16.2.39:3001/posts");
  return response.data;
});

export const getCoin = createAsyncThunk("getCoin/crypto", async () => {
  const response = await axios.get("http://172.16.2.39:3001/posts/coin");
  return response.data;
});

export const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {
    // increment: (state) => {
    //   state.value += 1;
    // },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload;
    // },
  },

  extraReducers: (builder) => {
    builder.addCase(getData.fulfilled, (state, action) => {
      state.data = action.payload.data;
    });
    builder.addCase(getCoin.fulfilled, (state, action) => {
      state.coin = action.payload.data;
    });
  },
});

// export const { increment, decrement, incrementByAmount } = cryptoSlice.actions;

export const data = (state) => state.crypto.data;
export const coin = (state) => state.crypto.coin;

export default cryptoSlice.reducer;
