import {FC, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {selectAuth} from "../store/selector/auth";
import {setLoading} from "../store/reducers/main";


interface Props {
    Children: any
}

const AuthLayout:FC<Props> = ({Children}:Props) => {
    const authState = useAppSelector(selectAuth);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if(authState.authInfoLoaded){
            dispatch(setLoading(false));
        }else{
            dispatch(setLoading(true));
        }
    }, [authState.authInfoLoaded]);

    if(authState.authInfoLoaded){
        if(!authState.isAuth){
            return null;
        }
    }else{
        return null;
    }
    return (
        <Children />
    )
}


export default AuthLayout;