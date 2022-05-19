import {FC} from "react";
import {AppBar, Toolbar, Link as MuiLink, Theme} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {media} from "../utility/media";
import NextLink from "next/link";
import {Box} from "@mui/system";

const useStyles = makeStyles((theme: Theme) => ({
    appBar: {
        position: "absolute",
        padding :"0 50px",
        margin: "auto",
        background: "rgba(0,0,0,0)",

    },
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
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
            justifyContent: "space-around",
        },

    },
    logo: {
        width: media(140, 140),
        objectFit: 'contain'
    },
    navItem: {
        color: "white",
        margin: "0 15px",
        cursor: "pointer"
    },
    navBox :{
        display: "flex",
        [theme.breakpoints.up('xs')]: {
            // justifyContent: "center",
            display: "none"
        },
        [theme.breakpoints.up('md')]: {
            display: 'flex',


        },
        [theme.breakpoints.up('lg')]: {
            display: 'flex',


        },
        [theme.breakpoints.up('xl')]: {
            display: 'flex',

        },
    }
}));

const Header:FC = () => {
    const styles = useStyles();
    return (
        <AppBar position="sticky" className={styles.appBar}>
                <Toolbar className={styles.toolbar}>
                    <NextLink href={"/"}>
                        <MuiLink >
                            <img className={styles.logo} src={require('../assets/images/lcLogos.png')}  alt={''}/>
                        </MuiLink>
                    </NextLink>
                    <Box className={styles.navBox}>
                        <NextLink href={"/"}><p className={styles.navItem}>HOME</p></NextLink>
                        <NextLink href={"/#cards"}><p className={styles.navItem}>PRODUCTS</p></NextLink>
                        <NextLink href={"/#features"}><p className={styles.navItem}>HOW IT WORKS</p></NextLink>
                        <NextLink href={"/#about"}><p className={styles.navItem}>GALLERY</p></NextLink>
                    </Box>
                </Toolbar>

        </AppBar>
    )
}


export default Header;
