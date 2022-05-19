import {FC, SyntheticEvent} from "react";
import {TabContent, UserTabs} from "../../User/Tabs";
import {selectSelectedTab} from "../../../store/selector/user";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {setSelectedTab} from "../../../store/reducers/user";
import {Box, Container, IconButton, Theme} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {media} from "../../../utility/media";
import {userTabContent} from "../../../constants/main";
import {useUserContext} from "../../../pages/user/[uniqueId]";
import {styles} from "../../User/styles";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
// import {setShareModalActive, setShareModalUrl} from "../../../store/reducers/main";


const useStyles = makeStyles((theme:Theme) => ({
    content: {
        ...styles.content,
    },
    bottomButtonsBox: {
        position: "sticky",
        display: 'flex',
        justifyContent: 'flex-end',
        zIndex: 99,
        bottom: "15px",
        marginLeft: "-15px"

    },
    iconButton: {
        width: media(44, 50),
        height: media(44, 50),
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: "#2795FB",
        boxShadow: "0px 6px 6px rgba(117, 141, 154, 0.25)",
        '&:hover': {
            background: "#2795FB",
        }
    },
    replyBoxIconButton: {
        width: media(45, 55),
        height: media(45, 55),
        transform: 'scaleX(-1)',
    },
    personAddIcon: {
        color: theme.palette.primary.main,
        fontSize: media(20, 22),
    },
    shareIcon: {
        fontSize: media(20, 22),
        color: theme.palette.primary.main,
        '&.dark': {
            color: theme.palette.secondary.main,
        }
    }
}));



const BottomSide = () => {
    const styles = useStyles();
    const selectedTab = useAppSelector(selectSelectedTab);
    const {data} = useUserContext();
    const dispatch = useAppDispatch();

    const handleTabChange = (event: SyntheticEvent<Element, Event>, value:any) => {
        dispatch(setSelectedTab(value));
    }

    const saveContact = () => {
        window.location.href = `${process.env.API_URL}users/save-contact/${data.uniqueId}`;
	}
    // const handleOpenShareModal = () => {
    //     dispatch(setShareModalUrl(`${process.env.BASE_URL}/user/${data.uniqueId}`));
    //     dispatch(setShareModalActive(true));
    // }

    return (
        <>
            <UserTabs value={selectedTab} onChange={handleTabChange} />
            <Box className={styles.content}>
                {userTabContent.map((elem) => (
                    <TabContent selectedTab={selectedTab} key={elem.id} id={elem.id}>
                        <elem.content />
                    </TabContent>
                ))}
            </Box>
            <Container disableGutters maxWidth="sm" className={styles.bottomButtonsBox}>
                {/*<IconButton onClick={handleOpenShareModal} className={styles.replyBoxIconButton}>*/}
                {/*    <ReplyAllIcon className={clsx(styles.shareIcon, {dark: isDarkMode})}  />*/}
                {/*</IconButton>*/}
                <IconButton onClick={saveContact} className={styles.iconButton}>
                    <PersonAddIcon className={styles.personAddIcon} />
                </IconButton>
            </Container>
        </>
    )
}

export default BottomSide;
