import { configureStore } from "@reduxjs/toolkit";
import accountSlice from "./slices/accountSlice.ts";
import projectSlice from "./slices/projectSlice.ts";
import taskSlice from "./slices/taskSlice.ts";

const store= configureStore({
    reducer: {
        account: accountSlice,
        project: projectSlice,
        task: taskSlice,
    }
});

export default store;