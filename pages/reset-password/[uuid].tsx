import {makeStyles, useTheme} from "@mui/styles";
import {Container, Theme, Typography} from "@mui/material";
import {Formik} from 'formik';
import * as yup from 'yup';
import {UserModel} from "../../models/user";
import BaseInput from "../../components/Form/BaseInput";
import {media} from "../../utility/media";
import BaseButton from "../../components/Form/BaseButton";
import Loading from "../../components/Form/Loading";
import {GetServerSidePropsContext, InferGetServerSidePropsType, NextPage} from "next";
import {checkResetPasswordUUID, resetPassword} from "../../actions/user";
import {useAppDispatch} from "../../hooks/redux";
import {useRouter} from "next/router";
// @ts-ignore
import hex2rgba from "hex2rgba";


const useStyles = makeStyles((theme:Theme) => ({
    containerFluid: {
        background: theme.palette.primary.main,
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gridRowGap: media(10, 15),
        position: 'relative',
    }
}));

const validationSchema = yup.object({
    password: yup.string()
        .required("Enter your password")
        .min(UserModel.password.min, `Password must be more or equal ${UserModel.password.min} simbols`)
        .max(UserModel.password.max, `Password must be less then ${UserModel.password.min}`),
    password_confirmation: yup.string()
        .required("Enter your password")
        .oneOf([yup.ref('password'), null], 'Passwords must match')
});



const ResetPassword = ({success, message}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const styles = useStyles();
    const dispatch = useAppDispatch();
    const router = useRouter();
    const theme:Theme = useTheme();

    return (
        <Container maxWidth={false} disableGutters className={styles.containerFluid}>
            <Container maxWidth="lg" className={styles.container}>
                {success ? (
                    <Formik
                        initialValues={{password: "", password_confirmation: ""}}
                        validationSchema={validationSchema}
                        onSubmit={async (values, actions) => {
                            actions.setSubmitting(true);
                            const result = await dispatch(resetPassword({resetPasswordUUID: router.query.uuid, password: values.password})).unwrap();
                            if(result.success){
                                router.push('/profile');
                                return;
                            }
                            actions.setStatus(result.message);
                            actions.setSubmitting(false);
                        }}
                    >
                        {(formik) => (
                            <form onSubmit={formik.handleSubmit} className={styles.form}>
                                <Loading bg={hex2rgba(theme.palette.primary.main, 0.6)} fontSize={media(13, 16)} active={formik.isSubmitting} />
                                <BaseInput type="text" name="password" id="password" label="New Password" placeholder={`Enter your ${UserModel.password.min} characters Password`} />
                                <BaseInput type="text" name="password_confirmation" id="password_confirmation" label="Confirm new password" placeholder="Confirm your new password" />
                                <BaseButton type="submit">Save</BaseButton>
                            </form>
                        )}
                    </Formik>
                ) : (
                    <Typography fontSize={media(17, 20)} fontWeight="500" color="secondary">
                        {message}
                    </Typography>
                )}
            </Container>
        </Container>
    )
}

export const getServerSideProps = async (ctx:GetServerSidePropsContext) => {
    const result = await checkResetPasswordUUID(ctx.query.uuid);
    return {
        props: result,
    }
}


export default ResetPassword;
