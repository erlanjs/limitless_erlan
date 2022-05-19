import {FC} from "react";
import {Box, Container, Theme, Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {media} from "../../../utility/media";
import {howToUseSteps} from "../../../constants/main";

const containerPY = media(30, 45);

const useStyles = makeStyles((theme: Theme) => ({
    smartAnimate: {
        padding: ` 5px ${media(20, 50)}`,
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
    styleImage: {
        maxWidth: media(200, 350),
        width: "100%",
        "@media(maxWidth: 860px)": {
            display: "none"

        }
    },
    centerContainer: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
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

const INTERFACE: FC = () => {
    const styles = useStyles();
    return (
        <div style={{background: "#181818", padding: "80px 0"}}>
            <Container maxWidth="lg" className={styles.centerContainer}>
                <Box style={{width: media(400, 450)}}>
                    <button className={styles.smartAnimate}>SMART INTERFACE</button>
                    <Typography color="white" style={{paddingBottom: "40px"}}>
                        Dark themes reduce the luminance emitted
                        by device screens,  They help improve visual ergonomics by reducing your eye strain, </Typography>
                </Box>
                <img className={styles.styleImage} src={require('../../../assets/images/thvoPhone3.png')} alt={""}/>


            </Container>
        </div>

    )
}


export default INTERFACE;
