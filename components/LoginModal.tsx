import {FC, useRef} from "react";
import {Box, Button, IconButton, Modal, Theme, Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {Formik} from 'formik';
import * as yup from 'yup';
import BaseInput from "./Form/BaseInput";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {selectAuth} from "../store/selector/auth";
import {media} from "../utility/media";
import {setLoginModalActive, setUniqueIdForLogin} from "../store/reducers/auth";
import Loading from "./Form/Loading";
import {login} from "../actions/auth";
import {useRouter} from "next/router";
// @ts-ignore
import hex2rgba from "hex2rgba";
import CloseIcon from "@mui/icons-material/Close";
import clsx from "clsx";
import {forgotPassword} from "../actions/user";
import {setLoading} from "../store/reducers/main";
import {modalColor} from "../constants/main";

const useStyles = makeStyles((theme:Theme) => ({
    modal: {
        maxWidth: 400,
        width: '100%',
        background: modalColor,
        borderRadius: 15,
        outline: "none",
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',

        padding: `${media(40, 50)} ${media(30, 45)} ${media(20, 25)}`
    },
    form: {
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridRowGap: media(10, 12),

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
    }
}));


const validationSchema = yup.object({
    password: yup.string()
        .required('Password is required')
        .min(6, 'Must be more or equal than 6 digits')
})

const LoginModal:FC = () => {
    const styles = useStyles();
    const router = useRouter();
    const authState = useAppSelector(selectAuth);
    const dispatch = useAppDispatch();
    const modal = useRef(null);

    const handleClose = () => {
        dispatch(setUniqueIdForLogin(""));
        dispatch(setLoginModalActive(false));
    }

    const handleForgotPassword = async () => {
        dispatch(setLoading(true));
        const result = await dispatch(forgotPassword(authState.uniqueIdForLogin)).unwrap();
        dispatch(setLoading(false));
        if(!result.success && result.error){
            router.push('/500');
        }
        dispatch(setUniqueIdForLogin(""));
        dispatch(setLoginModalActive(false));
    }

    return (
        <Modal open={authState.loginModalActive} onClose={handleClose}>
            <Box ref={modal} className={styles.modal}>
                <IconButton className={styles.closeBtn} onClick={handleClose}>
                    <CloseIcon className={styles.closeIcon} />
                </IconButton>
                <Formik
                    initialValues={{password: ""}}
                    validationSchema={validationSchema}
                    onSubmit={async (values, actions) => {
                        actions.setSubmitting(true);
                        actions.setStatus("");
                        const loginResult = await dispatch(login({uniqueId: authState.uniqueIdForLogin, password: values.password})).unwrap();
                        if(loginResult.success){
                            handleClose();
                            router.push('/profile');
                        }else{
                            actions.setStatus(loginResult.error);
                            actions.setSubmitting(false);
                        }
                    }}
                >
                    {(formik) => (
                        <form className={styles.form} onSubmit={formik.handleSubmit}>
                            <Loading fontSize={media(12, 14)} bg={hex2rgba('#ffffff', 0.7)} active={formik.isSubmitting} />
                            <BaseInput type="text" id="login-password" name="password" placeholder="Enter your password" />
                            <Typography className={clsx(styles.forgotPasswordBtn)} onClick={handleForgotPassword}>Forgot Password ?</Typography>
                            <Box style={{display: "flex" , justifyContent: "center"}}>
                                <Button className={clsx(styles.sendBtn)} type="submit">LOGIN</Button>
                            </Box>
                            {!!formik.status && (
                                <Typography textAlign="center" fontSize={media(15, 18)} fontWeight="500" color="red">
                                    {formik.status}
                                </Typography>
                            )}
                        </form>
                    )}
                </Formik>
            </Box>
        </Modal>
    )
}


export default LoginModal;