import {FC} from "react";
import {makeStyles} from "@mui/styles";
import {Box, CircularProgress} from "@mui/material";


interface Props{
    bg?: string;
    fontSize: string;
    active?: boolean;
}

const useStyles = makeStyles({
    wrapper: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',

        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    }
});

const Loading:FC<Props> = (props:Props) => {
    const styles = useStyles();
    return (
        <Box className={styles.wrapper} sx={{background: props.bg, display: props.active ? 'flex': 'none'}}>
            <CircularProgress sx={{fontSize: props.fontSize}} />
        </Box>
    )
}


export default Loading;