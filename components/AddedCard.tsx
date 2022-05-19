    import {FC, useEffect, useRef, useState} from "react";
    import {Box, Button, IconButton, Modal, Theme, Typography} from "@mui/material";
    import {makeStyles} from "@mui/styles";
    import {Formik} from 'formik';
    import * as yup from 'yup';
    import BaseInput from "./Form/BaseInput";
    import {useAppDispatch, useAppSelector} from "../hooks/redux";
    import {selectAuth} from "../store/selector/auth";
    import {media} from "../utility/media";
    import {setLoginModalActive, setUniqueIdForLogin, setUsersImageModal} from "../store/reducers/auth";
    import { SpinnerCircular } from 'spinners-react'
    import {useRouter} from "next/router";
    import {useForm} from "react-hook-form";
    // @ts-ignore
    import hex2rgba from "hex2rgba";
    import CloseIcon from "@mui/icons-material/Close";

    import {modalColor} from "../constants/main";
    import BaseButton from "./Form/BaseButton";
    import api from "../http/api";
    import {setLoading} from "../store/reducers/main";

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


    const AddedModal: FC<getCards> = ({getCards})=> {
        const styles = useStyles();
        const router = useRouter();
        const authState = useAppSelector(selectAuth);
        const dispatch = useAppDispatch();
        const modal = useRef(null);
        const [loadings, setLoadings] = useState(false)
        const handleClose = () => {
            dispatch(setUsersImageModal(false));
        }


        const [accses, setAccses]: any = useState('')
        useEffect(() => {
            setAccses(localStorage.getItem("access"))
        }, [accses])

        const blobToBase64 = (blob: any) => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
        const [newImg, setNewImg] = useState()
        console.log(accses)
        // const { register, handleSubmit, watch, formState: { errors } } = useForm();
        // const onSubmit = (data:any) => {
        //     console.log(data)
        //     alert("проверка")
        //     const formData = new FormData()
        //     formData.append("user_images[0]image", data.usersImage[0]);
        //
        //
        //     // formData.append("user_images[0]image", data.usersImage[0]);
        //     formData.append("user_images[0]user", authState.profile.id);
        //
        //     api.post(`users/images/${authState.profile.uniqueId}/` , formData, {
        //         headers: {
        //             "Authorization": `Bearer ${accses}`,
        //             "Content-Type": "multipart/form-data",
        //         }
        //     })
        //         .then(() => {
        //             alert("done")
        //             dispatch(setUsersImageModal(false));
        //         })
        //         .catch((e) =>{
        //             console.log(e)
        //             alert(JSON.stringify(e))
        //         })
        // };


        const [image, setImage] = useState(null);
        const [createObjectURL, setCreateObjectURL] = useState(null);

        const uploadToClient = (event: any) => {
            if (event.target.files && event.target.files[0]) {
                const i = event.target.files[0];

                setImage(i);
                setCreateObjectURL(URL.createObjectURL(i));
            }
        };

        const uploadToServer = async (event: any) => {
            setLoadings(true)
            const body = new FormData();
            body.append("user_images[0]image", image);
            body.append("user_images[0]user", authState.profile.id);
            await fetch(`https://api.limitless-connection.com/api/v1/users/images/${authState.profile.uniqueId}/`, {
                method: "POST",
                body: body,
                headers: {
                    "Authorization": `Bearer ${accses}`
                }
            }).then(() => {
                getCards()
                setLoadings(false)
                dispatch(setUsersImageModal(false))
            }).catch(e => {
                alert(JSON.stringify(e)+"addedCard")
            });

        };

        return (
            <Modal open={authState.usersImageModal} onClose={handleClose}>
                <Box ref={modal} className={styles.modal}>
                    <IconButton className={styles.closeBtn} onClick={handleClose}>
                        <CloseIcon className={styles.closeIcon}/>
                    </IconButton>

                    <form className={styles.form}>
                        <Box className={styles.topBox}>
                            {/*<BaseButton classes={styles.selectFileButton} component="label" htmlFor="usersImage">*/}
                            {/*    Select a file*/}
                            {/*</BaseButton>*/}
                            <img
                                src={createObjectURL || "https://psl.org.br/assets/layout/images/dark-user-bg.png"}
                                alt={""}
                                style={{width: "100%", height: "200px", margin: "15px 0"}}/>
                            <input
                                className={styles.selectFileButton}
                                accept="image/png, image/gif, image/jpeg"
                                id="usersImage"
                                type="file"
                                onChange={uploadToClient}/>
                            {/*{errors.usersImage && <span style={{color: "red", fontWeight: "500"}}>This field is required</span>}*/}
                        </Box>
                        <BaseButton onClick={uploadToServer} classes={styles.saveButton}>
                            {loadings ? <SpinnerCircular color="#FFFFFF" size="25"/> : "Save"}
                        </BaseButton>
                    </form>

                </Box>
            </Modal>
        )
    }


    export default AddedModal;
