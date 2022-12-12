import { FormControl, IconButton, InputAdornment, OutlinedInput, Tooltip } from "@mui/material";
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import ZoomInMapIcon from '@mui/icons-material/ZoomInMap';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import { useDispatch, useSelector } from "react-redux";
import { setZoom } from "../../redux/drawZone";

export default function ZoomOptions () {
    const zoom = useSelector(store => store.drawZone.zoom);
    const dispatch = useDispatch();
    return(
        <>
            <Tooltip title="zoom" arrow>
                <FormControl sx={{m: 1, width:175}} variant="outlined">
                    <OutlinedInput
                        readOnly
                        size="small"
                        id="zoom-mode"
                        type='text'
                        value={zoom*100+'%'}
                        sx={{
                          textAlign: "center"  
                        }}
                        startAdornment={
                            <InputAdornment position="start">
                                <IconButton onClick={() => dispatch(setZoom("ZOOM_OUT"))}>
                                    <ZoomOutIcon/>
                                </IconButton>
                            </InputAdornment>
                        }
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton onClick={() => dispatch(setZoom("ZOOM_IN"))}>
                                    <ZoomInIcon/>
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
            </Tooltip>
        </>
    );
}