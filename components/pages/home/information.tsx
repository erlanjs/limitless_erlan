import {FC, useMemo} from "react";

import {Box, Button, Container, Theme, Link as MuiLink} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {media } from "../../../utility/media";
import {} from "../../../utility/media"
import {howToUseSteps, footerLinks} from "../../../constants/main";
import NextLink from 'next/link';



const containerPY = media(30, 45);

const useStyles = makeStyles((theme: Theme) => ({
    smartAnimate: {
        padding: ` 5px ${media(20, 50)}`,
        background: "white",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        borderRadius: '8px',
        border: "none",
        width: "250px",
        color: "black",
        fontFamily: 'Raleway',
        fontStyle: "normal",
        fontWeight: '400',
        lineHeight: "23px",
        letterSpacing: "0.25em"
    },
    styleImage: {
        maxWidth: media(300, 450),
        width: "100%"
    },
    styleBtn: {
        background: "white",
        marginLeft: "-100px",
        border: "none",
        padding: "0 20px",
        borderRadius: "4px",
        color: 'black',
        "&:hover": {
            background: "rgba(255,255,255,0.68)",
        }
    },
    boxContainer: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "start",
        flexWrap: "wrap",
        textAlign: 'center',
        [theme.breakpoints.up('xs')]: {
            // justifyContent: "center",
            justifyContent: "center"
        },
        [theme.breakpoints.up('md')]: {
            justifyContent: "space-around",

        },
        [theme.breakpoints.up('lg')]: {
            justifyContent: "space-between",

        },
        [theme.breakpoints.up('xl')]: {
            justifyContent: "space-between",
        },

    },
    media: {
        [theme.breakpoints.up('xs')]: {
            display: "none"
        },
        [theme.breakpoints.up('md')]: {
            display: "none",

        },
        [theme.breakpoints.up('lg')]: {
            display: "flex",

        },
        [theme.breakpoints.up('xl')]: {
            display: "flex",
        }
    },
    listItem: {
        fontSize: media(14, 17),
        fontWeight: '400',
        color: theme.palette.secondary.main,
    },
}));

const Information: FC = () => {
    const styles = useStyles();

    const outFooterLinks = useMemo(() => {
        return footerLinks.map((el, i) => {
            const propsToLink:any = {
                underline: 'none'
            }
            if(!el.isRelativePath){
                propsToLink['href'] = el.link;
            }
            const link = (
                <MuiLink key={i} {...propsToLink} className={styles.listItem}>
                    <button className={styles.styleBtn}>{el.title}</button>

                </MuiLink>
            )
            return el.isRelativePath ? (
                <NextLink key={i} href={el.link}>
                    {link}
                </NextLink>
            ) : link;
        })
    }, []);

    return (
        <div id="features" style={{background: "#181818", padding: "80px 0"}}>
            <Container maxWidth="lg" className={styles.boxContainer}>
                <Box style={{marginTop: "30px"}}>
                    <button className={styles.smartAnimate}>FEATURES</button>
                    <ul style={{fontFamily:'sans-serif'}}>
                        <li style={{textAlign: "left", color: "white", fontSize: '16px', lineHeight:'19px', letterSpacing:'0.13em', fontWeight: '400',margin: '10px'}}>Eco-friendly</li>
                        <li style={{textAlign: "left", color: "white",fontSize: '16px', lineHeight:'19px', letterSpacing:'0.13em', fontWeight: '400',margin: '10px'}}>Convenient for all users</li>
                        <li style={{textAlign: "left", color: "white",fontSize: '16px', lineHeight:'19px', letterSpacing:'0.13em', fontWeight: '400',margin: '10px'}}>Great user interface</li>
                        <li style={{textAlign: "left", color: "white",fontSize: '16px', lineHeight:'19px', letterSpacing:'0.13em', fontWeight: '400',margin: '10px'}}>Elegant & luxury card</li>
                        <li style={{textAlign: "left", color: "white",fontSize: '16px', lineHeight:'19px', letterSpacing:'0.13em', fontWeight: '400',margin: '10px'}}>Safe and secure</li>
                        <li style={{textAlign: "left", color: "white",fontSize: '16px', lineHeight:'19px', letterSpacing:'0.13em', fontWeight: '400',margin: '10px'}}>No App required</li>
                        <li style={{textAlign: "left", color: "white",fontSize: '16px', lineHeight:'19px', letterSpacing:'0.13em', fontWeight: '400',margin: '10px'}}>Works with Apple and Android</li>
                        <li style={{textAlign: "left", color: "white",fontSize: '16px', lineHeight:'19px', letterSpacing:'0.13em', fontWeight: '400',margin: '10px'}}>Express same day delivery</li>
                    </ul>
                </Box>
                <Box style={{marginTop: "30px"}}>
                    <button className={styles.smartAnimate}>HOW IT WORKS</button>
                    <ol style={{fontFamily:'sans-serif'}} className="works_items">
                        <li style={{textAlign: "left", color: "white", fontSize: '14px', letterSpacing:'0.13em', lineHeight:'19px',margin: '10px'}}>Tap your card to the phone</li>
                        <li style={{textAlign: "left", color: "white", fontSize: '14px', letterSpacing:'0.13em', lineHeight:'19px',margin: '10px'}}>Click right corner on top</li>
                        <li style={{textAlign: "left", color: "white", fontSize: '14px', letterSpacing:'0.13em', lineHeight:'19px', margin: '10px'}}>Enter default Password 123456</li>
                        <li style={{textAlign: "left", color: "white", fontSize: '14px', letterSpacing:'0.13em', lineHeight:'19px', margin: '10px'}}>Start add details</li>
                        <li style={{textAlign: "left", color: "white", marginBottom: '30px', fontSize: '14px', letterSpacing:'0.13em', lineHeight:'19px', margin: '10px'}}>Save & Go share</li>
                        {outFooterLinks}

                    </ol>
                </Box>
            </Container>
            <Box style={{textAlign: "center", marginTop: "20px"}}>
            </Box>
        </div>

    )
}


export default Information;
