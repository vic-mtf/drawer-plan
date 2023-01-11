import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import NightlightIcon from '@mui/icons-material/Nightlight';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import React, { useRef, useState } from 'react';
import { ListItem, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import { changeTheme } from '../../redux/app';

const options = [
    {
        Icon: Brightness4Icon,
        label: 'Défaut (os)',
        mode: 'system',
    },
    {
        Icon: WbSunnyIcon,
        label: 'Clair',
        mode: 'light',
    },
    {
        Icon: NightlightIcon,
        label: 'Sombre',
        mode: 'dark',

    }
]
export default function ThemeOptions () {
    const mode = useSelector(store => store.app.theme);
    const [open, setOpen] = useState(false);
    const anchorRef = useRef();
    const dispatch = useDispatch();

    const {Icon} = options.find(option => option.mode === mode); 
    const {label} = options.find(option => option.mode === mode); 
    return (
        <React.Fragment>
            <Button 
                color="inherit"
                sx={{
                    border: theme => `1px solid ${theme.palette.divider}`,
                    mx: 1,
                    textTransform: 'none'
                }}
                variant="outlined"
                //size="small"
                onClick={() => setOpen(true)}
                startIcon={
                    <Icon/>
                }
                size="large"
                ref={anchorRef}
            >
                {label}
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorRef.current}
                open={open}
                onClose={() => setOpen(false)}
            >
                {options.map(option => (
                    <MenuItem 
                        key={option.mode}
                        selected={mode === option.mode}
                        onClick={() => {
                            dispatch(changeTheme(option.mode));
                            setOpen(false);
                        }}
                    >
                        <ListItemIcon>
                            <option.Icon/>
                        </ListItemIcon>
                        <ListItemText
                            primary={option.label}
                        />
                    </MenuItem>
                ))}
            </Menu>
        </React.Fragment>
    )
}