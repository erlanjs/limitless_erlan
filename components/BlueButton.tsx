import {FC} from "react";
import {Button, Theme} from "@mui/material";
import {makeStyles} from "@mui/styles";
import clsx from "clsx";
import {media} from "../utility/media";



const useStyles = makeStyles((theme:Theme) => ({
    button: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: "linear-gradient(180deg, rgba(0, 40, 87, 0.5) 0%, rgba(0, 117, 255, 0.5) 100%)",
        borderRadius: 5,
        padding: `${media(2, 4)} ${media(15, 20)}`,
        textTransform: 'uppercase',
        color: theme.palette.secondary.main,
        fontWeight: '600',
        fontSize: media(16, 18),
    }
}));

interface Props{
    [key:string]: any;
}

const BlueButton:FC<Props> = ({children, className, ...props}) => {
    const styles = useStyles();
    return (
        <Button className={clsx(styles.button, props.className)} {...props}>
            {children}
        </Button>
    )
}

export default BlueButton;