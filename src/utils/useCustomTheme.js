import { createTheme } from "@mui/material"; 
import { useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function useCustomTheme() { 
    const themeMode = useSelector(store => store.app.theme);
    const darkThemeMediaquery = window.matchMedia(`(prefers-color-scheme: dark)`); 
    const [theme, setTheme] = useState(darkThemeMediaquery.matches ? 'dark': 'light'); 
  
    useLayoutEffect(()=> { 
        const handleChange = event => setTheme(event.target.matches ? 'dark': 'light'); 
        darkThemeMediaquery.addEventListener('change', handleChange); 
        return () => darkThemeMediaquery.removeEventListener('change', handleChange); 
    },[theme]); 
  
    const mode = (themeMode ? (themeMode === 'system' ? theme: themeMode) : theme); 
     
    return createTheme({ 
         palette: { 
             mode, 
             primary: { 
                 main: "#0e8fbc"
             }, 
             background: { 
                 default: mode === 'dark' ? '#1a202c' : '#eeeeee', 
                 paper: mode === 'dark' ? '#0c1b39' : '#ffffff', 
             } 
         } 
 }) 
      
      
 }