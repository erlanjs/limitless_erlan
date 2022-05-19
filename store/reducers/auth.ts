import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User} from "../../models/user";
import {profileTabContent} from "../../constants/profile";


type SliceState = {
    isAuth: boolean;
    authInfoLoaded: boolean;
    profile: User | null;
    loginModalActive: boolean,
    uniqueIdForLogin: string;
    modalWithFormActive: boolean;
    modalWithFormData: string;
    selectedTab: number;
    imageUploadModalActive: boolean;
    imageUploadModalData: any;
    imageHiden: boolean;
    imageResizeModalActive: boolean;
    imageResizeModalData: any,
    usersImageModal: boolean,
    usersUploadImageModal: boolean,
    usersUploadVideoModal: boolean,
    uploadCard: any | [],
    imagesCard: any ,
    videosCard: any ,
}

const initialState: SliceState = {
    isAuth: false,
    authInfoLoaded: false,
    profile: null,
    loginModalActive: false,
    uniqueIdForLogin: "",
    modalWithFormActive: false,
    modalWithFormData: "",
    selectedTab: profileTabContent[0].id,
    imageUploadModalActive: false,
    imageUploadModalData: {
        key: null,
        data: null,
    },
    imageResizeModalActive: false,
    imageResizeModalData: null,
    usersImageModal: false,
    imageHiden: false,
    usersUploadImageModal: false,
    usersUploadVideoModal: false,
    uploadCard: [],
    imagesCard: [],
    videosCard: [],
}

const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth(state, action: PayloadAction<boolean>){
            state.isAuth = action.payload;
        },
        setAuthInfoLoaded(state, action: PayloadAction<boolean>){
            state.authInfoLoaded = action.payload;
        },
        setProfile(state, action: PayloadAction<User | null>){
            state.profile = action.payload;
        },
        setLoginModalActive(state, action: PayloadAction<boolean>){
            state.loginModalActive = action.payload;
        },
        setUniqueIdForLogin(state, action: PayloadAction<string>){
            state.uniqueIdForLogin = action.payload;
        },
        setModalWithFormActive(state, action: PayloadAction<boolean>){
            state.modalWithFormActive = action.payload;
        },
        setModalWithFormData(state, action: PayloadAction<string>){
            state.modalWithFormData = action.payload;
        },
        setSelectedTab(state, action: PayloadAction<number>){
            state.selectedTab = action.payload;
        },
        setImageUploadModalActive(state, action: PayloadAction<boolean>){
            state.imageUploadModalActive = action.payload;
        },
        setImageUploadModalData(state, action: PayloadAction<any>){
            state.imageUploadModalData = action.payload;
        },
        setImageResizeModalActive(state, action: PayloadAction<boolean>){
            state.imageResizeModalActive = action.payload;
        },
        setImageResizeModalData(state, action: PayloadAction<any>){
            state.imageResizeModalData = action.payload;
        },
        setImageHiden(state, action: PayloadAction<boolean>){
                state.profile.avatarHidden =  action.payload;
        },
        setUsersImageModal(state, action: PayloadAction<boolean>){
            state.usersImageModal =  action.payload;
        },
        setUploadImageModal(state, action: PayloadAction<boolean>){
            state.usersUploadImageModal =  action.payload;
        },
        setUploadVideoModal(state, action: PayloadAction<boolean>){
            state.usersUploadVideoModal =  action.payload;
        },
        setUploadCards(state, action: PayloadAction<any>){
            const findProduct = state?.uploadCard?.find((el:any) => el.card.id === action.payload.card.id)
            if (findProduct){
                return {...state , uploadCard: state.uploadCard.map((el:any) => el.card.id === action.payload.card.id ?
                        {...el , count: action.payload.count} : el)
                }
            }
            state.uploadCard = [...state.uploadCard , action.payload]  ;
        },
        setImagesCard(state, action: PayloadAction<any>){
            state.imagesCard =  action.payload;
        },
        setVideosCard(state, action: PayloadAction<any>){
            state.videosCard =  action.payload;
        },
    },
})

export const {
    setAuth,
    setAuthInfoLoaded,
    setUploadCards,
    setProfile,
    setLoginModalActive,
    setUniqueIdForLogin,
    setModalWithFormActive,
    setModalWithFormData,
    setSelectedTab,
    setImageResizeModalActive,
    setImageResizeModalData,
    setImageUploadModalActive,
    setImageUploadModalData,
    setImageHiden,
    setUsersImageModal,
    setUploadImageModal,
    setUploadVideoModal,
    setImagesCard,
    setVideosCard
} = auth.actions;

export default auth.reducer;
