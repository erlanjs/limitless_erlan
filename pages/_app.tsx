import "../polyfill";
import * as React from 'react';
import type { AppProps } from 'next/app';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import {Provider as StoreProvider} from "react-redux";
import 'react-image-crop/dist/ReactCrop.css';
import "../style/style.css"


import '../utility/modules';
import createEmotionCache from '../utility/createEmotionCache';
import {theme} from "../utility/theme";
import {setupStore} from "../store/reducer";
import GlobalStyles from "../components/global/Styles";
import ShareModal from "../components/ShareModal";
import LoginModal from "../components/LoginModal";
import Loading from "../components/global/Loading";
import OnceActions from "../components/global/OnceActions";
import SimpleModal from "../components/SimpleModal";
import {DefaultSeo} from "next-seo";
import {metaTags} from "../constants/seo";

export interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();

export const store = setupStore();

const MyApp: React.FunctionComponent<MyAppProps> = (props: MyAppProps) => {
    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

    return (
        <CacheProvider value={emotionCache}>
            <DefaultSeo {...metaTags} />
            <ThemeProvider theme={theme}>
                <StoreProvider store={store}>
                    <CssBaseline />
                    <Component {...pageProps} />
                    <GlobalStyles />
                    <ShareModal />
                    <LoginModal />
                    <SimpleModal />
                    <Loading />
                    <OnceActions />
                </StoreProvider>
            </ThemeProvider>
        </CacheProvider>
    );
};

export default MyApp;