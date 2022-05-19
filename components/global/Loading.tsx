import {Box, CircularProgress} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {useAppSelector} from "../../hooks/redux";
import {selectMainState} from "../../store/selector/main";


const useStyles = makeStyles({
    box: {
        position: 'fixed',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#fff',
        zIndex: 2000,
    }
});

const Loading = () => {
    const mainState = useAppSelector(selectMainState);
    const styles = useStyles();

    if(!mainState.isLoading) return null;
    return (
        <Box className={styles.box}>
            <CircularProgress color="primary" />
        </Box>
    )
}

export default Loading;