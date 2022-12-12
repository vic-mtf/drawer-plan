import { ListItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addImage, removeImage, selectImage } from "../../../redux/navZone";

export default function Imagewrapper({children, file}){
    // const imageSelected = useSelector(store => store.navZone.imageSelected);
    const imagesSelected = useSelector(store => store.navZone.imagesSelected);
    const dispatch = useDispatch();
    const selected = !!imagesSelected.find(({id}) => id === file.id);
    return(
        <ListItem
            button
            sx={{
                position: 'relative',
                width:'100%',
                height: '100%'
            }}
            onClick={() => {
                dispatch(selected ? removeImage(file.id) : addImage({...file, data: {
                    scaleX: 1,
                    scaleY: 1
                }}));
                if(!selected) {
                    dispatch(selectImage(file.id));
                }
            }}
            selected={selected}
        >
            {children}
        </ListItem>
    );
}