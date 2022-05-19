import * as React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import createEmotionServer from '@emotion/server/create-instance';

import createEmotionCache from '../utility/createEmotionCache';
import {ServerStyleSheets} from "@mui/styles";
import {requiredFontFamilies} from "../constants/fonts";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {Object.entries(requiredFontFamilies).map((elem, i) =>  elem[1].link(i))}
            <link rel="icon" href="/images/logo.svg" />
          <link rel="stylesheet" type="text/css" charSet="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"/>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}


MyDocument.getInitialProps = async (ctx) => {
  const originalRenderPage = ctx.renderPage;
  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);
  const sheets = new ServerStyleSheets();
    ctx.renderPage = () =>
      originalRenderPage({
          // @ts-ignore
        enhanceApp: (App) => (props) => sheets.collect(<App emotionCache={cache} {...props} />),
      });

  const initialProps = await Document.getInitialProps(ctx);
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
      <style
          data-emotion={`${style.key} ${style.ids.join(' ')}`}
          key={style.key}
          dangerouslySetInnerHTML={{ __html: style.css }}
      />
  ));
  return {
    ...initialProps,
    styles: [...React.Children.toArray(initialProps.styles), ...emotionStyleTags],
  };
};
