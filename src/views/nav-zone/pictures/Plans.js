import { useDispatch, useSelector } from "react-redux";
import { Box, ImageList, ImageListItem, Typography } from "@mui/material";
import Imagewrapper from "./ImageWrapper";

export default function Plans(){
    const {images, openDrawer} = useSelector(store => store.navZone);
    const dispatch = useDispatch();
    return(
        openDrawer &&
        <>{
        images.length === 0 ?
        <Typography 
            variant="body2"
            display='flex'
            flex={1}
            component='div'
            justifyContent='center'
            alignItems='center'
            align="center"
            color='text.secondary'
        >
            Aucune image
        </Typography> :
        <Box
            display='flex'
            overflow='auto'
            maxHeight='100%'
            m={1}
        >
            <Box>
                <ImageList cols={2} sx={{width:'100%', overflow:'auto', flex:1}} rowHeight={150}>
                    {images.map((image, index) => 
                        <Imagewrapper file={image} key={index}>
                            <ImageListItem >
                                <img src={image.src}/>
                            </ImageListItem>
                        </Imagewrapper>)}
                </ImageList>
            </Box>
        </Box>
        }</>
    );
}