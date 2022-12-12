import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { useLayoutEffect } from "react";
// import { useSelector } from "react-redux";
import useCustomTheme from "./utils/useCustomTheme";
import Header from "./views/header/Header";
import NavZoneView from "./views/nav-zone/NavZoneView";
import DrawZoneView from "./views/draw-zone/DrawZoneView";


function App() {
  // const open = useSelector(store => store.navZone.openDrawer);
  const theme = useCustomTheme();
  useLayoutEffect(() => {
    document.body.style.background = theme.palette.background.default;
    document.body.style.color = theme.palette.text.primary;
  });
  return (
    <ThemeProvider theme={theme}>
      <Box
        height='100vh'
        display='flex'
      >
        <CssBaseline/>
        <Header/>
        <NavZoneView/>
        <DrawZoneView/>
      </Box>
    </ThemeProvider>
  );
}

export default App;