import {FC} from "react";
import {Box, Typography, Theme} from "@mui/material";
import {media} from "../../../../utility/media";
import {makeStyles} from "@mui/styles";
import {styles} from "./styles";
import {useField} from "formik";
import clsx from "clsx";


const orderInfoResult = {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    border: 'none',
    outline: 'none',
}

const useStyles = makeStyles(theme => ({
    orderInfoItem: {
        textAlign:'center',
        height: media(38, 42),
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        background: "black",
        borderRadius: 5,
        padding: 4,
        margin: '10px 0'
    },
    orderInfoPreview: {
        minWidth: media(140, 170),
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: `0 ${media(4, 7)}`,
    },
    orderInfoResult: {
        ...orderInfoResult,
        background: "red",
    },
    input: {
        padding: `0 ${media(2, 4)}`,
        fontSize: media(13, 16),
        fontWeight: '400',
        color: '#828282',
    }
}));

interface Props{
    preview: string;
    [key:string]:any;
}

const PreviewWithValueInput:FC<Props> = ({preview, ...props}:Props) => {
    const [field, meta] = useField(props.name);
    const styles = useStyles();
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            justifyContent: 'flex-start',
        }}>
            <Box className={styles.orderInfoItem}>
                <Box className={styles.orderInfoPreview}>
                    <Typography sx={{textTransform: 'uppercase'}} fontSize={media(13, 15)} fontWeight="600" color="secondary">
                        {preview}
                    </Typography>
                </Box>
                <input className={clsx(styles.orderInfoResult, styles.input)} {...field} {...props} />
            </Box>
            {!!(meta.touched && meta.error) && (
                <Typography fontSize={media(14, 16)} fontWeight="600" color="secondary">
                    {meta.error}
                </Typography>
            )}
        </Box>
    )
}

export default PreviewWithValueInput;