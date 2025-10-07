import { configureStore } from "@reduxjs/toolkit";
import accountSlice from "./slices/accountSlice.ts";
import projectSlice from "./slices/projectSlice.ts";

const store= configureStore({
    reducer: {
        account: accountSlice,
        project: projectSlice
    }
});

export default store;