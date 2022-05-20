import {useAppDispatch, useAppSelector} from "./redux";
import {resizeAvatar, updateProfile} from "../actions/user";
import {selectAuth} from "../store/selector/auth";
import {
    setImageResizeModalActive, setImageResizeModalData,
    setImageUploadModalActive,
    setImageUploadModalData,
    setModalWithFormActive,
    setModalWithFormData
} from "../store/reducers/auth";
import * as yup from 'yup';
import {UserModel} from "../models/user";
import {websiteRegex} from "../constants/regex";


type FormikValues = {
    [key:string]: string;
}

const personalEmailValidationSchema = yup.object({
    email: yup.string()
        .required('Email is required')
});

const infoValidationSchema = yup.object({
    fullname: yup.string().nullable(),
    position: yup.string().nullable(),
});

const phoneValidationSchema = yup.object({
    workPhone: yup.string().nullable(),
    personalPhone: yup.string().nullable(),
});

const emailValidationSchema = yup.object({
    email: yup.string()
        .required('Email is required')
        .email('Must be correct email'),
    workEmail: yup.string()
        .email('Must be correct email'),
});

const websiteValidationSchema = yup.object({
    workWebsite: yup.string()
        .nullable()
        .matches(websiteRegex, 'Enter correct url'),
    otherWebsite: yup.string()
        .nullable()
        .matches(websiteRegex, 'Enter correct url')
});

const passwordValidationSchema = yup.object({
    password: yup.string()
        .required('Enter your password')
        .min(UserModel.password.min, `Password must be equal or more than ${UserModel.password.min}`)
        .max(UserModel.password.max, `Password must be equal or less than ${UserModel.password.max}`),
    password_confirmation: yup.string()
        .required('Enter your password')
        .oneOf([yup.ref('password'), null], 'Passwords must match')
});

export const useProfileInfoActions = ():any => {
    const dispatch = useAppDispatch();
    const authState = useAppSelector(selectAuth);

    const handleChangeData = async (values: FormikValues, actions:any) => {
        actions.setSubmitting(true);
        const result = await dispatch(updateProfile({
            uniqueId: authState.profile.uniqueId,
            ...values,
        })).unwrap();
        if(!result.success){
            actions.setStatus(result.message);
        }else{
            dispatch(setModalWithFormActive(false));
            dispatch(setModalWithFormData(null));
            actions.setStatus("Successfully changed");
        }
        actions.setSubmitting(false);
    }

    const handleChangePassword = async (values: FormikValues, actions:any) => {
        actions.setSubmitting(true);
        const result = await dispatch(updateProfile({
            uniqueId: authState.profile.uniqueId,
            password: values.password,
        })).unwrap();
        if(!result.success){
            actions.setStatus(result.message);
        }else{
            actions.setStatus("Successfully changed");
        }
        actions.setSubmitting(false);
        actions.resetForm();
        dispatch(setModalWithFormActive(false));
    }

    const handleOpenModal = (key: string) => {
        return () => {
            dispatch(setModalWithFormData(key));
            dispatch(setModalWithFormActive(true));
        }
    }

    return {
        'PERSONAL_EMAIL': {
            handleOpenModal: handleOpenModal('PERSONAL_EMAIL'),
            title: "Persona; Email",
            validationSchema: personalEmailValidationSchema,
            handleSubmit: handleChangeData,
            fields: [
                {
                    field: "email",
                    defaultValue: "",
                    label: "Your email",
                },
            ],
        },
        'INFO': {
            handleOpenModal: handleOpenModal('INFO'),
            title: "Info",
            validationSchema: infoValidationSchema,
            handleSubmit: handleChangeData,
            fields: [
                {
                    field: "fullname",
                    label: "Your name",
                },
                {
                    field: "position",
                    label: "Your position",
                }
            ],
        },
        'PHONE': {
            handleOpenModal: handleOpenModal('PHONE'),
            title: "Edit phone",
            validationSchema: phoneValidationSchema,
            handleSubmit: handleChangeData,
            fields: [
                {
                    field: "workPhone",
                    label: "Your work phone",
                },
                {
                    field: "personalPhone",
                    label: "Your personal phone",
                }
            ],
            isOut: true,
        },
        'EMAIL': {
            handleOpenModal: handleOpenModal('EMAIL'),
            title: "Edit email",
            validationSchema: emailValidationSchema,
            handleSubmit: handleChangeData,
            fields: [
                {
                    field: "email",
                    label: "EMAIL",
                }
            ],
            isOut: true,
        },
        'WEBSITE': {
            handleOpenModal: handleOpenModal('WEBSITE'),
            title: "Edit website",
            validationSchema: websiteValidationSchema,
            handleSubmit: handleChangeData,
            fields: [
                {
                    field: "workWebsite",
                    label: "WEBSITE",
                }
            ],
            isOut: true,
        },
        'PASSWORD': {
            handleOpenModal: handleOpenModal('PASSWORD'),
            title: "Edit password",
            validationSchema: passwordValidationSchema,
            handleSubmit: handleChangePassword,
            fields: [
                {
                    field: "password",
                    defaultValue: "",
                    label: "Your new password",
                },
                {
                    field: "password_confirmation",
                    defaultValue: "",
                    label: "Confirm your password",
                }
            ],
            isOut: true,
        }
    }
}


