import AuthLayout from "../layouts/Auth";
import {Box, Container, Theme, Button, Switch} from "@mui/material";
import ModalWithForm from "../components/pages/profile/ModalWithForm";
import {NextPage} from "next";
import {SyntheticEvent, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {
    setImageUploadModalActive,
    setImageUploadModalData,
    setModalWithFormActive,
    setModalWithFormData,
    setSelectedTab,
    setImageHiden, setProfile
} from "../store/reducers/auth";
import {makeStyles} from "@mui/styles";
import {media} from "../utility/media";
import Avatar from "../components/User/Avatar";
import {defaultAvatar, defaultBgImage} from "../constants/main";
import {selectAuth} from "../store/selector/auth";
import DarkButton from "../components/pages/profile/DarkButton";
import {UserTabs, TabContent} from "../components/User/Tabs";
import {profileTabContent} from "../constants/profile";
import {styles} from "../components/User/styles";
import Head from "next/head";
import {useProfileInfoActions} from "../hooks/profile";
import UploadPhotoModal from "../components/pages/profile/UploadPhotoModal";
import ImageResizeModal from "../components/pages/profile/ImageResizeModal";
import {useSelector} from "react-redux";
import api from "../http/api";
import axios from "axios";
import {styled} from "@mui/material/styles";
import InfoFrofiloModal from "../components/InfoFrofiloModal";
import {setInfoProfiloModal} from "../store/reducers/main";


const useStyles = makeStyles((theme: Theme) => ({
    containerFluid: {
        background: theme.palette.primary.main,
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    topSideBox: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    bgBox: {
        width: '100%',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    },
    bgBox1: {
        width: '100%',
        padding: `${media(70, 100)}  ${media(18, 24)} 0 `,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    },
    avatarHolder: {
        margin: `${media(10, 15)} 0`,
    },
    editUserInfoBox: {
        padding: `${media(10, 12)} 0`
    },
    content: {
        ...styles.content,
    },
    box: {
        width: media(100, 130),
        height: media(100, 130),
        borderRadius: '50%',
        overflow: 'hidden',
        opacity: 0,
        margin: `${media(10, 15)} 0`,

    },
    checkBox: {
        width: "40px",
        height: "40px",
        marginLeft:"25px",
        marginBottom: "20px",
        cursor: "pointer"
    },
    bgButton: {
        width: "131px",
        height: "37px",
        borderRadius: "5px",
        background: "#EDEDED",
        border: "none",
        color: "#9A9A9A",
        fontSize: "12px",
        "&:hover": {
            background: "#dcd9d9",
        }
    }
}));


const Profile: NextPage = () => {
    const styles = useStyles();
    const dispatch = useAppDispatch();
    const authState = useAppSelector(selectAuth);
    const {INFO} = useProfileInfoActions();
    const [bool, setBool]: any = useState(authState.profile.avatarHidden)

    useEffect(() => {

        return () => {
            dispatch(setModalWithFormActive(false));
            dispatch(setModalWithFormData(null));
        }
    }, []);

    useEffect(() => {
        if (authState.authInfoLoaded) {
            if (authState.isAuth && !authState.profile.email) {
                dispatch(setModalWithFormData('PERSONAL_EMAIL'));
                dispatch(setModalWithFormActive(true));
            }
        }
    }, [authState.authInfoLoaded]);

    const outBg = () => {
        return authState.profile.bg ? authState.profile.bg : defaultBgImage;
    }

    const outAvatar = () => {
        return authState.profile.avatar ? authState.profile.avatar : defaultAvatar;
    }

    const handleTabChange = (e: SyntheticEvent<Element, Event>, newValue: any) => {
        dispatch(setSelectedTab(newValue));
    }

    const handleOpenBgUploadModal = () => {
        dispatch(setImageUploadModalData({key: 'BG', data: null}));
        dispatch(setImageUploadModalActive(true));
    }

    const handleOpenAvatarUploadModal = () => {
        dispatch(setImageUploadModalData({key: 'AVATAR_WITHOUT_LTRB', data: {avatar: null}}));
        dispatch(setImageUploadModalActive(true));
    }


    const btnStart = (e: any) => {
        setBool(e.target.checked);
    }

    useEffect(() => {
        console.log(bool)
        const formData = new FormData()
        formData.append("avatarHidden", bool)
        axios.patch(`https://api.limitless-connection.com/api/v1/users/${authState.profile.uniqueId}/`, formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access")}`,
            }
        })
            .then(({data}) => {
                console.log(data)
                dispatch(setProfile(data));
            })

    }, [bool])


    const ModeSwitch = styled(Switch)(({ theme }) => ({
        padding: 8,
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
            background:"white",
            boxShadow: 'none',
            width: 16,
            height: 16,
            margin: 2,
        },


    }));


    return (
        <Container maxWidth={false} disableGutters className={styles.containerFluid}>
            <Head>
                <title>Edit Profile</title>
                <meta name="title" content="Edit Profile"/>
            </Head>
            <ModalWithForm/>
            <UploadPhotoModal/>
            <ImageResizeModal/>
            <InfoFrofiloModal/>
            <Container maxWidth="sm" disableGutters style={{background: "#272E32"}}>
                <Box className={styles.topSideBox}>
                    <Box className={styles.bgBox} style={{backgroundImage: `url(${outBg()})`}}>
                        <Box className={styles.bgBox1}>
                            {/*<Button className={styles.bgButton} onClick={handleOpenAvatarUploadModal}>Avatar</Button>*/}

                            {
                                authState.profile.avatarHidden === true ? <><Box
                                    className={styles.avatarHolder}>
                                    <Box className={styles.box}/>
                                </Box></> :  <Box style={{padding: "32.5px 0"}}><Avatar img={outAvatar()}/></Box>
                            }
                            {/*<Button className={styles.bgButton} onClick={handleOpenBgUploadModal}>Background</Button>*/}
                        </Box>
                        {/*<input className={styles.checkBox} onChange={btnStart} checked={bool} type="checkbox"/>*/}
                        {/*<ModeSwitch onChange={btnStart} checked={bool}/>*/}

                    </Box>

                    <Box className={styles.editUserInfoBox}>
                        {/*<DarkButton onClick={INFO.handleOpenModal}>Edit name and position</DarkButton>*/}
                        <DarkButton onClick={() => dispatch(setInfoProfiloModal(true))}>EDIT PROFILE</DarkButton>
                    </Box>
                </Box>
                <UserTabs value={authState.selectedTab} onChange={handleTabChange}/>
                <Box className={styles.content}>
                    {profileTabContent.map((elem, i) => (
                        <TabContent key={elem.id} id={elem.id} selectedTab={authState.selectedTab}>
                            <elem.content/>
                        </TabContent>
                    ))}
                </Box>
            </Container>
        </Container>
    )
}


const AuthRequired = () => {

    return (
        <AuthLayout Children={Profile}/>
    )
}

export default AuthRequired;
