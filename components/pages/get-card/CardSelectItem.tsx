import {FC, useState} from "react";
import {Box, IconButton, MenuItem, Select, Theme} from "@mui/material";
import {buyCardCounts} from "../../../constants/main";
import {makeStyles} from "@mui/styles";
import {media} from "../../../utility/media";
import {Card} from "../../../models/card";
import {useField} from "formik";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import clsx from "clsx";


const useStyles = makeStyles((theme:Theme) => ({
    cardSelectItem: {
        width: '100%',
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridRowGap: media(6, 8),
    },
    cardSelectTop: {
        width: '100%',
        padding: `${media(3, 5)} 0`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectHolder: {
        display: 'grid',
        alignItems: 'center',
        gridTemplateColumns: '1fr 1fr',
        background: theme.palette.primary.main,
        padding: 5,
    },
    selectBox: {
        height: '100%',
    },
    select: {
        width: '100%',
        background: 'white',
        height: media(23, 28),
        '& .MuiSvgIcon-root': {
            display: 'none',
        },
        '& .MuiSelect-select': {
            width: '100%',
            height: 'unset',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxSizing: 'border-box',
            padding: `${media(3, 5)} ${media(4, 6)}!important`,
            minHeight: 0,
        },
    },
    iconHolder: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconButton: {
        padding: 0,
    },
    icon: {
        color: theme.palette.secondary.main,
        fontSize: media(24, 27),
        transform: 'rotate(0deg)',
        transition: '0.3s ease',
        '&.rotated': {
            transform: 'rotate(180deg)',
        }
    }
}));


interface Props{
    elem:Card
}

const CardSelectItem:FC<Props> = ({elem}:Props) => {
    const styles = useStyles();
    const [open ,setOpen] = useState(false);
    const [field, _, actions] = useField("order");

    const outSelectValue = () => {
        const inOrder = field.value.find((el:any) => el.id === elem.id);
        if(inOrder){
            return inOrder.count;
        }
        return 0;
    }

    const handleChange = (e:any) => {
        const value = e.target.value;
        const inOrder = field.value.find((el:any) => el.id === elem.id);
        if(inOrder){
            actions.setValue( [...field.value.filter((el:any) => el.id !== elem.id), {
                id: elem.id,
                count: value
            }]);
        }else{
            actions.setValue([...field.value, {id: elem.id, count: value}]);
        }
    }

    const handleClose = () => {
        setOpen(false);
    }
    const handleOpen = () => {
        setOpen(true);
    }

    return (
        <Box className={styles.cardSelectItem}>
            <Box className={styles.cardSelectTop} sx={{background: elem.color, color: elem.text_color}}>
                {elem.title}
            </Box>
            <Box className={styles.selectHolder}>
                <Box className={styles.selectBox}>
                    <Select
                        open={open}
                        onClose={handleClose}
                        onOpen={handleOpen}
                        autoWidth
                        className={styles.select}
                        value={outSelectValue()}
                        onChange={handleChange}
                        sx={{color: elem.color}}
                    >
                        {buyCardCounts.map((elem, i:number) => (
                            <MenuItem key={i} value={elem}>{elem}</MenuItem>
                        ))}
                    </Select>
                </Box>
                <Box className={styles.iconHolder} >
                    <IconButton onClick={handleOpen} className={styles.iconButton}>
                        <KeyboardArrowDownIcon className={clsx(styles.icon, {rotated: open})} />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    )
}


export default CardSelectItem;