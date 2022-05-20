// import {useAppDispatch, useAppSelector} from "../hooks/redux";
// import {selectMainState} from "../store/selector/main";
// import {setSimpleModalActive, setInfoProfiloModal} from "../store/reducers/main";
// import {Box, IconButton, Modal, Theme, Typography} from "@mui/material";
// import {makeStyles} from "@mui/styles";
// import {media} from "../utility/media";
// import CloseIcon from "@mui/icons-material/Close";

//
// const useStyles = makeStyles((theme:Theme) => ({
//     modal: {
//         maxWidth: media(320, 360),
//         width: '100%',
//         zIndex: 300,
//         position: 'absolute',
//         top: '50%',
//         left: '50%',
//         transform: 'translate(-50%, -50%)',
//         background: "#878787",
//         borderRadius: '15px',
//         padding: `${media(30, 40)} ${media(20, 26)}`,
//
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         outline: 'none',
//         border: 'none',
//     },
//     closeBtn: {
//         position: 'absolute',
//         right: 5,
//         top: 5,
//     },
//     closeIcon: {
//         fontSize: media(20, 22),
//         color: theme.palette.secondary.main,
//     }
// }));
//
//
// const InfoPortfolioModal:FC = () => {
//     const styles = useStyles();
//     const mainState = useAppSelector(selectMainState);
//     const dispatch = useAppDispatch();
//
//     const handleClose = () => {
//         dispatch(setInfoProfiloModal(false));
//     }
//     return (
//         <Modal open={mainState.setInfoProfiloModal} onClose={handleClose}>
//             <Box className={styles.modal}>
//                 <IconButton className={styles.closeBtn} onClick={handleClose}>
//                     <CloseIcon className={styles.closeIcon} />
//                 </IconButton>
//                 <Typography textAlign="left" fontSize={media(13, 15)} fontWeight="400" color="secondary">
//                     {mainState.simpleModalMessage}
//                 </Typography>
//             </Box>
//         </Modal>
//     )
// }
//
//
// export default InfoPortfolioModal;


import {FC, useEffect, useRef, useState} from "react";
import {Box, Button, IconButton, Modal, Paper, Switch, Theme, Typography, FormControlLabel} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {Formik} from 'formik';
import {setInfoProfiloModal} from "../store/reducers/main";

import * as yup from 'yup';
import BaseInput from "./Form/BaseInput";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {selectAuth} from "../store/selector/auth";
import {media} from "../utility/media";
import {
    setImageUploadModalActive,
    setImageUploadModalData,
    setLoginModalActive, setProfile,
    setUniqueIdForLogin,
    setUsersImageModal
} from "../store/reducers/auth";
import {SpinnerCircular} from 'spinners-react'
import {useRouter} from "next/router";
import {useForm} from "react-hook-form";
import {selectMainState} from "../store/selector/main";

// @ts-ignore
import hex2rgba from "hex2rgba";
import CloseIcon from "@mui/icons-material/Close";

import {defaultAvatar, defaultBgImage, modalColor} from "../constants/main";
import BaseButton from "./Form/BaseButton";
import api from "../http/api";
import {setLoading} from "../store/reducers/main";
import {styled} from "@mui/material/styles";
import axios from "axios";
import DarkButton from "./pages/profile/DarkButton";
import {checkTheDifference} from "../utility/form";
import {updateProfile} from "../actions/user";
import Loading from "./Form/Loading";
import Avatar from "./User/Avatar";

