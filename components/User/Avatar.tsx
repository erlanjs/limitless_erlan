import {FC} from "react";
import {Box} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {media} from "../../utility/media";

interface Props{
    img: string;
}

const useStyles = makeStyles({
    box: {
        width: media(100, 130),
        height: media(100, 130),
        borderRadius: '50%',
        overflow: 'hidden',
    },
    img: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    }
});

const Avatar:FC<Props> = (props:Props) => {
    const styles = useStyles();
    return (
        <Box className={styles.box}>
            <img src={props.img} className={styles.img} alt={""}/>
        </Box>
    )
}

export default Avatar;
