import {FC} from "react";
import {Box, Container, Theme, Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {media} from "../../../utility/media";
// import {howToUseSteps} from "../../../constants/main";

const containerPY = media(30, 45);

const useStyles = makeStyles((theme: Theme) => ({
    smartAnimate: {
        padding: ` 5px ${media(20, 110)}`,
        background: "white",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        borderRadius: '8px',
        border: "none",
        color: "black",
        fontFamily: 'Raleway',
        fontStyle: "normal",
        fontWeight: '400',
        lineHeight: "23px",
        letterSpacing: "0.2em",
        marginBottom: "20px"
    },
    smartDesc: {},
    imagePhones: {
        maxWidth: media(500, 700),
        textAlign: "center",
        width: "100%"
    },
    boxContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap-reverse",
        [theme.breakpoints.up('xs')]: {
            // justifyContent: "center",
            justifyContent: "center"
        },
        [theme.breakpoints.up('md')]: {
            justifyContent: "space-between",

        },
        [theme.breakpoints.up('lg')]: {
            justifyContent: "space-between",

        },
        [theme.breakpoints.up('xl')]: {
            justifyContent: "space-between",
        },
    }
}));

const EasyToUse: FC = () => {
    const styles = useStyles();
    return (
        <div style={{background: "#181818", paddingTop: "50px"}}>
            <Box className={styles.boxContainer}>
                <img className={styles.imagePhones} src={require('../../../assets/images/phones2.png')} alt={""}/>
                <Box style={{width: "530px", marginRight: "50px", color: "white", marginLeft: media(50, 20)}}>
                    <button className={styles.smartAnimate}>SMART INTERFACE</button>
                    <Typography>The shortest route to your customers is through their mobile phones. <br/>Express yourself in
                        ways never before possible with a Limitless connection smart business card. You can showcase
                        your work by uploading rich content</Typography>
                </Box>
            </Box>
        </div>

    )
}


export default EasyToUse;
