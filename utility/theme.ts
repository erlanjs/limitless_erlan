import {createTheme, ThemeOptions} from '@mui/material/styles';
import {media} from "./media";


export const theme: ThemeOptions = createTheme({
    typography: {
        "fontFamily": `'Raleway', sans-serif`,
        // @ts-ignore
        "fontSize": media(14, 16),
    },
    palette: {
        primary: {
            main: '#212121',
        },
        secondary: {
            main: '#FFFFFF',
        },
        tertiary: {
            main: '#515151',
        },
        quaternary: {
            main: '#CACACA'
        },
        senary: {
            main: '#0D82F9'
        },
        septenary: {
            main: '#9ab1c0'
        },
        octonary: {
            main: '#2C3439'
        },
        nonary: {
            main: '#CACACA'
        },
        denary: {
            main: '#ff3c00'
        }
    },
});
