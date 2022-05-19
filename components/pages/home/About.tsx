import {FC} from "react";
import {Container, Typography, Box, Theme} from "@mui/material";
import {media} from "../../../utility/media";
import {makeStyles} from "@mui/styles";


const containerPY = media(30, 45);

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: containerPY,
        paddingBottom: containerPY,
    },
    img: {
        width: media(300, 390),
        height: media(180, 368),
        objectFit: 'cover',
        margin: `${media(5, 10)} ${media(2, 5)}`,
    },
    img1: {
        width: media(300, 508),
        height: media(180, 368),
        objectFit: 'cover',
        margin: `${media(5, 10)} ${media(2, 5)}`,
        [theme.breakpoints.up('xs')]: {
            // justifyContent: "center",
            justifyContent: "center",
            width: media(300, 390),
        },
        [theme.breakpoints.up('md')]: {
            justifyContent: "space-around",
            width: media(300, 508),


        },
        [theme.breakpoints.up('lg')]: {
            justifyContent: "space-around",
            width: media(300, 508),


        },
        [theme.breakpoints.up('xl')]: {
            justifyContent: "space-between",
            width: media(300, 508),

        }
    },
    smartAnimate: {
        padding: ` 5px ${media(20, 110)}`,
        background: "white",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        borderRadius: '8px',
        border: "none",
        fontFamily: 'Raleway',
        color: "black",
        fontStyle: "normal",
        fontWeight: '400',
        lineHeight: "23px",
        letterSpacing: "0.2em",
        marginBottom: media(10, 50)
    },
    boxContainer: {
        display: "flex",
        flexWrap: "wrap",
        marginTop: "50px",
        justifyContent: "space-between",
        [theme.breakpoints.up('xs')]: {
            // justifyContent: "center",
            justifyContent: "center"
        },
        [theme.breakpoints.up('md')]: {
            justifyContent: "space-around",

        },
        [theme.breakpoints.up('lg')]: {
            justifyContent: "space-around",

        },
        [theme.breakpoints.up('xl')]: {
            justifyContent: "space-between",
        }
    }
}));


const About: FC = () => {
    const styles = useStyles();
    return (
        <div style={{background: "#181818"}} id="about">
            <Box className={styles.container}>
                <Typography className={styles.smartAnimate}>
                    ABOUT US
                </Typography>
                <Container maxWidth="lg">
                    <Typography color="secondary" textAlign="center" component="p" fontSize={media(16, 17)} fontWeight="400">
                        Limitless Connection card-new generation smart business card with more advanced options. You can add your contact
                        details, social media accounts, pictures and more other details and you can update at any time. No
                        more messing around with a paper business cards. One card for life time.
                    </Typography>
                </Container>

                <Box className={styles.boxContainer}>
                    <img src={require('../../../assets/images/aboutLc.png')} className={styles.img} alt={""}/>
                    <img src={require('../../../assets/images/aboutLc2.png')} className={styles.img1} alt={""}/>
                    <img src={require('../../../assets/images/aboutLc3.png')} className={styles.img} alt={""}/>
                </Box>

            </Box>
        </div>

    )
}

export default About;
