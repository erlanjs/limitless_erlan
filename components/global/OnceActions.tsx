import {FC, useEffect} from "react";
import {useAppDispatch} from "../../hooks/redux";
import {check} from "../../actions/auth";
import {useRouter} from "next/router";
import {setLoading} from "../../store/reducers/main";
import {getCards} from "../../actions/card";


const OnceActions:FC = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    useEffect(() => {
        dispatch(check());
        dispatch(getCards());
    }, []);

    useEffect(() => {
        router.events.on('routeChangeStart', () => dispatch(setLoading(true)));
        router.events.on('routeChangeComplete', () => dispatch(setLoading(false)));
        router.events.on('routeChangeError', () => dispatch(setLoading(false)));

        return () => {
            router.events.off('routeChangeStart', () => dispatch(setLoading(true)));
            router.events.off('routeChangeComplete', () => dispatch(setLoading(true)));
            router.events.off('routeChangeError', () => dispatch(setLoading(true)));
        };
    }, [router]);

    return null;
}



export default OnceActions;