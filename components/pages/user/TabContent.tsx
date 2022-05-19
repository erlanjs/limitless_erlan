import {FC, Key, useMemo} from "react";
import {useUserContext} from "../../../pages/user/[uniqueId]";
import {Box, Link as MuiLink, Theme, Typography, Paper} from "@mui/material";
import {noDataText, outContactsInfo, socialsOut} from "../../../constants/main";
import {makeStyles} from "@mui/styles";
import {useAppSelector} from "../../../hooks/redux";
import {selectIsDarkMode} from "../../../store/selector/main";
import clsx from "clsx";
import {media} from "../../../utility/media";
import {fonts, requiredFontFamilies} from "../../../constants/fonts";
import LocationOnIcon from '@mui/icons-material/LocationOn';


const useContactsStyles = makeStyles((theme: Theme) => ({
    form: {
        display: 'grid',
        gridTemplateColumns: '1fr',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        gridRowGap: media(20, 25),
    },
    link: {
        display: 'flex',
    },
    label: {
        color: theme.palette.primary.main,
        '&.dark': {
            color: theme.palette.secondary.main,
        }
    },
    value: {
        color: theme.palette.primary.main,
        padding: `${media(3, 5)} 0`,
        '&.dark': {
            color: theme.palette.secondary.main,
        },
    },
    noDataTitle: {
        color: theme.palette.primary.main,
        '&.dark': {
            color: theme.palette.secondary.main,
        }
    }
}));


export const ContactsInfo: FC = () => {
    const styles = useContactsStyles();
    const isDarkMode = useAppSelector(selectIsDarkMode);
    const {data} = useUserContext();

    const userInfo = useMemo(() => {
        return outContactsInfo(data);
    }, []);
    return (
        <form className={styles.form}>
            {userInfo.length ? userInfo.map((elem, i) => (
                <MuiLink underline="none" key={i} href={elem.link} className={styles.link}>
                    <img src={elem.img} alt="" style={{marginRight: "20px"}}/>
                    <Typography style={{fontFamily: requiredFontFamilies['KANIT'].fontFamily}} fontSize={media(16, 18)}
                                className={clsx(styles.value, {dark: isDarkMode})}>
                        {elem.value}
                    </Typography>
                </MuiLink>
            )) : (
                <Box sx={{width: '100%', py: media(15, 23)}}>
                    <Typography textAlign="center" fontSize={media(18, 22)} fontWeight="500"
                                className={clsx(styles.noDataTitle, {dark: isDarkMode})}>
                        {noDataText}
                    </Typography>
                </Box>
            )}
        </form>
    )
}


interface workInfoStylesProps {
    fontFamily: string;
}


const useWorkInfoStyles = makeStyles((theme: Theme) => ({
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: `${media(7, 10)} 0`,
        overflow: 'hidden'
    },
    workInfoTitle: {
        color: theme.palette.primary.main,
        '&.dark': {
            color: theme.palette.secondary.main,
        }
    },
    title: (props: workInfoStylesProps) => ({
        fontFamily: props.fontFamily
    }),
    subtitle: {
        wordWrap: 'break-word',
        overflowWrap: 'break-word',
        margin: `${media(15, 25)} 0 ${media(22, 25)}`,
    },
    subtitleCard: {
        wordWrap: 'break-word',
        overflowWrap: 'break-word',
        fontWeight: "500",
    },
    description: {
        wordWrap: 'break-word',
        overflowWrap: 'break-word'
    },
    addressBox: {
        display: 'flex',
        alignItems: 'center',
        gridColumnGap: media(5, 8),
        marginTop: media(22, 25),
    },
    addressIcon: {
        fontSize: media(20, 22),
    },
    bgBox: {
        margin: "15px 0",
        background:'none',
        // '&.dark': {
        //     background: theme.palette.secondary.main,
        // }
    }
}));

interface arr {
    title: string,
    subtitle: string,
    image: string
}

const workInfoTitleFontSize = media(14, 16);

