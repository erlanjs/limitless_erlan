import {FC} from "react";
import {useUserContext} from "../../../pages/user/[uniqueId]";
import {Box, Theme, Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {media} from "../../../utility/media";
import clsx from "clsx";
import {useSelector} from "react-redux";
import {selectIsDarkMode} from "../../../store/selector/main";



const useStyles = makeStyles((theme:Theme) => ({
    box: {
        width: '100%',
        padding: `${media(10, 12)} ${media(3, 5)}`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gridRowGap: media(4, 6),
    },
    title: {
        color: theme.palette.primary.main,
        '&.dark': {
            color: theme.palette.secondary.main,
        }
    }
}));

const UserTitles:FC = () => {
    const styles = useStyles();
    const isDarkMode = useSelector(selectIsDarkMode);
    const user = useUserContext();

    return (
        <Box className={clsx(styles.box, {dark: isDarkMode})}>
            <Typography textAlign="center" style={user.data?.fullname ? null : {opacity: "0"} } className={clsx(styles.title, {dark: isDarkMode})} fontSize={media(18, 22)} fontWeight="600">
                {user.data?.fullname ? user.data.fullname : ""}
            </Typography>
            <Typography textAlign="center"  style={user.data?.position ? null : {opacity: "0"} } className={clsx(styles.title, {dark: isDarkMode})} fontSize={media(13, 17)} fontWeight="400">
                {user.data?.position ? user.data.position : ""}
            </Typography>
        </Box>
    )
}

export default UserTitles;