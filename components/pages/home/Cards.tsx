import {FC, useRef, useState} from "react";
import {Box, Button, Container, IconButton, Theme, Link as MuiLink, Typography} from "@mui/material";
import {media} from "../../../utility/media";
import {makeStyles} from "@mui/styles";
import {useAppSelector} from "../../../hooks/redux";
import {selectCardState} from "../../../store/selector/card";
import {ArrowBackIos, ArrowForwardIos, ArrowLeft} from '@mui/icons-material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import NextLink from 'next/link';
// @ts-ignore
import Slider from 'react-slick';
import clsx from "clsx";
import {currenciesTitle} from "../../../constants/main";


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
    slider: {
        '& .slick-dots': {
            margin: 0,
            padding: 0,
            display: 'flex!important',
            justifyContent: 'center',
            listStyleType: "none",
            '& li': {}
        }
    },
    sliderItemBox: {
        outline: 'none',
        border: 'none',
        width: "290px",
        cursor: "grab",
    },
    sliderImg: {
        width: '100%',
        objectFit: 'contain',
        borderRadius: "10px"
    },
    sliderArrows: {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 3,
    },
    sliderIcon: {
        color: "#FFFFFF",
        fontSize: media(20, 23)
    },
    prevArrow: {
        left: 0,
    },
    nextArrow: {
        right: 0,
    },
    sliderDotsList: {
        display: 'flex',
    },
    sliderDot: {
        width: media(10, 15),
        height: media(10, 15),
        borderRadius: '50%',
        background: theme.palette.primary.main,
        margin: 10,
    },
    button: {
        background: "black",
        borderRadius: 5,
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        color: theme.palette.secondary.main,
        maxWidth: 450,
        width: '50%',
        marginTop: media(10, 20),
        fontWeight: '600',
        fontSize: media(10, 14),
        "&:hover": {
            background: "black",
        }
    },
    cardsTitle: {
        fontWeight: "bold",
    },
    boxContainerBox: {
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        [theme.breakpoints.up('xs')]: {
            // justifyContent: "center",
            justifyContent: "center",
            display: "none"
        },
        [theme.breakpoints.up('md')]: {
            justifyContent: "space-between",
            display: "flex"


        },
        [theme.breakpoints.up('lg')]: {
            justifyContent: "space-between",
            display: "flex"

        },
        [theme.breakpoints.up('xl')]: {
            justifyContent: "space-between",
            display: "flex"
        },
    },
    boxContainerBox1: {
        width: "100%",
        display: "none",
        justifyContent: "space-between",
        flexWrap: "wrap",
        [theme.breakpoints.up('xs')]: {
            // justifyContent: "center",
            justifyContent: "center",
            display: "flex"
        },
        [theme.breakpoints.up('md')]: {
            justifyContent: "space-between",
            display: "none"


        },
        [theme.breakpoints.up('lg')]: {
            justifyContent: "space-between",
            display: "none"

        },
        [theme.breakpoints.up('xl')]: {
            justifyContent: "space-between",
            display: "none"
        },
    },
    form: {
        width: '100%',
        position: 'relative',
    },
    cardSelectHolder: {
        width: '100%',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr',
        gridColumnGap: media(10, 14),
        padding: `${media(10, 15)} 0`,
        '@media (max-width: 450px)': {
            gridTemplateColumns: '1fr 1fr',
            gridRowGap: media(10, 14),
        }
    },
    orderInfo: {
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridRowGap: media(10, 15),
    },
    paymentTypeHolder: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${media(15, 20)} 0`,
    },
    userInfoForm: {
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridRowGap: media(13, 17),
        margin: `${media(10, 14)} 0`,
    },
    smartAnimate: {
        padding: ` 5px ${media(20, 110)}`,
        margin: "20px 0",
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
}));


const Cards: FC = () => {
    const styles = useStyles();
    const cardState = useAppSelector(selectCardState);
    const slider = useRef(null);
    const [index, setIndex] = useState(0);

    const handleNextSlider = () => {
        slider.current.slickNext();
    }
    const handlePrevSlider = () => {
        slider.current.slickPrev();
    }

    const settings = {
        dots: true,
        arrows: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        appendDots: (dots: any) => {
            return <ul className={styles.sliderDotsList}>{dots.map((elem: any, i: number) => <li
                className={styles.sliderDot} key={i} onClick={elem.props.children.props.onClick}/>)}</ul>
        }
    };

    const settings1 = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const handleSlideChange = (i: number) => {
        setIndex(i);
    }

    const outCurrentCardPrice = () => {
        if (cardState.cardsLoaded) {
            if (cardState.cardsError) {
                return null;
            }
            if (cardState.cards.length) {
                return (
                    <Typography fontSize={media(23, 36)} fontWeight="600" color="secondary">
                        {cardState.cards[index][`price_dollar`]} {currenciesTitle['dollar']}
                    </Typography>
                )
            }
            return null;
        }
        return null
    }
    console.log(cardState.cards, "cards")
    const outCards = () => {
        if (cardState.cardsLoaded) {
            if (cardState.cardsError) {
                return (
                    <Typography>
                        {cardState.cardsError}
                    </Typography>
                )
            }
            if (cardState.cards.length) {
                return (
                    <Box id="cards" className={styles.boxContainerBox}>
                        {cardState.cards.map((elem) => (
                            <>
                                <NextLink href="/get-card">
                                    <Box key={elem.id} className={styles.sliderItemBox}>
                                        <Typography className={styles.cardsTitle} style={{color: "white"}}>{elem.title}</Typography>
                                        <img className={styles.sliderImg} src={elem.image} alt={""}/>
                                        <Typography className={styles.cardsTitle}
                                                    style={{textAlign: "end", color: "white", fontFamily:'sans-serif'}}>{elem.price_dollar} $</Typography>
                                    </Box>
                                </NextLink>
                            </>


                        ))}
                    </Box>
                )
            }
            return (
                <Typography>
                    There is no cards
                </Typography>
            )
        }
        return (
            <Typography>
                Loading ...
            </Typography>
        )
    }

    const outSliders = () => {
        if (cardState.cardsLoaded) {
            if (cardState.cardsError) {
                return (
                    <Typography>
                        {cardState.cardsError}
                    </Typography>
                )
            }
            if (cardState.cards.length) {
                return (
                    <Box className={styles.boxContainerBox1}>
                            <>
                                {/*<NextLink href="/get-card">*/}
                                {/*    <Box key={elem.id} className={styles.sliderItemBox}>*/}
                                {/*        <Typography className={styles.cardsTitle}>{elem.title}</Typography>*/}
                                {/*        <img className={styles.sliderImg} src={elem.image} />*/}
                                {/*        <Typography className={styles.cardsTitle} style={{textAlign: "end"}}>{elem.price_dollar} $</Typography>*/}
                                {/*    </Box>*/}
                                {/*</NextLink>*/}
                                    <Box sx={{width: '100%', position: 'relative'}}>
                                        <IconButton className={clsx(styles.sliderArrows, styles.prevArrow)}
                                                    onClick={handlePrevSlider}>
                                            <ArrowLeftIcon className={styles.sliderIcon} style={{fontSize: "30"}}/>
                                        </IconButton>
                                        <IconButton className={clsx(styles.sliderArrows, styles.nextArrow)}
                                                    onClick={handleNextSlider}>
                                            <ArrowRightIcon className={styles.sliderIcon} style={{fontSize: "30"}}/>
                                        </IconButton>
                                        <Slider
                                            ref={slider}
                                            {...settings1}
                                            afterChange={handleSlideChange}
                                        >
                                            {cardState.cards.map((elem) => (
                                                <Box key={elem.id} className={styles.sliderItemBox}>
                                                    <NextLink href="/get-card">
                                                        <img className={styles.sliderImg} src={elem.image}/>
                                                    </NextLink>
                                                </Box>
                                            ))}
                                        </Slider>
                                    </Box>
                            </>


                    </Box>
                )
            }
            return (
                <Typography>
                    There is no cards
                </Typography>
            )
        }
        return (
            <Typography>
                Loading ...
            </Typography>
        )
    }

    return (
        <div style={{background: "#181818"}}>
            <Container maxWidth="lg" className={styles.container}>

                {/*<button className={styles.smartAnimate}>SMART CARDS</button>*/}
                {outCards()}
                {outSliders()}
            </Container>
        </div>

    )
}

export default Cards;
