import { styled } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import {store} from '../redux'
import closedMixin from '../utils/closedMixin';
import openedMixin from '../utils/openedMixin';

const {drawerWidth} = store.getState().navZone;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
      }),
      ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
      }),
    }),
  );

export default Drawer;