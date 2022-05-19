import {media} from "../../../../utility/media";
import {Theme} from "@mui/material";


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


export const styles = (theme:Theme) => ({
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
        background: theme.palette.secondary.main,
    },
    input: {
        padding: `0 ${media(2, 4)}`,
        fontSize: media(13, 16),
        fontWeight: '400',
        color: '#828282',
    }
})