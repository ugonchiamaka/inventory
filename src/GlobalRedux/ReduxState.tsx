import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";
import { stat } from "fs/promises";

interface iData {
  id: number;
  machine_types: string[];
  machine_attributes: string[];
  color: string;
  weight_value: string;
  power_value: number;
  manufacturing_date: string;
}

interface iDatas {
  myData: iData[];
}

const initialState: iDatas = {
  myData: [],
};

const ReduxState = createSlice({
  name: "second",
  initialState,
  reducers: {
    addData: (state, { payload }: PayloadAction<iData>) => {
      state.myData.push({ ...payload });
      //   let id = 0;
      //   id += 1;
      //   const check = state.data.findIndex((el) => el.id === payload.id);
      //   if (check >= 0) {
      //     state.data.push({ ...payload });
      //   } else {
      //     state.data.push({
      //       ...payload,
      //     });
      //   }
    },

    removeData: (state, { payload }) => {
      console.log("pay", { payload });
      state.myData = state.myData.filter((item) => item.id !== payload.id);
    },
  },
});

export const { addData, removeData } = ReduxState.actions;

export default ReduxState.reducer;
