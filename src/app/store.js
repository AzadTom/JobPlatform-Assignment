import { configureStore } from "@reduxjs/toolkit";
import jobsSlice from "../features/jobs/jobsSlice";

export const store = configureStore({
    reducer:{
        jobs:jobsSlice
    }
})
