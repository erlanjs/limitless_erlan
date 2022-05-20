import {FC, useEffect, useState} from "react";
import {Box, Button, FormControl, MenuItem, Paper, Select, Theme, Typography} from "@mui/material";
import Head from 'next/head'
import {makeStyles, useTheme} from "@mui/styles";
import {Formik} from 'formik';
import {media} from "../../../utility/media";
import {useProfileInfoActions} from "../../../hooks/profile";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {selectAuth} from "../../../store/selector/auth";
import {fonts} from "../../../constants/fonts";
import BaseInput from "../../Form/BaseInput";
import BaseButton from "../../Form/BaseButton";
import { useRouter } from 'next/router';
import * as yup from 'yup';
import { SpinnerCircular } from 'spinners-react';
import { useForm } from "react-hook-form";
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';


import {User, UserModel} from "../../../models/user";
import Loading from "../../Form/Loading";
// @ts-ignore
import hex2rgba from "hex2rgba";
import {checkTheDifference, outValues, saveValues, socials} from "../../../utility/form";
import {updateProfile} from "../../../actions/user";
import {websiteRegex} from "../../../constants/regex";
import clsx from "clsx";
import {useUserContext} from "../../../pages/user/[uniqueId]";
import {selectIsDarkMode} from "../../../store/selector/main";
import {setUsersImageModal, setUploadImageModal, setUploadVideoModal, setVideosCard, setImagesCard} from "../../../store/reducers/auth";

import api from "../../../http/api";
import dynamic from "next/dynamic";
import axios from "axios";
import DarkButton from "./DarkButton";
const AddedCard = dynamic(() => import("../../AddedCard"));
const UploadCard = dynamic(() => import("../../uploadCard"));
const UploadVideo = dynamic(() => import('../../UploadVideo'));

const useContactsStyles = makeStyles((theme: Theme) => ({
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',

        padding: `${media(5, 5)} 0`,
    },
    button: {
        width: '100%',
        fontSize: media(14, 16),
        fontWeight: 700,
        background: "#1C2124",
        color: theme.palette.primary.main,
        textTransform: 'none',
        '&:hover': {
            background: theme.palette.secondary.main,
            color: theme.palette.primary.main,
        }
    },
    button1: {
        marginTop: "20px",
        fontSize: media(14, 16),
        fontWeight: 700,
        background: "linear-gradient(270deg, #008DBA -15.48%, rgba(0, 160, 250, 0.56) 117.86%)",
        color: "white",
        textTransform: 'none',
        '&:hover': {
            background: "linear-gradient(270deg, #008DBA -15.48%, rgba(0, 160, 250, 0.56) 117.86%)",
            color: "white",
        }
    },
    form: {
        width: '100%',
        position: 'relative'
    },
    baseInputError: {
        background: "#1C2124",
        width: '100%',
        fontSize: media(16, 18),
        color: "#9A9A9A",
        padding: `${media(10, 12)} ${media(13, 15)}`,
        borderRadius: 5,
        border: '1px solid #FD0606',
        outline: 'none',
        '&:focus': {
            border: '1px solid #FD0606',
            outline: 'none'
        }
    },
    baseInput: {
        background: "#1C2124",
        width: '100%',
        fontSize: media(16, 18),
        color: "#9A9A9A",
        padding: `${media(10, 12)} ${media(13, 15)}`,
        borderRadius: 5,
        border: '1px solid rgba(154,154,154,0)',
        outline: 'none',
        '&:focus': {
            border: '1px solid rgba(154,154,154,0)',
            outline: 'none'
        }
    }

}));

