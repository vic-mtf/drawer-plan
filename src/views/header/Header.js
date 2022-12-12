import { Divider, IconButton, Toolbar, Typography } from "@mui/material";
import AppBar from "../../components/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import { toogleOpenDrawer } from "../../redux/navZone";
import ZoomOptions from "./ZoomOptions";
import DownloadButton from "./DownloadButton";
import ThemeOptions from "./ThemeOptions";

export default function Header() {
  const {openDrawer: open, drawerWidth} = useSelector(store => store.navZone);
  const dispatch = useDispatch();
  const handleMenuClick = () => dispatch(toogleOpenDrawer('CLOSE'));
    return(
        <AppBar color='default' sx={{
            bgcolor: "background.paper",
            ...(open && {
                marginLeft: drawerWidth,
                width: `calc(100% - ${drawerWidth}px)`,
                transition: (theme) => theme.transitions.create(['width', 'margin'], {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.enteringScreen,
                }),
              }),
            }}
            position='fixed'>
            <Toolbar>
                <IconButton
                    onClick={handleMenuClick}
                    color='inherit'
                    edge='start'
                    sx={{
                        mr: 5,
                        ...(open && {display:"none"})
                    }}
                >
                    <MenuIcon/>
                </IconButton>
                <Typography variant="h6" noWrap component='div' color='primary.main' flexGrow={1}>
                    Indoors wall creation
                </Typography>
                <ThemeOptions/>
                <ZoomOptions/>
                <DownloadButton/>
            </Toolbar>
        </AppBar>
    )
}