import {makeStyles} from "@mui/styles";
import {requiredFontFamilies} from "../../constants/fonts";


const useStyles = makeStyles({
    '@global': {
        'html, body': {
            fontFamily: requiredFontFamilies['RALEWAY'].fontFamily,
            boxSizing: 'border-box',
        },
        'a': {
            cursor: 'pointer',
        }
    }
});


const GlobalStyles = ():null => {
    useStyles();
    return null
}

export default GlobalStyles;