export const ContactsInfo: FC = () => {
    const styles = useContactsStyles();
    const {PASSWORD} = useProfileInfoActions();
    const authState = useAppSelector(selectAuth);
    const dispatch = useAppDispatch();
    const router = useRouter()


    const initialValues1 = {
        workPhone: !!authState.profile.workPhone ? authState.profile.workPhone : "+971",
        personalPhone: !!authState.profile.personalPhone ? authState.profile.personalPhone : "+971",
        email: !!authState.profile.email ? authState.profile.email : "",
        workWebsite: !!authState.profile.workWebsite ? authState.profile.workWebsite : "",
    }

    const [exit, setExit] = useState(false)
    const [loadings, setLoadings] = useState(false)
    const [change, setChange] = useState('')

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = async (data:any) => {
       // alert(JSON.stringify(data))
        setLoadings(true)
        const difference = checkTheDifference(initialValues1, data);
        if (!difference.isChanged) {
            setChange("Nothing is changed")
        }
        const result = await dispatch(updateProfile({uniqueId: authState.profile.uniqueId, ...data})).unwrap();
        if (!result.success) {
            alert(JSON.stringify(result.message));
        }
        setLoadings(false)
        setExit(true)
        // actions.setSubmitting(false);
    };

    return (
        <>


            {/*<Formik*/}
            {/*    enableReinitialize*/}
            {/*    initialValues={initialValues1}*/}
            {/*    validationSchema={workInfoValidationSchema}*/}
            {/*    onSubmit={async (values, actions) => {*/}
            {/*        const difference = checkTheDifference(initialValues1, values);*/}
            {/*        actions.setStatus("");*/}
            {/*        if (!difference.isChanged) {*/}
            {/*            actions.setStatus("Nothing is changed");*/}
            {/*            actions.setSubmitting(false);*/}
            {/*            return;*/}
            {/*        }*/}
            {/*        const result = await dispatch(updateProfile({uniqueId: authState.profile.uniqueId, ...values})).unwrap();*/}
            {/*        if (!result.success) {*/}
            {/*            actions.setStatus(result.message);*/}
            {/*        }*/}
            {/*        setExit(true)*/}
            {/*        actions.setSubmitting(false);*/}

            {/*    }}*/}
            {/*>*/}
            {/*    {(formik) => (*/}
            {/*        <form onSubmit={formik.handleSubmit} className={styles.form}>*/}
            {/*            <Loading fontSize={media(16, 18)} bg={hex2rgba("#000000", 0.7)}*/}
            {/*                     active={formik.isSubmitting}/>*/}
            {/*            /!*<Head>*!/*/}
            {/*            /!*    {Object.entries(fonts).map((elem: any, i: number) => elem[1].link(i))}*!/*/}
            {/*            /!*</Head>*!/*/}
            {/*            /!*<Box sx={{width: '100%', display: 'flex', justifyContent: 'flex-end'}}>*!/*/}
            {/*            /!*</Box>*!/*/}
            {/*            <Box style={{display: "flex", margin: "20px 0"}}>*/}
            {/*                <img src={require("../../../assets/images/MobilePhone.svg")} alt="" style={{marginRight :"20px"}}/>*/}
            {/*                <BaseInput style={{textAlign: 'start', margin: "5px 0"}}*/}
            {/*                           placeholder="workPhone" name="workPhone" id="workPhone" type="text"/>*/}
            {/*            </Box>*/}
            {/*            <Box style={{display: "flex", margin: "20px 0"}}>*/}
            {/*                <img src={require("../../../assets/images/MobileTel.svg")} alt="" style={{marginRight :"20px"}}/>*/}
            {/*                <BaseInput style={{textAlign: 'start', margin: "5px 0"}}*/}
            {/*                           placeholder="personalPhone" name="personalPhone" id="personalPhone" type="text"/>*/}
            {/*            </Box>*/}
            {/*            <Box style={{display: "flex", margin: "20px 0"}}>*/}
            {/*                <img src={require("../../../assets/images/MobileSms.svg")} alt="" style={{marginRight :"20px"}}/>*/}
            {/*                <BaseInput style={{textAlign: 'start', margin: "5px 0"}} placeholder="email" name="email" id="email"*/}
            {/*                           type="email"/>*/}
            {/*            </Box>*/}
            {/*            <Box style={{display: "flex", margin: "20px 0"}}>*/}
            {/*                <img src={require("./../../../assets/images/MobileWebsite.svg")} alt="" style={{marginRight :"20px"}}/>*/}
            {/*                <BaseInput style={{textAlign: 'start', margin: "5px 0"}} placeholder="workWebsite" name="workWebsite" id="workWebsite"*/}
            {/*                           type="text"/>*/}
            {/*            </Box>*/}




            {/*            */}
            {/*            <Box className={styles.wrapper}>*/}
            {/*                {Object.entries(profileActions).filter((el: any) => !!el[1].isOut).map((elem: any) => (*/}
            {/*                    <DarkButton style={{width: "100%"}} onClick={elem[1].handleOpenModal} key={elem[0]}>{elem[1].title}</DarkButton>*/}
            {/*                ))}*/}
            {/*            </Box>*/}
            {/*            <Box style={{textAlign: "center"}}>*/}
            {/*                <BaseButton classes={styles.button1} type="submit">Save</BaseButton>*/}
            {/*            </Box>*/}
            {/*            <Box style={{textAlign: "center"}}>*/}
            {/*                {exit && <BaseButton classes={styles.button1} onClick={() => router.push(`/user/${authState.profile.uniqueId}`)}>Exit</BaseButton>}*/}
            {/*            </Box>*/}
            {/*            <Box style={{textAlign: "center"}}>*/}
            {/*                {!!formik.status && (*/}
            {/*                    <Typography fontSize={media(14, 16)} fontWeight="500" color="secondary">*/}
            {/*                        {formik.status}*/}
            {/*                    </Typography>*/}
            {/*                )}*/}
            {/*            </Box>*/}


            {/*        </form>*/}
            {/*    )}*/}
            {/*</Formik>*/}

            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                {/* register your input into the hook by invoking the "register" function */}
                            <Loading fontSize={media(16, 18)} bg={hex2rgba("#000000", 0.7)}
                                     active={loadings}/>
                <Box style={{display: "flex", margin: "20px 0"}}>

                    <img src={require("../../../assets/images/MobilePhone.svg")} alt="" style={{marginRight :"20px"}}/>
                    <input defaultValue={initialValues1.workPhone} type={"text"}  placeholder="workPhone" className={styles.baseInput}  {...register("workPhone")} />
                </Box>
                <Box style={{display: "flex", margin: "20px 0"}}>
                    <img src={require("../../../assets/images/MobileTel.svg")} alt="" style={{marginRight :"20px"}}/>
                    <input defaultValue={initialValues1.personalPhone} type={"text"}  placeholder="personalPhone" className={styles.baseInput}  {...register("personalPhone")} />
                </Box>
                <Box style={{display: "flex", margin: "20px 0"}}>
                    <img src={require("../../../assets/images/MobileSms.svg")} alt="" style={{marginRight :"20px"}}/>
                    <input defaultValue={initialValues1.email} placeholder="Email" type="email" className={errors.email ? styles.baseInputError : styles.baseInput}  {...register("email", {
                        required: true,
                        pattern: {
                            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            message: 'Please enter a valid email',
                        },
                    })} />
                </Box>
                <Box style={{display: "flex", margin: "20px 0"}}>
                    <img src={require("../../../assets/images/MobileWebsite.svg")} alt="" style={{marginRight :"20px"}}/>
                    <input defaultValue={initialValues1.workWebsite}  type={"text"} placeholder="Website" className={styles.baseInput}  {...register("workWebsite")} />
                </Box>
                <Box style={{display: "flex", margin: "20px 0"}}>
                    <img src={require("../../../assets/images/MobileKey.svg")} alt="" style={{marginRight :"20px"}}/>
                    <DarkButton style={{borderRadius: "5px"}} onClick={PASSWORD.handleOpenModal}>Edit password</DarkButton>
                </Box>

                {/*<Box className={styles.wrapper}>*/}
                {/*    {Object.entries(profileActions).filter((el: any) => !!el[1].isOut).map((elem: any) => (*/}
                {/*        <DarkButton style={{width: "100%"}} onClick={elem[1].handleOpenModal}*/}
                {/*                    key={elem[0]}>{elem[1].title}</DarkButton>*/}
                {/*    ))}*/}
                {/*</Box>*/}

                {/* include validation with required or other standard HTML validation rules */}
                {/*<input {...register("exampleRequired", { required: true })} />*/}
                <Box style={{textAlign: "center"}}>
                    <BaseButton classes={styles.button1} type="submit">SAVE</BaseButton>
                </Box>
                <Box style={{textAlign: "center"}}>
                    {exit && <BaseButton classes={styles.button1}
                                         onClick={() => router.push(`/user/${authState.profile.uniqueId}`)}>EXIT</BaseButton>}
                </Box>
                <Box style={{textAlign: "center"}}>
                        <Typography fontSize={media(14, 16)} fontWeight="500" color="secondary">
                            {change}
                        </Typography>
                </Box>
            </form>

        </>

    )
}


