import { styled } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import {store} from '../redux'

const {drawerWidth} = store.getState().navZone;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),

}));

export default AppBar;