import {FC, useEffect, useRef, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {selectAuth} from "../../../store/selector/auth";
import {Box, Container, Modal, Stack, Theme, Typography} from "@mui/material";
import {
    setImageResizeModalActive, setImageResizeModalData,
    setImageUploadModalActive,
    setImageUploadModalData
} from "../../../store/reducers/auth";
import {makeStyles} from "@mui/styles";
import ReactCrop from 'react-image-crop';
import {media} from "../../../utility/media";
import DarkButton from "./DarkButton";



const useStyles = makeStyles((theme:Theme) => ({
    wrapper: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cropInnerWrapper: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: `1px solid ${theme.palette.secondary.main}`,
    },
    crop: {
        width: '100%',
        maxHeight: '90%',
        '& .ReactCrop__crop-selection': {
            borderImageSource: 'none',
        },
        '& .ReactCrop__image': {
            width: '100%',
            height: '100%',
            objectFit: 'contain',
        }
    }
}));

const initialCrop = {aspect: 1}

const ImageResizeModal:FC = () => {
    const styles = useStyles();
    const [crop, setCrop] = useState<any>(initialCrop);
    const [cropInfo, setCropInfo] = useState<object | null>(null);
    const [image, setImage] = useState(null);
    const imageRef = useRef<HTMLImageElement | null>(null);
    const [loaded, setLoaded] = useState(null);
    const [error, setError] = useState(null);
    const authState = useAppSelector(selectAuth);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(authState.imageResizeModalActive){
            const reader = new FileReader();
            reader.readAsDataURL(authState.imageResizeModalData);
            reader.onerror = () => {
                setError("Something went wrong");
                setLoaded(true);
            }
            reader.onload = (e) => {
                setImage(e.target.result);
                setLoaded(true);
            }
        }else{
            setLoaded(false);
            setImage(null);
            setError(null);
        }
    }, [authState.imageResizeModalActive, authState.imageResizeModalData]);


    const handleClose = () => {
        dispatch(setImageResizeModalActive(false));
    }

    const onComplete = async () => {
        if (imageRef && crop.width && crop.height) {
            const scaleX = imageRef.current.naturalWidth / imageRef.current.width;
            const scaleY = imageRef.current.naturalHeight / imageRef.current.height;
            setCropInfo({
                left: `${Math.round(crop.x * scaleX)}`,
                top: `${Math.round(crop.y * scaleY)}`,
                right: `${Math.round(crop.width * scaleX) + Math.round(crop.x * scaleX)}`,
                bottom: `${Math.round(crop.height * scaleY) + Math.round(crop.y * scaleY)}`,
            });
        }else{
            setCropInfo(null);
        }
    }

    const onImageLoaded = (imgTag:HTMLImageElement) => {
        imageRef.current = imgTag;
    }

    const handleExit = () => {
        dispatch(setImageUploadModalData(null));
        dispatch(setImageResizeModalActive(false));
    }

    const handleFinishCropImage = () => {
        if(cropInfo){
            dispatch(setImageResizeModalActive(false));
            dispatch(setImageResizeModalData(null));
            dispatch(setImageUploadModalData({key: 'AVATAR_WITH_LTRB', data: {avatar: authState.imageResizeModalData, ...cropInfo}}));
            dispatch(setImageUploadModalActive(true));
            setImage(null);
            setCropInfo(null);
            setCrop(initialCrop);
            imageRef.current = null;

        }
    }

    const outImage = () => {
        if(loaded){
            if(error){
                return (
                    <Typography fontSize={media(17, 20)} fontWeight="500" color="secondary">
                        {error}
                    </Typography>
                )
            }
            return (
                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <Box sx={{paddingBottom: '100%', width: '100%', position: 'relative'}}>
                        <Box className={styles.cropInnerWrapper}>
                            <ReactCrop
                                className={styles.crop}
                                src={image}
                                crop={crop}
                                ruleOfThirds
                                onComplete={onComplete}
                                onChange={(newCrop:any) => setCrop(newCrop)}
                                onImageLoaded={onImageLoaded}
                                disabled={!(loaded && !error)}
                            />
                        </Box>
                    </Box>
                    <Stack marginTop={media(10, 15)} direction="row" spacing={2}>
                        <DarkButton onClick={handleExit}>Exit</DarkButton>
                        <DarkButton onClick={handleFinishCropImage}>Crop Image</DarkButton>
                    </Stack>
                </Box>
            )
        }
        return "Loading";
    }

    return (
        <Modal open={authState.imageResizeModalActive} onClose={handleClose}>
            <Box className={styles.wrapper}>
                <Container maxWidth="sm" disableGutters>
                    {outImage()}
                </Container>
            </Box>
        </Modal>
    )
}


export default ImageResizeModal;