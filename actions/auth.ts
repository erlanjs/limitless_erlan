import {createAsyncThunk} from "@reduxjs/toolkit";
import api from "../http/api";
import {ERRORS} from "../constants/errors";
import {setAuth, setAuthInfoLoaded, setProfile} from "../store/reducers/auth";


interface loginResultType {
    success: boolean;
    error: string;
}

interface loginBody{
    password:string;
    uniqueId:string;
}


export const login = createAsyncThunk(
    'auth/login',
    async (body:loginBody, {dispatch}) => {
        const result:loginResultType = {
            success: false,
            error: "",
        }
        try {
            const {data} = await api.post('users/login/', body);
            localStorage.setItem('access', data.access);
            localStorage.setItem('refresh', data.refresh);
            dispatch(setProfile(data.profile));
            dispatch(setAuth(true));
            result.success = true;
        } catch(e:any){
            result.success = false;
            if(e.response){
                if(e.response.status === 400 && e.response.data.error){
                    if(e.response.data.code === 'DOES_NOT_EXIST') {
                        result.error = ERRORS['LOGIN_USER_404'];
                    }else if(e.response.data.code === 'WRONG_PASSWORD'){
                        result.error = ERRORS['WRONG_PASSWORD'];
                    }else{
                        result.error = ERRORS['ERROR_500'];
                    }
                }else{
                    result.error = ERRORS['ERROR_500'];
                }
            }else if(e.request && !e.response){
                result.error = ERRORS['ERROR_500'];
            }else{
                result.error = ERRORS['ERROR_500'];
            }
        }
        return result;
    }
)


export const check = createAsyncThunk(
    'auth/login',
    async (_, {dispatch}) => {
        const refresh = localStorage.getItem('refresh');
        if(!refresh){
            dispatch(setAuth(false));
            dispatch(setAuthInfoLoaded(true));
            return null;
        }
        try {
            const {data} = await api.post('users/check/', {refresh});
            localStorage.setItem('access', data.access);
            localStorage.setItem('refresh', data.refresh);
            dispatch(setProfile(data.profile));
            dispatch(setAuth(true));
        } catch (e){
            dispatch(setAuth(false));
        } finally {
            dispatch(setAuthInfoLoaded(true));
        }
    }
)
