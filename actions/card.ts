import {createAsyncThunk} from "@reduxjs/toolkit";
import api from "../http/api";
import {setCards, setCardsError, setCardsLoaded} from "../store/reducers/card";
import {ERRORS} from "../constants/errors";


export const getCards = createAsyncThunk(
    'card/list',
    async (body, {dispatch}) => {
        dispatch(setCardsLoaded(false));
        dispatch(setCards(null));
        dispatch(setCardsError(null));
        try {
            const {data} = await api.get('cards/');
            dispatch(setCards(data));
        } catch(e:any){
            dispatch(setCardsError(ERRORS['ERROR_500']));
        } finally {
            dispatch(setCardsLoaded(true));
        }
    }
)


type OrderCardResultType = {
    success: boolean;
    message: string;
}

type OrderCardBody = {
    order: {
        count: number;
        id: number;
    }[];
    phone: string;
    location: string;
}

export const orderCard = createAsyncThunk(
    'card/order/',
    async (body:OrderCardBody, _):Promise<OrderCardResultType> => {
        const result:OrderCardResultType = {
            success: false,
            message: ""
        }
        try {
            await api.post('cards/order/', body);
            result.success = true;
            result.message = "Your order has been successfully sent";
        } catch(e:any){
            result.success = false;
            result.message = ERRORS['ERROR_500'];
        }
        return result;
    }
)