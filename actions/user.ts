import api from "../http/api";
import {ERRORS, RESET_PASSWORD_ERRORS} from "../constants/errors";
import {User} from "../models/user";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {setSimpleModalActive, setSimpleModalMessage} from "../store/reducers/main";
import {setAuth, setProfile} from "../store/reducers/auth";
import authApi from "../http/authApi";
import {objectToFormData} from "../utility/form";


export interface fetchUserInterface {
    success: boolean;
    data: User | null;
    error: null | string;
    notFound: boolean;
}

export const fetchUser = async (uniqueId: string | string[] | undefined) => {
    const result: fetchUserInterface = {
        success: false,
        data: null,
        error: null,
        notFound: false
    }
    try {
        const {data} = await api.get(`users/${uniqueId}`);
        result.data = data;
        result.success = true;
    } catch (e: any){
        result.success = false;
        if(e.response){
            if(e.response.status === 404){
                result.notFound = true;
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

export const forgotPassword = createAsyncThunk(
    'user/forgot-password',
    async (uniqueId:string, {dispatch}) => {
        const result = {
            error: false,
            success: false
        }
        try {
            await api.post('users/reset-password/', {uniqueId});
            result.success = true;
            dispatch(setSimpleModalMessage("We have sent a link to restore access to your account by email!"));
        } catch (e:any){
            if(e.response){
                if(e.response.status === 400 && e.response.data.error && e.response.data.code === 'EMAIL_NOT_SET'){
                    dispatch(setSimpleModalMessage(ERRORS['EMAIL_NOT_SET']));
                }else{
                    result.error = true;
                }
            }else if(e.request && !e.response){
                result.error = true;
            }else{
                result.error = true;
            }
        } finally {
            if(result.error){
                dispatch(setSimpleModalActive(false));
            }else{
                dispatch(setSimpleModalActive(true));
            }
        }
        return result;
    }
)


interface resetPasswordBody {
    password: string;
    resetPasswordUUID: string | string[];
}

interface resetPasswordData{
    success: boolean;
    message: string;
}

export const resetPassword = createAsyncThunk(
    'user/reset-password',
    async (body:resetPasswordBody, {dispatch}) => {
        const result: resetPasswordData = {
            success: false,
            message: "",
        }
        try {
            const {data} = await api.patch(`users/reset-password/${body.resetPasswordUUID}/`, {password: body.password});
            localStorage.setItem('access', data.access);
            localStorage.setItem('refresh', data.refresh);
            dispatch(setProfile(data.profile));
            dispatch(setAuth(true));
            result.success = true;
        } catch (e:any){
            result.success = false;
            if(e.response){
                if(e.response.status === 400 && e.response.data.error){
                    if(e.response.data.code === 'NOT_FOUND'){
                        result.message = RESET_PASSWORD_ERRORS['NOT_FOUND'];
                    }else if(e.response.data.code === 'EXPIRED'){
                        result.message = RESET_PASSWORD_ERRORS['EXPIRED'];
                    }else{
                        result.message = ERRORS['ERROR_500'];
                    }
                }else{
                    result.message = ERRORS['ERROR_500'];
                }
            }else if(e.request && !e.response){
                result.message = ERRORS['ERROR_500'];
            }else{
                result.message = ERRORS['ERROR_500'];
            }
        }
        return result;
    }
)


export const checkResetPasswordUUID = async (uuid: string | string[]) => {
    const result = {
        success: false,
        message: "",
    }
    try {
        await api.get(`users/reset-password/${uuid}/`);
        result.success = true;
    } catch (e:any){
        result.success = false;
        if(e.response){
            if(e.response.status === 400 && e.response.data.error){
                if(e.response.data.code === 'NOT_FOUND'){
                    result.message = RESET_PASSWORD_ERRORS['NOT_FOUND'];
                }else if(e.response.data.code === 'EXPIRED'){
                    result.message = RESET_PASSWORD_ERRORS['EXPIRED'];
                }else{
                    result.message = ERRORS['ERROR_500'];
                }
            }else{
                result.message = RESET_PASSWORD_ERRORS['NOT_FOUND'];
            }
        }else if(e.request && !e.response){
            result.message = ERRORS['ERROR_500'];
        }else{
            result.message = ERRORS['ERROR_500'];
        }
    }
    return result;
}


type updateProfileType = {
    uniqueId: string;
    [key:string]:string;
}

export const updateProfile = createAsyncThunk(
    'auth/update/',
    async ({uniqueId, ...body}:updateProfileType, {dispatch}) => {
        const result = {
            success: false,
            message: ""
        }
        try {
            const formData = objectToFormData({uniqueId, ...body});
            const {data} = await authApi.patch(`users/${uniqueId}/`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
            dispatch(setProfile(data));
            result.success = true;
        } catch (e:any){
            result.message = ERRORS['ERROR_500'];
            result.success = false;
        }
        return result;
    }
)

type ResizeAvatarBodyType = {
    left: number;
    top: number;
    right: number;
    bottom: number;
    avatar: any;
}

export const resizeAvatar = createAsyncThunk(
    'auth/avatar/',
    async (body:ResizeAvatarBodyType, {dispatch}) => {
        const result = {
            success: false,
            message: ""
        }
        try {
            const formData = objectToFormData(body);
            const {data} = await authApi.patch(`users/avatar/`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
            dispatch(setProfile(data));
            result.success = true;
        } catch (e:any){
            result.message = ERRORS['ERROR_500'];
            result.success = false;
        }
        return result;
    }
)
