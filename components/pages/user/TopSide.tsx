import {FC} from "react";
import {useUserContext} from "../../../pages/user/[uniqueId]";
import {Box, Switch, Theme, Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {media} from "../../../utility/media";
import Avatar from "../../User/Avatar";
import {defaultAvatar, defaultBgImage} from "../../../constants/main";
import UserTitles from "./UserTitles";
import {styled} from "@mui/material/styles";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {selectIsDarkMode} from "../../../store/selector/main";
import {setIsDarkMode} from "../../../store/reducers/main";
import {setLoginModalActive, setUniqueIdForLogin} from "../../../store/reducers/auth";
import {selectAuth} from "../../../store/selector/auth";
import clsx from "clsx";


const useStyles = makeStyles((theme:Theme) => ({
    topSideBox: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    bgBox: {
        width: '100%',
        padding: `${media(80, 110)}  ${media(18, 24)}`,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
    },
    loginTitle: {
        cursor: 'pointer',
        position: 'absolute',
        right: 15,
        top: 10,
        fontWeight: "600",
        fontSize: media(16, 18),
        color: theme.palette.secondary.main,
        userSelect: 'none',
        '&.dark': {
            color: theme.palette.secondary.main,
        }
    },
    box: {
        width: media(135, 163),
        height: media(135, 163),
        borderRadius: '50%',
        overflow: 'hidden',
        opacity: 0
    },
}));

const ModeSwitch = styled(Switch)(({ theme }) => ({
    padding: 8,
    position: 'absolute',
    right: 10,
    bottom: 10,
    '& .MuiSwitch-track': {
        boxShadow: "0px 10px 10px 0px #00000040",
        borderRadius: 22 / 2,
        '&:before, &:after': {
            content: '""',
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 16,
            height: 16,
        },
        '&:before': {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(theme.palette.secondary.main)}" d="M20 15.31 23.31 12 20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69zM12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" /></svg>')`,
            left: 12,
        },
        '&:after': {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(theme.palette.secondary.main)}" d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z" /></svg>')`,
            right: 12,
        },
    },
    '& .MuiSwitch-thumb': {
        background: theme.palette.secondary.main,
        boxShadow: 'none',
        width: 16,
        height: 16,
        margin: 2,
    },

}));



const TopSide:FC = () => {
    const styles = useStyles();
    const user = useUserContext();
    const isDarkMode = useAppSelector(selectIsDarkMode);
    const authState = useAppSelector(selectAuth);
    const dispatch = useAppDispatch();

    const outBg = () => {
        return user.data.bg  ? user.data.bg : defaultBgImage;
    }

    const outAvatar = () => {

        return user.data.avatar ? user.data.avatar : null;
    }

    const handleModeChange = () => {
        dispatch(setIsDarkMode(!isDarkMode));
    }

    const handleOpenLoginModal = () => {
        dispatch(setUniqueIdForLogin(user.data.uniqueId));
        dispatch(setLoginModalActive(true));
    }
    console.log(authState?.profile?.avatarHidden , 'avatarHidden')
    return (
        <Box className={styles.topSideBox}>
            <Box className={styles.bgBox} style={{backgroundImage: `url(${outBg()})` , padding: "160px 0"}}>
                <Typography onClick={handleOpenLoginModal} className={clsx(styles.loginTitle ,  {dark: isDarkMode})}>
                    ●●●
                </Typography>
                <Box style={{position: "absolute"}}>
                    {
                        authState?.profile?.avatarHidden === true ? <Box className={styles.box}/>  :   <Avatar img={outAvatar()}/>
                    }
                </Box>

                <ModeSwitch
                    checked={isDarkMode}
                    onChange={handleModeChange}
                />
            </Box>
            <UserTitles />
        </Box>
    )
}

export default TopSide;
