import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {userTabList} from "../../constants/main";


type SliceState = {
    selectedTab: number;
}

const initialState: SliceState = {
    selectedTab: userTabList[0].id
}

const user = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setSelectedTab(state, action: PayloadAction<number>){
            state.selectedTab = action.payload;
        },
    },
})

export const {
    setSelectedTab
} = user.actions

export default user.reducer;