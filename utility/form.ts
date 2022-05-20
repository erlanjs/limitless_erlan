import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TelegramIcon from '@mui/icons-material/Telegram';
import SnapchatIcon from "../components/Icons/Snapchat";
import TikTokIcon from "../components/Icons/TikTok";
import TwitterIcon from '@mui/icons-material/Twitter';
import WechatIcon from '../components/Icons/Wechat';


type Values = {
    [key:string]:string;
}

type checkTheDifferenceType = {
    isChanged: boolean;
    changedValues: {
        [key:string]:string
    }
}

export const checkTheDifference = (oldValues:Values, newValues:Values):checkTheDifferenceType => {
    const result: checkTheDifferenceType = {
        isChanged: false,
        changedValues: {}
    }
    for(let i in oldValues){
        for(let j in newValues){
            if(i === j && oldValues[i] !== newValues[j]){
                result.isChanged = true;
                result.changedValues[i] = newValues[j];
            }
        }
    }
    return result;
}


type socialsKeyType = {
    [key:string]: {
        placeholder: string;
        save: (value:string) => string | null,
        out: (value:string) => string,
        icon: any
    }
}

export const socials: socialsKeyType = {
    whatsapp: {
        icon: WhatsAppIcon,
        placeholder: "971",
        save: (value) => value ? `https://wa.me/${value}` : null,
        out: (value) => value ? value.replace('https://wa.me/', "") : ""
    },
    instagram: {
        icon: InstagramIcon,
        placeholder: "Nickname",
        save: (value) => value ? `https://www.instagram.com/${value}` : null,
        out: (value) => value ? value.replace('https://www.instagram.com/', "") : ""
    },
    facebook: {
        icon: FacebookIcon,
        placeholder: "Paste link",
        save: (value) => value ? value : null,
        out: (value) => value ? value : "",
    },
    linkedin: {
        icon: LinkedInIcon,
        placeholder: "Paste link",
        save: (value) => value ? value : null,
        out: (value) => value ? value : "",
    },
    youtube: {
        icon: YouTubeIcon,
        placeholder: "Paste link",
        save: (value) => value ? value : null,
        out: (value) => value ? value : "",
    },
    telegram: {
        icon: TelegramIcon,
        placeholder: "Nickname",
        save: (value) => value ? `https://t.me/${value}` : null,
        out: (value) => value ? value.replace('https://t.me/', "") : ""
    },
    wechat: {
        icon: WechatIcon,
        placeholder: "Nickname",
        save: (value) => value ? `https://wechat.com/${value}` : null,
        out: (value) => value ? value.replace('https://wechat.com/', "") : ""
    },
    snapchat: {
        icon: SnapchatIcon,
        placeholder: "Nickname",
        save: (value) => value ? `https://snapchat.com/${value}` : null,
        out: (value) => value ? value.replace('https://snapchat.com/', "") : ""
    },
    tiktok: {
        icon: TikTokIcon,
        placeholder: "Nickname",
        save: (value) => value ? `https://tiktok.com/${value}` : null,
        out: (value) => value ? value.replace('https://tiktok.com/', "") : ""
    },
    twitter: {
        icon: TwitterIcon,
        placeholder: "Nickname",
        save: (value) => `https://twitter.com/${value}`,
        out: (value) => value ? value.replace('https://twitter.com/', "") : ""
    }
}

export const outValues = (values:Values) => {
    const result:Values = {}
    Object.entries(values).forEach((elem) => {
        result[elem[0]] = socials[elem[0]].out(elem[1]);
    });
    return result;
}

export const saveValues = (values:Values) => {
    const result:Values = {}
    Object.entries(values).forEach((elem, i) => {
        result[elem[0]] = socials[elem[0]].save(elem[1]);
    });
    return result;
}


export const objectToFormData = (object:any) => {
    const form = new FormData();
    for(let i in object){
        form.append(i, object[i]);
    }
    return form;
}