const useStyles = makeStyles((theme: Theme) => ({
    modal: {
        maxWidth: media(340, 400),
        width: '100%',
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        background: modalColor,
        borderRadius: 15,
        padding: `${media(50, 65)} ${media(35, 45)} ${media(40, 55)}`,
        border: 'none',
        outline: 'none'
    },
    form: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        position: 'relative',
    },
    forgotPasswordBtn: {
        display: 'flex',
        justifyContent: 'end',
        fontSize: media(14, 16),
        color: "#379FFF",
        cursor: "pointer"
    },
    sendBtn: {
        fontSize: media(13, 15),
        color: "#FFFFFF",
        background: "linear-gradient(270deg, #008DBA -15.48%, rgba(0, 160, 250, 0.56) 117.86%)",
        padding: `${media(2, 5)} ${media(15, 20)}`,
        marginTop: "20px",
        width: "126px",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    },
    button: {
        '&:hover': {
            color: theme.palette.primary.main,
            background: theme.palette.secondary.main,
        }
    },
    closeBtn: {
        position: 'absolute',
        right: 5,
        top: 5,
    },
    closeIcon: {
        fontSize: media(20, 22),
        color: theme.palette.secondary.main,
    },
    topBox: {},
    selectFileButton: {
        background: theme.palette.secondary.main,
        color: theme.palette.primary.main,
        fontWeight: '600',
        fontSize: media(12, 14),
        textTransform: 'none',
        padding: `${media(4, 7)} ${media(17, 20)}`,
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
    },
    saveButton: {
        textTransform: 'none',
        fontSize: media(12, 14),
        fontWeight: '600',
        marginTop: media(45, 70),
    },
    inputPhone: {
        width: "100%",
        padding: "10px",
        outline: "none",
        border: "none",
        borderRadius: "10px",
        marginTop: "10px",
        fontSize: "20px"
    },
    paperBack: {
        width: "100%",
        height: "200px",
        background: "#1C2124",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    editButton: {
        background: "#1C2124",
        color: "#888888",
        margin: "5px 0",
        "&:hover": {
            background: "rgba(28,33,36,0.83)",
        }
    },
    IOSSwitch: {
        position: "absolute",
        top: "225px"
    }
}));