const outDataFromResizeModal = (data:any) => {
    if(!data) return [{
        name: "avatar"
    }];
    return Object.entries(data).map((elem) => ({
        name: elem[0],
        value: elem[1],
    }));
}

type ValuesType = {
    [key:string]:string;
}


const avatarValidationSchema = yup.object({
    avatar: yup.mixed()
        .required()
        .nullable()
});

const bgValidationSchema = yup.object({
    bg: yup.mixed()
        .nullable()
        .required()
});


export const useProfilePhotoActions = () => {
    const dispatch = useAppDispatch();
    const {profile} = useAppSelector(selectAuth);

    const handleBGFormSubmit = async (values:ValuesType, actions:any) => {
        actions.setSubmitting(true);
        const result = await dispatch(updateProfile({uniqueId: profile.uniqueId, ...values})).unwrap();
        if(!result.success){
            actions.setStatus(result.message);
        }else{
            actions.setStatus("Successfully bg is changed");
        }
        actions.resetForm();
        actions.setSubmitting(false);
        dispatch(setImageUploadModalActive(false));
        dispatch(setImageUploadModalData(null));
    }

    const handleAvatarWithoutLTRBSubmit = async (values:ValuesType, actions:any) => {
        dispatch(setImageUploadModalActive(false));
        dispatch(setImageUploadModalData(null));
        dispatch(setImageResizeModalData(values.avatar));
        dispatch(setImageResizeModalActive(true));
    }

    const handleAvatarWithLTRBSubmit = async (values:any, actions:any) => {
        actions.setSubmitting(true);
        const result = await dispatch(resizeAvatar(values)).unwrap();
        if(!result.success){
            actions.setStatus(result.message);
        }else{
            dispatch(setImageUploadModalActive(false));
            dispatch(setImageUploadModalData(null));
            actions.setStatus("Successfully avatar is saved");
        }
        actions.setSubmitting(false);
    }

    return {
        'AVATAR_WITHOUT_LTRB': (dataFromResizeModal:any=null) => ({
            fields: [
                ...outDataFromResizeModal(dataFromResizeModal),
            ],
            mainField: 'avatar',
            validationSchema: avatarValidationSchema,
            handleSubmit: handleAvatarWithoutLTRBSubmit,
        }),
        'AVATAR_WITH_LTRB': (dataFromResizeModal:any=null) => ({
            fields: [
                ...outDataFromResizeModal(dataFromResizeModal),
            ],
            mainField: 'avatar',
            validationSchema: avatarValidationSchema,
            handleSubmit: handleAvatarWithLTRBSubmit,
        }),
        'BG': () => ({
            fields: [{
                name: "bg"
            }],
            mainField: 'bg',
            validationSchema: bgValidationSchema,
            handleSubmit: handleBGFormSubmit,
        }),
    }
}