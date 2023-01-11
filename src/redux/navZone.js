import { createSlice } from "@reduxjs/toolkit";

const navZone = createSlice({
    name: "navZone",
    initialState: {
        openDrawer: true,
        images: [],
        drawerWidth : 350,
        imageSelected: null,
        imagesSelected: [],
        imageScaled: []
    },
    reducers: {
        toogleOpenDrawer (state, actions) {
            if(actions.type === "OPEN") state.openDrawer = true;
            else if(actions.type === "CLOSE") state.openDrawer = false;
            else state.openDrawer = !state.openDrawer;
            state.imageSelected = state.imageSelected;            
        },
        handleImage (state, actions) {
            state.images = [...state.images, ...actions.payload];
        },
        addImage (state, actions) {
            if(state.imagesSelected.length === 0) {
                state.imagesSelected = [actions.payload];
            }
            else {
                const copyImagesSelected = [...state.imagesSelected];
                if(copyImagesSelected.length === 1) {
                    copyImagesSelected.push(actions.payload);
                }
                else {
                    copyImagesSelected[1] = actions.payload;
                }
                state.imagesSelected = copyImagesSelected;
            }
        },
        removeImage (state, actions) {
            const id = actions.payload;
            const index = state.images.findIndex(image => image.id === id);
            const copyImages = [...state.images];
            copyImages[index] = {...copyImages[index], ...state.imagesSelected[index]};
            state.images = copyImages;
            state.imagesSelected = state.imagesSelected.filter(image => image.id !== id);
            state.imageScaled = state.imageScaled.filter(image => image.id !== id);
        },
        deleteImage (state, actions) {
            state.images = state.images.filter(image => image.id !== actions.payload);
        },
        selectImage (state, actions) {
            const id = actions.payload;
            state.imageSelected = state.imagesSelected.find(image => image.id === id) || null;
        },
        setInfosImage (state, actions) {
            const {id, data} = actions.payload;
            const copyImagesScaled = [...state.imageScaled];
            const index = copyImagesScaled.findIndex(image => image.id === id);
            if(~index) {
                copyImagesScaled[index] = {id, ...data};
            } else {
                copyImagesScaled.push({id, ...data});
            }
            state.imageScaled = copyImagesScaled;
        },
        updateDataImage (state, actions) {
            const {id} = actions.payload;
            state.imagesSelected = state.imagesSelected.map((image) => (
                image.id === id ? {...image, ...actions.payload} : image
            ));
        }
    }
});

export const {
    deleteImage, 
    toogleOpenDrawer, 
    handleImage, 
    addImage, 
    removeImage, 
    selectImage, 
    setInfosImage, 
    updateDataImage
} = navZone.actions;
export default navZone.reducer;