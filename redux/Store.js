import { configureStore } from "@reduxjs/toolkit";
import TodoSlice from "./Slices/todoSlice";

const store = configureStore({
    reducer:{
        todo : TodoSlice.reducer
    }
});

export default store