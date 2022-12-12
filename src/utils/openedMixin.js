import { store } from "../redux";

const openedMixin = (theme) => ({
    width: store.getState().navZone.drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

export default openedMixin;