const useWorkInfoStyles = makeStyles((theme: Theme) => ({
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: `${media(7, 10)} 0`,
        overflow: 'hidden'
    },
    form: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gridRowGap: media(15, 20),

        position: 'relative'
    },
    select: {
        '&, & svg': {
            color: theme.palette.secondary.main,
        },
    },
    menu: {
        background: '#676767!important'
    },
    menuItem: {
        fontSize: media(14, 17),
        color: theme.palette.secondary.main,
    },
    textarea: {
        width: '100%',
        fontSize: media(16, 18),
        color: "#9A9A9A",
        padding: `${media(10, 12)} ${media(13, 15)}`,
        borderRadius: 5,
        border: 'none',
        background: "#1C2124",
        outline: 'none',
        textAlign: 'center',
        '&:focus': {
            border: 'none',
            outline: 'none'
        },
        '&::-webkit-scrollbar': {
            display: 'none',
        }
    },
    button: {
        padding: `${media(4, 7)} ${media(30, 40)}`,
    },
    workInfoTitle: {
        color: theme.palette.primary.main,
        '&.dark': {
            color: theme.palette.secondary.main,
        }
    },

    subtitle: {
        wordWrap: 'break-word',
        overflowWrap: 'break-word',
        margin: `${media(15, 25)} 0 ${media(22, 25)}`,
    },
    subtitleCard: {
        wordWrap: 'break-word',
        overflowWrap: 'break-word',
        fontWeight: "500",
    },
    description: {
        wordWrap: 'break-word',
        overflowWrap: 'break-word'
    },
    addressBox: {
        display: 'flex',
        alignItems: 'center',
        gridColumnGap: media(5, 8),
        marginTop: media(22, 25),
    },
    addressIcon: {
        fontSize: media(20, 22),
    },
    bgBox: {
        padding: "20px",
        marginTop: "50px",
        background: "none"
    },
    addedBox: {
        width: "100%",
        height: "300px",
        background: "#1C2124",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "5px",
        cursor: "pointer"
    },
    addBack: {
        width: "107px",
        height: "107px",
        borderRadius: "50%",
        background: "#1C2124",
        border: "2px solid #3F94E2",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "60px",
        color: "#3F94E2"
    },
    trueFolse: {
        padding: "10px  20px",
        background: "#FFF",
        borderRadius: "5px",
        cursor: "pointer"

    }
}));


