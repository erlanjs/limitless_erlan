import {FC} from "react";
import {Box, IconButton, Modal, Theme} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {selectMainState} from "../store/selector/main";
import {setShareModalActive} from "../store/reducers/main";
import {makeStyles} from "@mui/styles";
import {media} from "../utility/media";
import {shareSocials} from "../constants/main";
import CloseIcon from '@mui/icons-material/Close';



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

        display: 'grid',
        gridTemplateColumns: 'auto auto auto auto',
        gridColumnGap: media(10, 15),
        gridRowGap: media(10, 15),
        padding: `${media(45, 60)} ${media(10, 18)}`,
        outline: 'none',
        border: 'none',
    },
    shareIconBox: {
        width: media(45, 55),
        height: media(45, 55),
        borderRadius: '50%',

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: theme.palette.primary.main,
    },
    shareIconBtn: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        fontSize: media(22, 24),
        color: theme.palette.secondary.main
    },
    closeBtn: {
        position: 'absolute',
        right: 10,
        top: 10,
    },
    closeIcon: {
        fontSize: media(20, 22),
        color: theme.palette.secondary.main,
    }
}));


const ShareModal:FC = () => {
    const styles = useStyles();
    const mainState = useAppSelector(selectMainState);
    const dispatch = useAppDispatch();

    const handleClose = () => {
        dispatch(setShareModalActive(false));
    }

    return (
        <Modal open={mainState.shareModalActive} onClose={handleClose}>
            <Box className={styles.modal}>
                <IconButton className={styles.closeBtn} onClick={handleClose}>
                    <CloseIcon className={styles.closeIcon} />
                </IconButton>
                {shareSocials.map((elem, i) => (
                    <Box key={i} className={styles.shareIconBox}>
                        <elem.shareBtn className={styles.shareIconBtn} url={mainState.shareModalUrl}>
                            <elem.icon className={styles.icon} />
                        </elem.shareBtn>
                    </Box>
                ))}
            </Box>
        </Modal>
    )
}


export default ShareModal;