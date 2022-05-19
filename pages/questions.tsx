import {NextPage} from "next";
import MainLayout from "../layouts/Main";
import {Accordion, AccordionDetails, AccordionSummary, Box, Container, Theme, Typography} from "@mui/material";
import {media} from "../utility/media";
import {makeStyles} from "@mui/styles";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {questions} from "../constants/main";
import {FC, useState} from "react";


const containerPY = media(15, 25);

const useStyles = makeStyles((theme:Theme) => ({
    container: {
        paddingTop: containerPY,
        paddingBottom: containerPY,
    },
    videoSide: {
        display: 'flex',
        '@media (max-width: 1050px)': {
            flexDirection: 'column',
        }
    },
    youtubeVideo: {
        height: media(240, 300),
        flex: 1,
        '@media (max-width: 1050px)': {
            width: '100%',
            height: media(240, 380),
            flex: 'unset',
            marginTop: media(10, 15)
        }
    },
    videoSideOut: {
        flex: 1.5,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start"
    },
    accordion: {
        background: 'transparent',
        boxShadow: 'none',
        border: 'none',
        outline: 'none',
        margin: '20px 0'
    },
    accordionIcon: {
        fontSize: media(22, 25),
        color: theme.palette.secondary.main,
    },
    accordionTitle: {
        fontSize: media(18, 22),
        fontWeight: '400',
        color: theme.palette.secondary.main,
        marginLeft: media(4, 7)
    },
    accordionContent: {
        padding: `${media(3, 5)} ${media(5, 15)}`,
    },
    accordionTextContent: {
        fontSize: media(15, 17),
        fontWeight: '400',
        color: theme.palette.secondary.main,
    },
    accordionSummary: {
        flexDirection: 'row-reverse',
        padding: 0,
    },
}));

interface CustomAccordionProps{
    elem: {
        title: string;
        content: string;
        id: number;
    }
}

const CustomAccordion:FC<CustomAccordionProps> = ({elem}:CustomAccordionProps) => {
    const [expanded, setExpanded] = useState(true);
    const styles = useStyles();

    const handleToggleAccordion = () => {
        setExpanded(!expanded);
    }

    return (
        <Accordion className={styles.accordion} expanded={expanded} onChange={handleToggleAccordion}>
            <AccordionSummary
                className={styles.accordionSummary}
                expandIcon={<ExpandMoreIcon className={styles.accordionIcon} />}
            >
                <Typography className={styles.accordionTitle}>{elem.title}</Typography>
            </AccordionSummary>
            <AccordionDetails className={styles.accordionContent}>
                <Typography dangerouslySetInnerHTML={{__html: elem.content}} className={styles.accordionTextContent} />
            </AccordionDetails>
        </Accordion>
    )
}


const Questions:NextPage = () => {
    const styles = useStyles();

    return (
        <MainLayout>
            <Container maxWidth="xl" className={styles.container}>
                <Typography fontSize={media(28, 34)} fontWeight="600" color="secondary" textAlign="center">
                    Frequently Asked Questions
                </Typography>
                <Box>
                    <Box className={styles.videoSide}>
                        <Box className={styles.videoSideOut}>
                            {questions.filter(el => !!el.isVideoSide).map((elem, i) => (
                                <CustomAccordion key={i} elem={elem} />
                            ))}
                        </Box>
                        <iframe
                            width="500px"
                            height="100%"
                            className={styles.youtubeVideo}
                            src="https://www.youtube.com/embed/lxRwEPvL-mQ"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </Box>
                    <Box>
                        {questions.filter(el => !el.isVideoSide).map((elem, i) => (
                            <CustomAccordion key={i} elem={elem} />
                        ))}
                    </Box>
                </Box>
            </Container>
        </MainLayout>
    )
}


export default Questions;