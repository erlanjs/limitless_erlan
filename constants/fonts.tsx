import {ReactNode} from "react";
import * as React from "react";


interface fontType {
    [key:string]: {
        fontFamily: string;
        link: (key:number) => ReactNode;
        fontWeight: number;
    }
}


export const fonts: fontType = {
    ABHAYA_LIBRE: {
        fontFamily: "'Abhaya Libre', serif",
        link: (key) => <link key={key} href="https://fonts.googleapis.com/css2?family=Abhaya+Libre&display=swap" rel="stylesheet" />,
        fontWeight: 400,
    },
    ALLERTA_STENCIL: {
        fontFamily: "'Allerta Stencil', sans-serif",
        link: (key) => <link key={key} href="https://fonts.googleapis.com/css2?family=Allerta+Stencil&display=swap" rel="stylesheet" />,
        fontWeight: 400
    },
    ANTON: {
        fontFamily: "'Anton', sans-serif",
        link: (key) => <link key={key} href="https://fonts.googleapis.com/css2?family=Anton&display=swap" rel="stylesheet" />,
        fontWeight: 400
    },
    BELLOTA_TEXT: {
        fontFamily: "'Bellota Text', cursive",
        link: (key) => <link key={key} href="https://fonts.googleapis.com/css2?family=Bellota+Text&display=swap" rel="stylesheet" />,
        fontWeight: 400
    },
    BLACK_OPS_ONE: {
        fontFamily: "'Black Ops One', cursive",
        link: (key) => <link key={key} href="https://fonts.googleapis.com/css2?family=Black+Ops+One&display=swap" rel="stylesheet" />,
        fontWeight: 400
    },
    CALLIGRAFFITTI: {
        fontFamily: "'Calligraffitti', cursive",
        link: (key) => <link key={key} href="https://fonts.googleapis.com/css2?family=Calligraffitti&display=swap" rel="stylesheet" />,
        fontWeight: 400
    },
    CHATHURA: {
        fontFamily: "'Chathura', sans-serif",
        link: (key) => <link key={key} href="https://fonts.googleapis.com/css2?family=Chathura&display=swap" rel="stylesheet" />,
        fontWeight: 400
    },
    CINZEL_DECORATIVE: {
        fontFamily: "'Cinzel Decorative', cursive",
        link: (key) => <link key={key} href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative&display=swap" rel="stylesheet" />,
        fontWeight: 400
    },
    CODYSTAR: {
        fontFamily: "'Codystar', cursive",
        link: (key) => <link key={key} href="https://fonts.googleapis.com/css2?family=Codystar&display=swap" rel="stylesheet" />,
        fontWeight: 400
    },
    FASTER_ONE: {
        fontFamily: "'Faster One', cursive",
        link: (key) => <link key={key} href="https://fonts.googleapis.com/css2?family=Codystar&family=Faster+One&display=swap" rel="stylesheet" />,
        fontWeight: 400
    },
    ICELAND: {
        fontFamily: "'Iceland', cursive",
        link: (key) => <link key={key} href="https://fonts.googleapis.com/css2?family=Iceland&display=swap" rel="stylesheet" />,
        fontWeight: 400
    },
    KANIT: {
        fontFamily: "'Kanit', sans-serif",
        link: (key) => <link key={key} href="https://fonts.googleapis.com/css2?family=Kanit&display=swap" rel="stylesheet" />,
        fontWeight: 400
    },
    MODAK: {
        fontFamily: "'Modak', cursive",
        link: (key) => <link key={key} href="https://fonts.googleapis.com/css2?family=Modak&display=swap" rel="stylesheet" />,
        fontWeight: 400
    },
    MONOFETT: {
        fontFamily: "'Monofett', cursive",
        link: (key) => <link key={key} href="https://fonts.googleapis.com/css2?family=Monofett&display=swap" rel="stylesheet" />,
        fontWeight: 400
    },
    MONOTON: {
        fontFamily: "'Monofett', cursive",
        link: (key) => <link key={key} href="https://fonts.googleapis.com/css2?family=Monoton&display=swap" rel="stylesheet" />,
        fontWeight: 400
    },
    NIXIE_ONE: {
        fontFamily: "'Nixie One', cursive",
        link: (key) => <link key={key} href="https://fonts.googleapis.com/css2?family=Nixie+One&display=swap" rel="stylesheet" />,
        fontWeight: 400,
    },
    PINYON_SCRIPT: {
        fontFamily: "'Pinyon Script', cursive",
        link: (key) => <link key={key} href="https://fonts.googleapis.com/css2?family=Pinyon+Script&display=swap" rel="stylesheet" />,
        fontWeight: 400
    },
    PLASTER: {
        fontFamily: "'Plaster', cursive",
        link: (key) => <link key={key} href="https://fonts.googleapis.com/css2?family=Plaster&display=swap" rel="stylesheet" />,
        fontWeight: 400
    },
    POIRET_ONE: {
        fontFamily: "'Poiret One', cursive",
        link: (key) => <link key={key} href="https://fonts.googleapis.com/css2?family=Poiret+One&display=swap" rel="stylesheet" />,
        fontWeight: 400
    },
    RATIONALE: {
        fontFamily: "'Rationale', sans-serif",
        link: (key) => <link key={key} href="https://fonts.googleapis.com/css2?family=Rationale&display=swap" rel="stylesheet" />,
        fontWeight: 400
    },
    SAIRA_STENCIL_ONE: {
        fontFamily: "'Saira Stencil One', cursive",
        link: (key) => <link key={key} href="https://fonts.googleapis.com/css2?family=Saira+Stencil+One&display=swap" rel="stylesheet" />,
        fontWeight: 400
    },
    STARDOS_STENCIL: {
        fontFamily: "'Stardos Stencil', cursive",
        link: (key) => <link key={key} href="https://fonts.googleapis.com/css2?family=Stardos+Stencil&display=swap" rel="stylesheet" />,
        fontWeight: 400
    },
    TEKO: {
        fontFamily: "'Teko', sans-serif",
        link: (key) => <link key={key} href="https://fonts.googleapis.com/css2?family=Teko&display=swap" rel="stylesheet" />,
        fontWeight: 400
    },
}

export const requiredFontFamilies:fontType = {
    KANIT: {
        fontFamily: "'Kanit', sans-serif",
        link: (key) => <link key={key} href="https://fonts.googleapis.com/css2?family=Kanit&display=swap" rel="stylesheet" />,
        fontWeight: 400
    },
    RALEWAY: {
        fontFamily: "'Raleway', sans-serif",
        link: (key) => <link key={key} href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700&display=swap" rel="stylesheet" />,
        fontWeight: 400
    },
    SAIRA_STENCIL_ONE: {
        fontFamily: "'Saira Stencil One', cursive",
        link: (key) => <link key={key} href="https://fonts.googleapis.com/css2?family=Saira+Stencil+One&display=swap" rel="stylesheet" />,
        fontWeight: 400
    },
}