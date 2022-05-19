import {FC, useEffect, useRef, useState} from "react";
import {Box, IconButton, Modal, Theme} from "@mui/material";
import {makeStyles} from "@mui/styles";
// import {Formik} from 'formik';
import * as yup from 'yup';
// import BaseInput from "./Form/BaseInput";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {selectAuth} from "../store/selector/auth";
import {media} from "../utility/media";
import {
    // setLoginModalActive,
    // setUniqueIdForLogin,
    // setUsersImageModal,
    setUploadVideoModal,
    // setProfile
} from "../store/reducers/auth";
// import {login} from "../actions/auth";
import {useRouter} from "next/router";
import {useForm} from "react-hook-form";
// @ts-ignore
import hex2rgba from "hex2rgba";
import CloseIcon from "@mui/icons-material/Close";
// import clsx from "clsx";
// import {forgotPassword} from "../actions/user";
// import {setLoading} from "../store/reducers/main";
import {modalColor} from "../constants/main";
import BaseButton from "./Form/BaseButton";
// import {any} from "prop-types";
import api from "../http/api";
// import axios from "axios";

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
    }
}));


const validationSchema = yup.object({
    title: yup.string()
        .required('Title is required')
        .min(6, 'Must be more or equal than 6 digits'),
    description: yup.string()
        .required('Description is required')
})

interface getCards {
    getCards: any
}


const UploadVideo: FC<getCards> = ({getCards}) => {
    const styles = useStyles();
    const router = useRouter();
    const authState = useAppSelector(selectAuth);
    const dispatch = useAppDispatch();
    const modal = useRef(null);

    const handleClose = () => {
        dispatch(setUploadVideoModal(false));
    }


    const [accses, setAccses]: any = useState('')
    const [errorss, setErrorss]: any = useState([])
    useEffect(() => {
        setAccses(localStorage.getItem("access"))
    }, [accses])
    const [loadings, setLoadings] = useState(false)

    const [url, setUrl] = useState('')
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = (data:any) => {
        setLoadings(true)
        const formData = new FormData()
        formData.append("user_video[0].video", data.video);
        formData.append("user_video[0].user", authState.profile.id);
        const dete = {
            user_video: [
                {
                    image: data.video,
                    user: authState.profile.id
                }
            ]
        }

        api.post(`users/videos/${authState.profile.uniqueId}/` , dete, {
            headers: {
                "Authorization": `Bearer ${accses}`,
            }
        })
            .then(() => {
                getCards()
                setLoadings(false)
                dispatch(setUploadVideoModal(false));
            })
            .catch((e) =>{
                setLoadings(false)
                setErrorss(e.response.data)
                console.log(e)
            })
    };
    console.log(url)
    return (
        <Modal open={authState.usersUploadVideoModal} onClose={handleClose}>
            <Box ref={modal} className={styles.modal}>
                <IconButton className={styles.closeBtn} onClick={handleClose}>
                    <CloseIcon className={styles.closeIcon}/>
                </IconButton>

                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <Box className={styles.topBox}>
                        <input className={styles.inputPhone} onChange={(e) => setUrl(e.target.value)} {...register("video", { required: true })} style={{textAlign: 'center'}} placeholder="Url" />
                        {errors.video && <span style={{color: "red", fontWeight: "500"}}>This url is required</span>}
                    </Box>
                    <span>{errorss?.user_video?.map((eler:any) => eler.image)}</span>
                    <BaseButton type="submit" classes={styles.saveButton}>
                        {loadings ? <svg xmlns="http://www.w3.org/2000/svg" style={{margin: "auto", background: "none", display: "block", shapeRendering: "auto"}} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                            <circle cx="50" cy="50" r="32" strokeWidth="8" stroke="#FFFFFF" strokeDasharray="50.26548245743669 50.26548245743669" fill="none" strokeLinecap="round">
                                <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" keyTimes="0;1" values="0 50 50;360 50 50"/>
                            </circle>
                        </svg> : "Save"}
                    </BaseButton>
                </form>

            </Box>
        </Modal>
    )
}


export default UploadVideo;