const workInfoValidationSchema = yup.object({
    fontFamily: yup.string(),
    title: yup.string()
        .nullable()
        .max(UserModel.title.max, `Title must be equal or less than ${UserModel.title.max}`),
    subtitle: yup.string()
        .nullable()
        .max(UserModel.subtitle.max, `Subtitle must be equal or less than ${UserModel.subtitle.max}`)
})


export const WorkInfo: FC = () => {
    const styles = useWorkInfoStyles();
    const authState = useAppSelector(selectAuth);
    const dispatch = useAppDispatch();
    const theme: Theme = useTheme();
    const {data} = useUserContext();
    const isDarkMode = useAppSelector(selectIsDarkMode);
    const [userImages, setUserImages]: any = useState([])
    const [userVideos, setUserVideos]: any = useState([])
    const [userImagesData, setUserImagesData]: any = useState()
    const router = useRouter()

    const [accses, setAccses]: any = useState('')
    useEffect(() => {
        setAccses(localStorage.getItem("access"))
        getCards()

    }, [accses])

const getCards = () => {
    fetch(`https://api.limitless-connection.com/api/v1/users/images/${authState?.profile?.uniqueId}`, {
        headers: {
            "Authorization": `Bearer ${accses}`,
        }
    }).then((res) => res.json())
        .then((data) => {
            setUserImages(data)
        })
        .catch(e => {
            alert(JSON.stringify(e)+ "user_images")
        })
    fetch(`https://api.limitless-connection.com/api/v1/users/videos/${authState?.profile?.uniqueId}`, {
        headers: {
            "Authorization": `Bearer ${accses}`,
        }
    }).then((res) => res.json())
        .then((data) => {
            setUserVideos(data)
        })
        .catch(e => {
            alert(JSON.stringify(e)+ "user_video")
        })
}


const [loadingCard, setLoadingCrad] = useState(false)
    const [exit, setExit] = useState(false)



    const initialValues = {
        fontFamily: authState.profile.fontFamily,
        title: !!authState.profile.title ? authState.profile.title : "",
        welcome: !!authState.profile.welcome ? authState.profile.welcome : "",
        subtitle: !!authState.profile.subtitle ? authState.profile.subtitle : "",
        description: !!authState.profile.description ? authState.profile.description : "",
        address: !!authState.profile.address ? authState.profile.address : "",
        users_images: !!authState.profile.user_images ? authState.profile.user_images : [],
        avatarHidden: !!authState.profile.avatarHidden ? authState.profile.avatarHidden : "false",
        user_video: !!authState.profile.user_video ? authState.profile.user_video : [],
    }

    interface arr {
        title: string,
        subtitle: string,
        image: string
    }


    const click = ():void => {
        dispatch(setUsersImageModal(true))
    }
    const click1 = ():void => {
        dispatch(setUploadVideoModal(true))
    }


    const UploadModal = (el: any) => {
        setUserImagesData(el)
        dispatch(setUploadImageModal(true))
    }

    const deleteCard = (el: any) => {
        setLoadingCrad(true)
        api.delete(`users/image/${el.id}/`, {
            headers: {
                "Authorization": `Bearer ${accses}`,
            }
        })
            .then(() => {
                setLoadingCrad(false)
                getCards()
                console.log("delited")
            })
            .catch((e) => {
                console.log(e)
            })
    }

    const deleteVideoss = (el: any) => {
        api.delete(`users/video/${el.id}/`, {
            headers: {
                "Authorization": `Bearer ${accses}`,
            }
        })
            .then(() => {
                getCards()
                console.log("delitaed")
            })
            .catch((e) => {
                alert(JSON.stringify(e))
            })
    }




    return (
        <Box className={styles.wrapper}>
            <AddedCard getCards={getCards}/>
            <UploadCard item={userImagesData} getCards={getCards}/>
            <UploadVideo getCards={getCards}/>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={workInfoValidationSchema}
                onSubmit={async (values, actions) => {
                    const difference = checkTheDifference(initialValues, values);
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
                    setExit(true)
                    actions.setSubmitting(false);

                }}
            >
                {(formik) => (
                    <form onSubmit={formik.handleSubmit} className={styles.form}>
                        <Loading fontSize={media(16, 18)} bg={hex2rgba(theme.palette.primary.main, 0.7)}
                                 active={formik.isSubmitting}/>
                        <Head>
                            {Object.entries(fonts).map((elem: any, i: number) => elem[1].link(i))}
                        </Head>
                        <Box sx={{width: '100%', display: 'flex', justifyContent: 'flex-end'}}>
                            <FormControl variant="standard" sx={{m: 1, minWidth: 120}}>
                                <Select
                                    className={styles.select}
                                    value={formik.values.fontFamily}
                                    style={{fontFamily: fonts[formik.values.fontFamily]?.fontFamily}}
                                    onChange={formik.handleChange}
                                    name="fontFamily"
                                    label="Font Family"
                                    MenuProps={{classes: {paper: styles.menu}}}
                                >
                                    {Object.entries(fonts).map((elem) => (
                                        <MenuItem style={{fontFamily: elem[1]?.fontFamily}} className={styles.menuItem}
                                                  key={elem[0]} value={elem[0]}>{elem[1].fontFamily}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <BaseInput style={{fontFamily: fonts[formik.values.fontFamily]?.fontFamily, textAlign: 'center'}}
                                   placeholder="Add front page text" name="welcome" id="welcome" type="text"/>
                        <BaseInput style={{fontFamily: fonts[formik.values.fontFamily]?.fontFamily, textAlign: 'center'}}
                                   placeholder="Company" name="title" id="title" type="text"/>
                        <BaseInput style={{textAlign: 'center'}} placeholder="Subtitle" name="subtitle" id="subtitle"
                                   type="text"/>
                        <textarea
                            className={styles.textarea}
                            rows={8}
                            name="description"
                            id="description"
                            placeholder="About"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />

                        <BaseInput style={{textAlign: 'center'}} placeholder="Address" name="address" id="address"
                                   type="text"/>
                        <BaseButton classes={styles.button} type="submit">SAVE</BaseButton>
                        {exit && <BaseButton classes={styles.button} onClick={() => router.push(`/user/${authState.profile.uniqueId}`)}>EXIT</BaseButton>}
                        {!!formik.status && (
                            <Typography fontSize={media(14, 16)} fontWeight="500" color="secondary">
                                {formik.status}
                            </Typography>
                        )}

                        {
                            userVideos?.user_video?.length > 0 ?
                                <>
                                    {userVideos?.user_video?.map((esl:any) => (
                                        <>
                                            <iframe width="100%" height="308" src={esl.image}
                                                    title="YouTube video player" frameBorder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen/>
                                            <Box>
                                                <Button variant="outlined" color="error" onClick={() => deleteVideoss(esl)}>
                                                    Delete
                                                </Button>
                                            </Box>
                                        </>
                                    ))}
                                </>
                                :
                                null


                        }
                        <Box onClick={click1} className={styles.addedBox}>
                            <svg width="70" height="70" viewBox="0 0 50 50" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M20 36.25L35 25L20 13.75V36.25ZM25 0C11.2 0 0 11.2 0 25C0 38.8 11.2 50 25 50C38.8 50 50 38.8 50 25C50 11.2 38.8 0 25 0ZM25 45C13.975 45 5 36.025 5 25C5 13.975 13.975 5 25 5C36.025 5 45 13.975 45 25C45 36.025 36.025 45 25 45Z"
                                    fill="#F01414"/>
                            </svg>
                        </Box>


                        {
                            userImages?.user_images?.map((el: arr, key: string) => {
                                    return (

                                        <>
                                            <Box style={{width: "100%"}}>
                                                <Box width="100%" className={clsx(styles.bgBox, {dark: isDarkMode})}>
                                                    <Paper style={{
                                                        background: `url(${el.image}) no-repeat center / cover`,
                                                        height: "300px",
                                                        objectFit: "fill"
                                                    }}/>
                                                </Box>
                                                <Box style={{width: "95%"}}>
                                                    <Typography component="h2"
                                                                className={clsx(styles.subtitleCard, styles.workInfoTitle, {dark: isDarkMode})}>{el.title}</Typography>
                                                    <Typography
                                                        className={clsx(styles.subtitle, styles.workInfoTitle, {dark: isDarkMode})}>{el.subtitle}</Typography>
                                                    <Button variant="outlined" color="error" onClick={() => deleteCard(el)}>
                                                        {loadingCard ? <SpinnerCircular color="#ef5350" size="25"/> : "Delete"}
                                                    </Button>
                                                    <Button variant="outlined" color="secondary" onClick={() => UploadModal(el)}
                                                            style={{marginLeft: "20px"}}>
                                                        Change
                                                    </Button>
                                                </Box>
                                            </Box>
                                        </>

                                    )
                                }
                            )
                        }
                        <Box className={styles.addedBox} onClick={click}>
                            <Box className={styles.addBack}>
                                +
                            </Box>
                        </Box>


                    </form>
                )}
            </Formik>
        </Box>
    )
}


const socialsValidationSchema = yup.object({
    whatsapp: yup.string(),
    instagram: yup.string(),
    facebook: yup.string()
        .matches(websiteRegex, "Enter url to facebook"),
    linkedin: yup.string()
        .matches(websiteRegex, "Enter url to facebook"),
    youtube: yup.string()
        .matches(websiteRegex, "Enter url to facebook"),
    telegram: yup.string(),
    snapchat: yup.string(),
    tiktok: yup.string(),
    twitter: yup.string(),
});


const useSocialsStyles = makeStyles((theme: Theme) => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        gridRowGap: media(10, 15),
        position: 'relative',
    },
    icon: {
        color: theme.palette.secondary.main,
        fontSize: media(22, 24)
    },
    fieldItem: {
        display: 'flex',
        gridColumnGap: media(7, 10),
        alignItems: 'center',
    }
}));


