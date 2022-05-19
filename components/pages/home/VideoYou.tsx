import {FC, useState} from "react";
import {Box, Button, Container, Paper, Theme, Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {media} from "../../../utility/media";
import {howToUseSteps} from "../../../constants/main";

const containerPY = media(30, 45);

const useStyles = makeStyles((theme: Theme) => ({
    smartAnimate: {
        padding: ` 5px ${media(20, 50)}`,
        background: "linear-gradient(270deg, #675A37 -3.1%, rgba(107, 93, 58, 0.588329) 18.19%, rgba(242, 210, 124, 0.85) 47.68%, rgba(77, 69, 50, 0.78) 101.74%)",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        borderRadius: '8px',
        border: "none",
        color: "black",
        fontFamily: 'Raleway',
        fontStyle: "normal",
        fontWeight: '400',
        lineHeight: "23px",
        letterSpacing: "0.2em"
    },
    styleImage: {
        maxWidth: media(300, 450),
        width: "100%"
    },
    styleBtn: {
        background: "black",
        color: 'white',
        padding: "5px 20px",
        "&:hover": {
            background: "black",
        }
    },
    video: {
        height: media(200, 500)
    },
    video1: {
        position: "relative",
        paddingBottom: "56.25%",
        /* 16:9 */ height: 0,
        "& img": {
            position: "absolute", display: "block", top: 0, left: 0, width: "100%", height: "100%", zIndex: "20", cursor: "pointer"
        }
    }
}));

const VideoYou: FC = () => {
    const styles = useStyles();
    return (
        <div style={{background: "#181818", padding: `${media(10, 40)} 20px`}}>
            <iframe width="100%" className={styles.video} src="https://www.youtube.com/embed/AcG08pJazGo"
                    title="YouTube video player" frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    />
        </div>

    )
}


export default VideoYou;