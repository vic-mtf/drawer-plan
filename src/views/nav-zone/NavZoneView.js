import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Box, Button, Divider, IconButton, List, ListItem, ListItemButton, ListItemText, Stack, useTheme } from "@mui/material";
import { nanoid } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import CustomBox from "../../components/CustomBox";
import Drawer from "../../components/Drawer";
import DrawerHeader from "../../components/DrawerHeader";
import { handleImage, toogleOpenDrawer } from "../../redux/navZone";
import getImage from "../../utils/getImage";
import ListOptions from "./options/ListOptions";
import Plans from "./pictures/Plans";

export default function NavZoneView () {
    const open = useSelector(store => store.navZone.openDrawer);
    const dispatch = useDispatch();
    const theme = useTheme();
    const handleMenuClick = () => dispatch(toogleOpenDrawer('OPEN'));
    const handleGetImage = async () => {
        const files = await getImage();
        const fixFile = [...files].map((file) => ({
            src: URL.createObjectURL(file),
            id: nanoid()
        }))
        dispatch(handleImage(fixFile));
    }
    return(
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <Button
                        size='small'
                        sx={{textTransform:'none', flexGrow:1, mr:1}}
                        startIcon={<AddPhotoAlternateIcon/>}
                        onClick={handleGetImage}
                    >
                        Ajouter des images
                    </Button>
                    <IconButton onClick={handleMenuClick}>
                        <ChevronLeftIcon/>
                    </IconButton>
                </DrawerHeader>
                <Stack
                    overflow='hidden'
                    display='flex' 
                    flex={1}
                    direction='row'
                    width='100%'
                    height='100%'
                    divider={<Divider orientation='vertical'/>}
                >
                    <CustomBox flex={1}>
                        <Plans/>
                    </CustomBox>
                    <CustomBox
                        sx={{
                            width: `calc(${theme.spacing(7)} + 1px)`,
                            [theme.breakpoints.up('sm')]: {
                            width: `calc(${theme.spacing(8)} + 1px)`,
                            },}}
                    >
                        <ListOptions/>
                    </CustomBox>
                </Stack>
            </Drawer>
    );
}