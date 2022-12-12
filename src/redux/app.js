import { createSlice } from "@reduxjs/toolkit";

const app = createSlice({
    name: "app",
    initialState: {
        theme: "system"
    },
    reducers: {
        changeTheme (state, actions) {
            console.log(actions.payload);
            state.theme = actions.payload;
        }
    }
});

export const {changeTheme} =  app.actions;
export default  app.reducer;