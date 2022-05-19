import {createSlice, PayloadAction} from '@reduxjs/toolkit';


type SliceState = {
    isLoading: boolean;
    isDarkMode: boolean;
    shareModalActive: boolean;
    shareModalUrl: string;
    simpleModalActive: boolean;
    simpleModalMessage: string;
    infoProfiloModal: boolean;
}

const initialState: SliceState = {
    isLoading: false,
    isDarkMode: true,
    shareModalActive: false,
    shareModalUrl: "",
    simpleModalActive: false,
    simpleModalMessage: "",
    infoProfiloModal: false
}

const main = createSlice({
    name: 'main',
    initialState,
    reducers: {
        setLoading(state, action: PayloadAction<boolean>){
            state.isLoading = action.payload;
        },
        setIsDarkMode(state, action: PayloadAction<boolean>){
            state.isDarkMode = action.payload;
        },
        setShareModalActive(state, action: PayloadAction<boolean>){
            state.shareModalActive = action.payload;
        },
        setShareModalUrl(state, action: PayloadAction<string>){
            state.shareModalUrl = action.payload;
        },
        setSimpleModalActive(state, action: PayloadAction<boolean>){
            state.simpleModalActive = action.payload;
        },
        setSimpleModalMessage(state, action: PayloadAction<string>){
            state.simpleModalMessage = action.payload;
        },
        setInfoProfiloModal(state, action: PayloadAction<boolean>){
            state.infoProfiloModal = action.payload;
        },
    },
})

export const {
    setLoading,
    setIsDarkMode,
    setShareModalActive,
    setShareModalUrl,
    setSimpleModalActive,
    setSimpleModalMessage,
    setInfoProfiloModal
} = main.actions

export default main.reducer;