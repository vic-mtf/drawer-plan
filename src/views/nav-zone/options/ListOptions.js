import { Box, List, ListItem, ListItemButton, ListItemIcon, Zoom } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ImageToIcon from "../../../components/ImageToIcon";
import options from "./options";
import { changeColor, changeMode } from "../../../redux/drawZone";
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import NorthWestIcon from '@mui/icons-material/NorthWest';
import getColor from "../../../utils/getColor";
import { setInfosImage } from "../../../redux/navZone";

const ResetButton = () => {
    const imagesSelected = useSelector(store => store.navZone.imagesSelected);
    const mode = useSelector(store => store.drawZone.mode);
    const handleReset = ({id, name}) => () => {
        const resetEvent = new CustomEvent("reset_scaling", { detail: {name, id}});
        document.dispatchEvent(resetEvent);
    }
    const handleClick = () => {
        imagesSelected.forEach(image => {
            handleReset(image)();
        });
    }
    return (
        <Zoom in={mode === 'scaling'} style={{overflow: 'heidden'}}>
            <ListItem
                sx={{m: 0, p: 0, fontSize: 15}}
            >
                <ListItemButton 
                    onClick={handleClick} 
                >
                    <ListItemIcon>
                        <RestartAltIcon sx={{fontSize: 30, display: "inline-block"}}/>
                    </ListItemIcon>
                </ListItemButton>
            </ListItem> 
        </Zoom> 
    );
}

const OriginButton = () => {
    const imagesSelected = useSelector(store => store.navZone.imagesSelected);
    const mode = useSelector(store => store.drawZone.mode);
    const dispatch = useDispatch();
    const [image] = imagesSelected;
    const {id, data} = image || {};
    
    console.log(imagesSelected, id);
    return (
        <Zoom in={mode !== 'scaling'} style={{overflow: 'hidden'}}>
            <ListItem
                sx={{m: 0, p: 0, fontSize: 15}}
            >
                <ListItemButton 
                    onClick={() => dispatch(setInfosImage({id, data: {...data, scaleX: 1, scaleY: 1, x: 0, y: 0}}))}
                >
                    <ListItemIcon>
                        <NorthWestIcon sx={{fontSize: 30, display: "inline-block"}}/>
                    </ListItemIcon>
                </ListItemButton>
            </ListItem> 
        </Zoom> 
    );
}

const ColorButton = () => {
    const color = useSelector(store => store.drawZone.color);
    const dispatch = useDispatch();
    const handleClick = async () => {
        const value = await getColor();
        if(value) {
            dispatch(changeColor(value));
        }
    }
    return(
        <ListItem
            sx={{m: 0, p: 0, fontSize: 15, color}}
        >
            <ListItemButton 
                onClick={handleClick} 
                sx={{color}}
            >
                <ListItemIcon>
                    <FormatColorFillIcon sx={{fontSize: 30, color}}/>
                </ListItemIcon>
            </ListItemButton>
        </ListItem>
    );
}

const OptionsWrapper = () => {
    const mode = useSelector(store => store.drawZone.mode);
    const dispatch = useDispatch();
    return(
        options.map((item, index) => 
            <ListItem 
                key={index} 
                sx={{m: 0, p: 0, fontSize: 15}}
                onClick={() => dispatch(changeMode(item.mode))}
                title={item.title}
            >
                <ListItemButton
                    selected={item.mode === mode}
                >
                    <ListItemIcon>
                        <ImageToIcon src={item.icon} size={30}/>
                    </ListItemIcon>
                </ListItemButton>
            </ListItem>
        )
    );
}
export default function ListOptions () {
    return(
        <List disablePadding sx={{position: 'relative', width: '100%'}}>
            <OptionsWrapper/>
            <OriginButton/>
            <ResetButton/>
            <ColorButton/>
        </List>
    );
}