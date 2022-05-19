// import NextLink from 'next/link';
import {FC} from "react";
import MainLayout from "../layouts/Main";
import {Typography, Link as MuiLink, Container} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {media} from "../utility/media";
import BlueButton from "../components/BlueButton";

import  NextLink from 'next/link'


const containerPY = media(35, 55);

const useStyles = makeStyles({
    container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: containerPY,
        paddingBottom: containerPY,
    }
});

const NotFound:FC = () => {
    const styles = useStyles();
    return (
        <MainLayout>
            <Container maxWidth="sm" className={styles.container}>
                <Typography fontSize={media(38, 48)} fontWeight="700" color="secondary">
                    500
                </Typography>
                <Typography marginTop={media(5, 8)} fontSize={media(28, 33)} fontWeight="700" color="secondary">
                    ERROR OCCURRED
                </Typography>
                <Typography marginY={media(10, 15)} fontSize={media(18, 21)} fontWeight="400" color="secondary">
                    Some kind of error has occurred
                </Typography>
                <NextLink href={"/index"}>
                    <MuiLink underline="none">
                        <BlueButton sx={{maxWidth: 300, width: '100%'}}>
                            Home
                        </BlueButton>
                    </MuiLink>
                </NextLink>
            </Container>
        </MainLayout>
    )
}


export default NotFound;
