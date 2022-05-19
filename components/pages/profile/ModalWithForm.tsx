import {FC} from "react";
import {Box, Modal, Typography} from "@mui/material";
import {selectAuth} from "../../../store/selector/auth";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {setModalWithFormActive, setModalWithFormData} from "../../../store/reducers/auth";
import {makeStyles} from "@mui/styles";
import {Formik} from 'formik';
import {media} from "../../../utility/media";
import {useProfileInfoActions} from "../../../hooks/profile";
import BaseInput from "../../Form/BaseInput";
import BaseButton from "../../Form/BaseButton";
import Loading from "../../Form/Loading";
// @ts-ignore
import hex2rgba from "hex2rgba";
import {checkTheDifference} from "../../../utility/form";
import {modalColor} from "../../../constants/main";
import clsx from "clsx";



const useStyles = makeStyles({
    modal: {
        maxWidth: 400,
        width: '100%',
        background: modalColor,
        borderRadius: 15,

        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -100%)',

        padding: `${media(40, 50)} ${media(30, 45)} ${media(20, 25)}`,
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gridRowGap: media(15, 17),

        position: 'relative',
    },
});


type FormikValues = {
    [key:string]:string;
}

const ModalWithForm:FC = () => {
    const styles = useStyles();
    const authState = useAppSelector(selectAuth);
    const dispatch = useAppDispatch();
    const profileActions = useProfileInfoActions();
    const currentData = profileActions[authState.modalWithFormData];

    const handleClose = () => {
        if(authState.modalWithFormData === 'PERSONAL_EMAIL'){
            return;
        }
        dispatch(setModalWithFormActive(false));
        dispatch(setModalWithFormData(null));
    }
    if(!authState.modalWithFormActive){
        return null;
    }

    const outFormikInitialValues = () => {
        const values: FormikValues = {}
        currentData.fields.forEach((elem:any) => {
            values[elem.field] = elem.defaultValue !== undefined ? elem.defaultValue : (authState.profile[elem.field] ? authState.profile[elem.field] : "");
        });
        return values;
    }

    return (
        <Modal open={authState.modalWithFormActive} onClose={handleClose}>
            <Box className={clsx(styles.modal, 'modal-with-form')}>
                <Formik
                    enableReinitialize
                    initialValues={outFormikInitialValues()}
                    validationSchema={currentData.validationSchema}
                    onSubmit={async (values, actions) => {
                        actions.setStatus(null);
                        const changedData = checkTheDifference(outFormikInitialValues(), values);
                        if(!changedData.isChanged) {
                            actions.setStatus("You didnt change anything");
                            return;
                        }
                        await currentData.handleSubmit(values, actions);
                    }}
                >
                    {(formik) => (
                        <form className={styles.form} onSubmit={formik.handleSubmit}>
                            <Loading fontSize={media(14, 17)} bg={hex2rgba(modalColor, 0.7)} active={formik.isSubmitting} />
                            {currentData.fields.map((elem:any, i:number) => (
                                <BaseInput
                                    type="text"
                                    key={`${i}`}
                                    name={elem.field}
                                    id={elem.field}
                                    label={elem.label}
                                    {...(!!elem.placeholder && elem.placeholder) ? {placeholder: elem.placeholder} : {}}
                                />
                            ))}
                            <BaseButton type="submit">Save</BaseButton>
                            {!!formik.status && (
                                <Typography fontSize={media(17, 18)} color="secondary" fontWeight="500">
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


export default ModalWithForm;