export const WorkInfo: FC = () => {
    const {data} = useUserContext();
    const isDarkMode = useAppSelector(selectIsDarkMode);
    const styles = useWorkInfoStyles({fontFamily: fonts[data.fontFamily].fontFamily});
    console.log(data, "data")
    return (
        <Box className={styles.wrapper}>
            <Typography textAlign="center" component="h1" fontSize={media(23, 28)} fontWeight="400"
                        className={clsx(styles.title, styles.workInfoTitle, {dark: isDarkMode})}>
                {data.title ? data.title : noDataText}
            </Typography>
            <Typography component="p" fontSize={workInfoTitleFontSize} fontWeight="400"
                        className={clsx(styles.subtitle, styles.workInfoTitle, {dark: isDarkMode})}>
                {data.subtitle ? data.subtitle : noDataText}
            </Typography>
            <Typography
                textAlign="center"
                component="p"
                fontSize={workInfoTitleFontSize}
                fontWeight="400"
                className={clsx(styles.description, styles.workInfoTitle, {dark: isDarkMode})}
                dangerouslySetInnerHTML={{__html: data.description ? data.description.replaceAll('\r\n', "<br />") : noDataText}}
            />
            <Box className={styles.addressBox}>
                {data.address ? <LocationOnIcon className={clsx(styles.addressIcon, styles.workInfoTitle, {dark: isDarkMode})}/> : noDataText}

                <Typography fontSize={workInfoTitleFontSize} fontWeight="400"
                            className={clsx(styles.workInfoTitle, {dark: isDarkMode})}>
                    {data.address ? data.address : noDataText}
                </Typography>
            </Box>
            {
                data.user_video && data.user_video.map((els:any) => (
                        <>
                            <iframe width="100%" height="308" style={{margin: '15px 0'}} src={els.image}
                                    title="YouTube video player" frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen/>
                        </>
                    ))
            }


            {
                data.user_images.map((el: arr, key: number) => {
                        return (
                            <>
                                <Box width="100%" className={clsx(styles.bgBox, {dark: isDarkMode})}>
                                    <Paper style={{
                                        background: `url(${el.image}) no-repeat center / cover`,
                                        height: "300px",
                                        objectFit: "fill"
                                    }}/>
                                </Box>

                                <Box style={{width: "95%"}}>
                                    <Typography component="h2"
                                                className={clsx(styles.subtitleCard, styles.workInfoTitle, {dark: isDarkMode})}>{el.title}</Typography>
                                    <Typography
                                        className={clsx(styles.subtitle, styles.workInfoTitle, {dark: isDarkMode})}>{el.subtitle}</Typography>
                                </Box>
                            </>
                        )
                    }
                )
            }
        </Box>
    )
}


const useSocialsStyles = makeStyles((theme: Theme) => ({
    wrapper: {
        display: 'grid',
        gridTemplateColumns: 'auto auto auto auto',
        gridColumnGap: media(5, 7),
        gridRowGap: media(8, 10),
        padding: `${media(7, 10)} 0`,
        '&.empty': {
            display: 'flex',
            justifyContent: 'center',
            gridTemplateColumns: 'unset',
            gridColumnGap: 'unset',
            gridRowGap: 'unset',
        }
    },
    link: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    iconBox: {
        width: media(45, 50),
        height: media(45, 50),
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '&.dark': {
            background: `${theme.palette.tertiary.main}!important`
        }
    },
    icon: {
        fontSize: media(20, 22),
        color: theme.palette.secondary.main,
    },
    iconLabel: {
        color: theme.palette.primary.main,
        marginTop: 4,
        '&.dark': {
            color: theme.palette.secondary.main,
        }
    },
    noSocialsTitle: {
        color: theme.palette.primary.main,
        '&.dark': {
            color: theme.palette.secondary.main,
        }
    }
}));


export const Socials: FC = () => {
    const styles = useSocialsStyles();
    const isDarkMode = useAppSelector(selectIsDarkMode);
    const {data} = useUserContext();
    const socials = useMemo(() => socialsOut(data), []);
    const outSocials = () => {
        if (!socials.length) {
            return (
                <Typography className={clsx(styles.noSocialsTitle, {dark: isDarkMode})} fontSize={media(20, 23)}
                            fontWeight="600">

                </Typography>
            )
        }
        return socials.map((elem: { link: string; label: string; color: string; icon: any }, i: Key) => (
            <MuiLink target="_blank" underline="none" className={styles.link} key={i} href={elem.link}>
                <Box sx={{background: elem.color}} className={clsx(styles.iconBox, {dark: isDarkMode})}>
                    <elem.icon className={styles.icon}/>
                </Box>
                <Typography className={clsx(styles.iconLabel, {dark: isDarkMode})} fontSize={media(13, 15)}
                            fontWeight="500">
                    {elem.label}
                </Typography>
            </MuiLink>
        ))
    }

    return (
        <Box className={clsx(styles.wrapper, {empty: !socials.length})}>
            {outSocials()}
        </Box>
    )
}
