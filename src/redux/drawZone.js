import { createSlice } from "@reduxjs/toolkit";

const drawZone = createSlice({
    name: "drawZone",
    initialState: {
        zoom: 1,
        mode: "default",
        color: "#000000"
    },
    reducers: {
        setZoom (state, actions) {
            if(actions.payload === "ZOOM_IN"){
                // state.zoom = state.zoom <= configZoom.maxScale-1 ? state.zoom + 1: configZoom.maxScale;
            }
            else if(actions.payload === "ZOOM_OUT"){
                // state.zoom = state.zoom >= configZoom.minScale+1 ? state.zoom - 1: configZoom.minScale;
            }
            else {
                state.zoom = actions.payload;
            }
        },
        changeMode (state, actions) {
            state.mode = actions.payload;
        },
        changeColor (state, actions) {
            state.color = actions.payload;
        }
    }
});

export const {setZoom, changeMode, changeColor} = drawZone.actions;
export default drawZone.reducer;