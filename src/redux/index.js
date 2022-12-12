import { configureStore } from "@reduxjs/toolkit";
import navZone from "./navZone";
import drawZone from "./drawZone";
import app from "./app";

export const store = configureStore({
    reducer: {navZone, drawZone, app},
});