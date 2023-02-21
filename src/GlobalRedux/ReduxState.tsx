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

const initialState = {
  data: [] as Array<iData>,
  totalqty: 0,
};

const ReduxState = createSlice({
  name: "second",
  initialState,
  reducers: {
    addData: (state, { payload }: PayloadAction<iData>) => {
      state.data.push({ ...payload });
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
      state.data.filter((el) => el.color !== payload);
    },
  },
});

export const { addData, removeData } = ReduxState.actions;

export default ReduxState.reducer;
