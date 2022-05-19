import {FC} from "react";
import {Box, Typography} from "@mui/material";
import {media} from "../../../../utility/media";
import {makeStyles} from "@mui/styles";
import {styles} from "./styles";


const useStyles = makeStyles({
    orderInfoItem: {
        width: '100%'
    },
    orderInfoPreview: {
        width: '100%'
    },
    orderInfoResult: {
        width: '100%'
    }
});

interface Props{
    preview: string;
    value: string;
}

const PreviewWithValue:FC<Props> = ({preview, value}:Props) => {
    const styles = useStyles();
    return (
        <Box className={styles.orderInfoItem}>
            <Box className={styles.orderInfoPreview}>
                <Typography sx={{textTransform: 'uppercase'}} fontSize={media(13, 15)} fontWeight="600" color="secondary">
                    {preview}
                </Typography>
            </Box>
            <Box className={styles.orderInfoResult}>
                <Typography fontSize={media(12, 14)} color="#828282" fontWeight="500">
                    {value}
                </Typography>
            </Box>
        </Box>
    )
}

export default PreviewWithValue;