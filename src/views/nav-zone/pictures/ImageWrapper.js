import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import { Divider, ListItem, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addImage, deleteImage, removeImage, selectImage } from "../../../redux/navZone";
import ImageInfos from "./ImageInfos";

export default function Imagewrapper({children, file}){
    const image = useSelector(store => 
            store?.navZone?.images?.find(({id}) => id === file.id)
    );
    const [openMenu, setOpenMenu] = useState(false);
    const selected = useSelector(store => 
        !!store?.navZone?.imagesSelected?.find(({id}) => id === file.id)
    );
    const [openDetails, setOpenDetails] = useState(false);
    const dispatch = useDispatch();
    const anchorEl = useRef();

    return(
        <>
            <ListItem
                button
                ref={anchorEl}
                sx={{
                    position: 'relative',
                    width:'100%',
                    height: '100%'
                }}
                onContextMenu={event => {
                    event.preventDefault();
                    setOpenMenu(true);
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
            <Menu anchorEl={anchorEl.current} keepMounted open={openMenu} onClose={() => setOpenMenu(false)}>
                <MenuItem 
                    onClick={() => {
                        setOpenMenu(false);
                        setOpenDetails(true);
                    }}
                >
                    <ListItemIcon>
                        <InfoIcon/>
                    </ListItemIcon>
                    <ListItemText
                        secondary="Information"
                    />
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        dispatch(deleteImage(file.id));
                        dispatch(removeImage(file.id));
                        setOpenMenu(false);
                    }}
                > 
                    <ListItemIcon>
                        <DeleteIcon/>
                    </ListItemIcon>
                    <ListItemText
                        secondary="Supprimer"
                    />
                </MenuItem>
            </Menu>
            <ImageInfos
                open={openDetails}
                handelOpen={() => 
                    setOpenDetails(value => !value)
                }
                imageSrc={image.src}
            />
        </>
    );
}