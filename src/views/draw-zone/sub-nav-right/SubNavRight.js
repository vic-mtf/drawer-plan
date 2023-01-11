import {Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Slider, Stack, Typography} from '@mui/material';
import OpacityIcon from '@mui/icons-material/Opacity';
import { useDispatch, useSelector } from 'react-redux';
import ScaleOptions from '../../header/ScaleOptions';
import { setInfosImage } from '../../../redux/navZone';
import { useEffect, useState } from 'react';
import NorthWestIcon from '@mui/icons-material/NorthWest';

const ImageDetail = ({image}) => {
    const [value, setValue] = useState(1);
    const dispatch = useDispatch();

    const handleChange = event => {
        const {value} = event.target;
        setValue(value);
    }

    useEffect(() => {
        dispatch(setInfosImage({
            id: image.id,
            data: {...image.data, opacity: value}
        }));
    },[value]);

    return (
        <List
            sx={{ bgcolor: 'background.paper',
                marginTop: 'auto',
                marginBottom: 'auto',
                marginLeft: 1,
                marginRight: 1
        }}
        >
            <ListItem>
                <Box>
                    <ScaleOptions data={image.data} id={image.id}/>
                </Box>
            </ListItem>
            <ListItem>
                <ListItemIcon>
                    <OpacityIcon />
                </ListItemIcon>
                <Box
                    flexGrow={1}
                >
                    <Slider 
                        value={value} 
                        step={.01}
                        size="medium" 
                        max={1} 
                        min={.3} 
                        sx={{width: '100%'}}
                        onChange={handleChange}
                    /> 
                </Box>
            </ListItem>
            <ListItem
                
            >
                <ListItemButton
                    onClick={null}
                >
                    <ListItemIcon>
                        <NorthWestIcon/>
                    </ListItemIcon>
                    <ListItemText secondary="Remisa à l'origine"/>
                </ListItemButton>
            </ListItem>
        </List>
    )
}

export default function SubNavRight () {
    const images = useSelector(store => store.navZone.imagesSelected);

    return (
        <Stack
            display="flex"
            sx={{
                background: theme => theme.palette.primary.main,
                width: 300,
                height: '100%',
                borderLeft: theme => `1px solid ${theme.palette.divider}`,
            }}

        >
            {
                images.map((image, index) => (
                    <ImageDetail 
                        key={index}
                        image={image}
                    />
                    )
                )
            }
            {
                images.length === 0 && 
                <Stack
                    display="flex"
                    flex={1}
                    height="100%"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Typography variant="body2" color="white">
                        Aucun plan sélectionné !
                    </Typography> 
                </Stack>
            }
        </Stack>
    )
    
}