const InfoPortfolioModal: FC = () => {
    const styles = useStyles();
    const router = useRouter();
    const mainState = useAppSelector(selectMainState);
    const authState = useAppSelector(selectAuth);
    const dispatch = useAppDispatch();
    const modal = useRef(null);
    const [bool, setBool]: any = useState(authState.profile.avatarHidden)

    const initialValues1 = {
        fullname: !!authState.profile.fullname ? authState.profile.fullname : "",
        position: !!authState.profile.position ? authState.profile.position : "",
    }

    const handleClose = () => {
        dispatch(setInfoProfiloModal(false));
    }

    const handleOpenBgUploadModal = () => {
        dispatch(setImageUploadModalData({key: 'BG', data: null}))
        dispatch(setImageUploadModalActive(true))
    }


    const handleOpenAvatarUploadModal = () => {
        dispatch(setImageUploadModalData({key: 'AVATAR_WITHOUT_LTRB', data: {avatar: null}}))
        dispatch(setImageUploadModalActive(true))
    }

    const outBg = () => {
        return authState.profile.bg ? authState.profile.bg : defaultBgImage;
    }

    const outAvatar = () => {
        return authState.profile.avatar ? authState.profile.avatar : defaultAvatar;
    }

    const ModeSwitch = styled(Switch)(({theme}) => ({
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
            background: "white",
            boxShadow: 'none',
            width: 16,
            height: 16,
            margin: 2,
        },


    }));


    const IOSSwitch = styled(Switch)(({theme}) => ({
        width: 42,
        height: 26,
        padding: 0,
        '& .MuiSwitch-switchBase': {
            padding: 0,
            margin: 2,
            transitionDuration: '300ms',
            '&.Mui-checked': {
                transform: 'translateX(16px)',
                color: '#fff',
                '& + .MuiSwitch-track': {
                    backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#2696FE',
                    boxShadow: "0px 10px 10px rgba(0, 0, 0, 0.25), inset 0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 4px 4px rgba(0, 0, 0, 0.25)",
                    opacity: 1,
                    border: 0,
                },
                '&.Mui-disabled + .MuiSwitch-track': {
                    opacity: 0.5,
                },
            },
            '&.Mui-focusVisible .MuiSwitch-thumb': {
                color: '#33cf4d',
                border: '6px solid #fff',
            },
            '&.Mui-disabled .MuiSwitch-thumb': {
                color:
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[100]
                        : theme.palette.grey[600],
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
            },
        },
        '& .MuiSwitch-thumb': {
            boxSizing: 'border-box',
            width: 22,
            height: 22,
        },
        '& .MuiSwitch-track': {
            borderRadius: 26 / 2,
            backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
            boxShadow: "0px 10px 10px rgba(0, 0, 0, 0.25), inset 0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 4px 4px rgba(0, 0, 0, 0.25)",
            opacity: 1,
            transition: theme.transitions.create(['background-color'], {
                duration: 500,
            }),
        },
    }))


    const btnStart = (e: any) => {
        setBool(e.target.checked);
    }

    const [edit, setEdit] = useState(false)

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

    return (
        <Modal open={mainState.infoProfiloModal} onClose={handleClose}>
            <Box ref={modal} className={styles.modal}>
                <IconButton className={styles.closeBtn} onClick={handleClose}>
                    <CloseIcon className={styles.closeIcon}/>
                </IconButton>
                <Paper className={styles.paperBack} style={{background: `url(${outBg()}) no-repeat center/cover`}}>
                    {/**/}
                    {
                        authState.profile.avatarHidden === true ? <><Box
                            >
                            <Box/>
                        </Box></> :  <Box><img src={outAvatar()} alt="" style={{width: "120px", borderRadius: "50%"}}/></Box>
                    }
                    <IOSSwitch sx={{m: 1}} onChange={btnStart} checked={bool} className={styles.IOSSwitch}/>
                    {/*<ModeSwitch onChange={btnStart} checked={bool}/>*/}
                </Paper>
                <Box style={{display: "flex", justifyContent: "space-between"}}>
                    <Button className={styles.editButton} onClick={handleOpenBgUploadModal}>Edit background</Button>
                    <Button className={styles.editButton} onClick={handleOpenAvatarUploadModal}>Edit display</Button>
                </Box>
                <Formik
                    enableReinitialize
                    initialValues={initialValues1}
                    onSubmit={async (values, actions) => {
                        const difference = checkTheDifference(initialValues1, values);
                        actions.setStatus("");
                        if (!difference.isChanged) {
                            actions.setStatus("Nothing is changed");
                            actions.setSubmitting(false);
                            return;
                        }
                        const result = await dispatch(updateProfile({uniqueId: authState.profile.uniqueId, ...values})).unwrap();
                        if (!result.success) {
                            actions.setStatus(result.message);
                        }
                        actions.setSubmitting(false);
                        setEdit(false)

                    }}
                >
                    {(formik) => (
                        <form onSubmit={formik.handleSubmit} className={styles.form}>
                            <Loading fontSize={media(16, 18)} bg={hex2rgba("#000000", 0.7)}
                                     active={formik.isSubmitting}/>
                            {edit ? null : <DarkButton style={{width: "100%", marginTop: "13px"}} onClick={() => setEdit(true)}>Edit name</DarkButton>}

                            {edit &&
                                <>
                                    <Box style={{margin: "5px 0", width: "100%"}}>
                                        <BaseInput style={{textAlign: 'start', margin: "10px 0"}}
                                                   placeholder="fullname" name="fullname" id="fullname" type="text"/>
                                    </Box>
                                    <Box style={{margin: "5px 0", width: "100%"}}>
                                        <BaseInput style={{textAlign: 'start'}}
                                                   placeholder="position" name="position" id="position" type="text"/>
                                    </Box>


                                    <Box style={{textAlign: "center"}}>
                                        <BaseButton type="submit">SAVE</BaseButton>
                                    </Box>
                                    {!!formik.status && (
                                        <Typography fontSize={media(14, 16)} fontWeight="500" color="secondary">
                                            {formik.status}
                                        </Typography>
                                    )}
                                </>}



                        </form>
                    )}
                </Formik>
            </Box>
        </Modal>
    )
}


export default InfoPortfolioModal;




