export const Socials: FC = () => {
    const styles = useSocialsStyles();
    const dispatch = useAppDispatch();
    const authState = useAppSelector(selectAuth);
    const theme: Theme = useTheme();
    const router = useRouter()
    const [exit, setExit] = useState(false)

    const outInitialValues = () => {
        const pickFields = ({
                                instagram,
                                facebook,
                                tiktok,
                                whatsapp,
                                linkedin,
                                telegram,
                                snapchat,
                                wechat,
                                twitter,
                                youtube
                            }: User) => ({
            instagram,
            facebook,
            tiktok,
            whatsapp,
            linkedin,
            telegram,
            wechat,
            snapchat,
            twitter,
            youtube
        });
        return outValues(pickFields(authState.profile));
    }

    return (
        <Formik
            initialValues={outInitialValues()}
            validationSchema={socialsValidationSchema}
            onSubmit={async (values, actions) => {
                actions.setStatus("");
                const difference = checkTheDifference(outInitialValues(), values);
                if (!difference.isChanged) {
                    actions.setStatus("Nothing is changed");
                } else {
                    const turnedValues = saveValues(difference.changedValues);
                    const result = await dispatch(updateProfile({
                        uniqueId: authState.profile.uniqueId,
                        ...turnedValues
                    })).unwrap();
                    if (!result.success) {
                        actions.setStatus(result.message);
                    }
                    setExit(true)

                }
                actions.setSubmitting(true);
            }}
        >
            {(formik) => (
                <form onSubmit={formik.handleSubmit} className={styles.form}>
                    <Loading fontSize={media(18, 20)} bg={hex2rgba(theme.palette.primary.main, 0.7)}
                             active={formik.isSubmitting}/>
                    {Object.entries(socials).map((elem, i) => {
                            const Icon = elem[1].icon;
                            return (
                                <Box key={i} className={styles.fieldItem}>
                                    <Icon className={styles.icon}/>
                                    <BaseInput type='text' name={elem[0]} id={elem[0]} placeholder={elem[1].placeholder}/>
                                </Box>
                            )
                        }
                    )}

                    <Box style={{textAlign: 'center'}}>
                        <BaseButton style={{width: "20%"}} type="submit">SAVE</BaseButton>
                    </Box>
                    <Box style={{textAlign: 'center'}}>
                        {exit && <BaseButton style={{width: "20%"}} onClick={() => router.push(`/user/${authState.profile.uniqueId}`)}>EXIT</BaseButton>}
                    </Box>
                    {!!formik.status && (
                        <Typography textAlign="center" fontSize={media(16, 18)} fontWeight="500" color="secondary">
                            {formik.status}
                        </Typography>
                    )}
                </form>
            )}
        </Formik>
    )
}

