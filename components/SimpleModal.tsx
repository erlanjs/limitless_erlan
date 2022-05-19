import {FC} from "react";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {selectMainState} from "../store/selector/main";
import {setSimpleModalActive} from "../store/reducers/main";
import {Box, IconButton, Modal, Theme, Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {media} from "../utility/media";
import CloseIcon from "@mui/icons-material/Close";


const useStyles = makeStyles((theme:Theme) => ({
    modal: {
        maxWidth: media(320, 360),
        width: '100%',
        zIndex: 300,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: "#878787",
        borderRadius: '15px',
        padding: `${media(30, 40)} ${media(20, 26)}`,

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        outline: 'none',
        border: 'none',
    },
    closeBtn: {
        position: 'absolute',
        right: 5,
        top: 5,
    },
    closeIcon: {
        fontSize: media(20, 22),
        color: theme.palette.secondary.main,
    }
}));


const SimpleModal:FC = () => {
    const styles = useStyles();
    const mainState = useAppSelector(selectMainState);
    const dispatch = useAppDispatch();

    const handleClose = () => {
        dispatch(setSimpleModalActive(false));
    }
    return (
        <Modal open={mainState.simpleModalActive} onClose={handleClose}>
            <Box className={styles.modal}>
                <IconButton className={styles.closeBtn} onClick={handleClose}>
                    <CloseIcon className={styles.closeIcon} />
                </IconButton>
                <Typography textAlign="left" fontSize={media(13, 15)} fontWeight="400" color="secondary">
                    {mainState.simpleModalMessage}
                </Typography>
            </Box>
        </Modal>
    )
}


export default SimpleModal;