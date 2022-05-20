import PhoneIcon from '@mui/icons-material/Phone';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import {ContactsInfo, Socials, WorkInfo} from "../components/pages/user/TabContent";
import {User} from "../models/user";
import TikTok from "../components/Icons/TikTok";
import {Instagram, FacebookOutlined, WhatsappRounded, LinkedIn, Telegram, Twitter, YouTube} from "@mui/icons-material";
import Snapchat from "../components/Icons/Snapchat";
import Email from "../components/Icons/Email";
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import {
    WhatsappShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    TelegramShareButton,
    TwitterShareButton,
} from 'react-share';
import Wechat from "../components/Icons/Wechat";



export const defaultBgImage = require('../assets/images/bg2.svg');

export const defaultAvatar = require('../assets/images/defauldAvatars.svg');
export const defaultAvatar2 = require('../assets/images/defauldAvatars1.svg');

export const userTabList = [
    {
        id: 1,
        icon: PhoneIcon,
    },
    {
        id: 2,
        icon: BusinessCenterIcon,
    },
    {
        id: 3,
        icon: ViewModuleIcon,
    },
]


export const userTabContent = [
    {
        id: 1,
        content: ContactsInfo,
    },
    {
        id: 2,
        content: WorkInfo,
    },
    {
        id: 3,
        content: Socials,
    }
]

const phoneLink = (phone:string | null) => `tel:${phone}`;

const emailLink = (email:string | null) => `mailto:${email}`;



interface contactsInfo{
    label:string;
    value:string;
    link:string;
    img: string
}

export const outContactsInfo = (data: User):contactsInfo[] => {
    const {personalPhone, workPhone, workEmail, email, workWebsite, otherWebsite} = data;

    return [
        {
            label: "MOBILE",
            value: personalPhone,
            link: phoneLink(personalPhone),
            img: require("../assets/images/MobilePhone.svg")
        },
        {
            label: "PHONE",
            value: workPhone,
            link: phoneLink(workPhone),
            img: require("../assets/images/MobileTel.svg")
        },
        {
            label: "EMAIL",
            value: workEmail,
            link: emailLink(workEmail),
            img: require("../assets/images/MobileSms.svg")
        },
        {
            label: "EMAIL",
            value: email,
            link: emailLink(email),
            img: require("../assets/images/MobileSms.svg")
        },
        {
            label: "WEBSITE",
            value: workWebsite,
            link: workWebsite,
            img: require("../assets/images/MobileWebsite.svg")
        },
        {
            label: "WEBSITE",
            value: otherWebsite,
            link: otherWebsite,
            img: require("../assets/images/MobileWebsite.svg")
        },
    ].filter(el => !!el.value);
}


export const socialsOut = (data:User):any => {
    const {
        instagram,
        facebook,
        tiktok,
        whatsapp,
        linkedin,
        telegram,
        wechat,
        snapchat,
        twitter,
        youtube
    } = data;

    return [
        {
            icon: Instagram,
            label: 'Instagram',
            color: '#515151',
            link: instagram,
        },
        {
            icon: FacebookOutlined,
            label: 'Facebook',
            color: '#515151',
            link: facebook,
        },
        {
            icon: TikTok,
            label: "Tik-Tok",
            color: '#515151',
            link: tiktok,
        },
        {
            icon: WhatsappRounded,
            label: 'Whatsapp',
            color: '#515151',
            link: whatsapp,
        },
        {
            icon: LinkedIn,
            label: 'Linkedin',
            color: '#515151',
            link: linkedin,
        },
        {
            icon: Telegram,
            label: 'Telegram',
            color: '#515151',
            link: telegram,
        },
        {
            icon: Snapchat,
            label: 'Snapchat',
            color: '#515151',
            link: snapchat,
        },
        {
            icon: Wechat,
            label: 'Wechat',
            color: '#515151',
            link: wechat,
        },
        {
            icon: Twitter,
            label: 'Twitter',
            color: '#515151',
            link: twitter,
        },
        {
            icon: YouTube,
            label: 'YouTube',
            color: '#515151',
            link: youtube
        }
    ].filter(el => !!el.link);
}


interface shareSocialType{
    shareBtn:any;
    icon:any
}

export const shareSocials:shareSocialType[] = [
    {
        shareBtn: FacebookShareButton,
        icon: FacebookOutlined,
    },
    {
        shareBtn: WhatsappShareButton,
        icon: WhatsappRounded,
    },
    {
        shareBtn: TelegramShareButton,
        icon: Telegram,
    },
    {
        shareBtn: TwitterShareButton,
        icon: Twitter,
    },
    {
        shareBtn: LinkedinShareButton,
        icon: LinkedIn,
    },
]

export const howToUseSteps = [
    {
        title: "Tap card to the phone",
    },
    {
        title: "Add your information",
    },
    {
        title: "Login & enter password",
    },
    {
        title: "Start share",
    }
]

export const currenciesTitle = {
    dollar: "$",
    dirham: "AED",
}

export const questions = [
    {
        id: 1,
        title: "What phones are compatible?",
            content: "Limitless Connection works with all modern smartphones <br /> hello world",
        isVideoSide: true,
    },
    {
        id: 2,
        title: "How to setup my Limitless Connection card?",
        content: `
            Once you receive your card, you can tap
            to activate and create your account. No<br /> 
            application needet and setup takes less <br />
            than 2 minutes.<br />
            At the time of your order, we only need to know what to print on your card. Everything else, you get to add to your account yourself.
        `,
        isVideoSide: true,
    },


    {
        id: 3,
        title: "What material is Limitless Connection card?",
        content: `
            Limitless Connection Card  made with  stainless steel. Our cards are sturdy and yet luxury. In addition, the gold, silver, rose gold and black matte finish adds  a premium feel that is incomparable to most cards in the market today.
        `,
    },
    {
        id: 4,
        title: "Can I design my Limitless Connection card?",
        content: `
            Yes! We have an amazing graphic design team in-house that will ensure your logo and artwork translate perfectly into the card. Design your card here

            Shortly after you place your order, we will provide you with mockup designs to review and choose from. Please make sure you provide us with high quality files in Vector, Ai, PSD, EPS, PDF, JPEG or PNG for the best result possible.
            
            Design limitations:<br />
            
            We can print by laser Silver on matte black cards<br />
            You can only design the front of your card<br />
        `
    },
    {
        id: 5,
        title: "What is the return policy?",
        content: `
           You can get a full refund within 30 days of your purchase date. You don’t need to ship your card back to us, we will deactivate your Limitless Connection card remotely.
            You can get a full refund within 30 days of your purchase date. You don’t need to ship your card back to us, we will deactivate your Limitless Connection card remotely.
        `
    },
    {
        id: 6,
        title: "How long is the delivery?",
        content: `
            Orders are processed daily. <br />
            Dubai-Sharjah-Ajman          2-10 hours<br />
            Abu Dhabi-Ras Al Khaimah   1-2 days<br />
            Umm Al Quwain Fujairah      2-3 days<br />
        `
    },
    {
        id: 7,
        title: "What is Limitless Connection’s privacy policy?",
        content: `
            We don’t ask our users for any sensitive information nor their social media logins. You can share as much or as little information as you’d like on your Limitless Connection profile. Limitless Connection profiles are public landing pages that hosts your information and make it easily sharable to people you meet.<br /><br />
            Read our Privacy Policy and Terms of Agreement
        `
    },
    {
        id: 8,
        title: "Any additional charges?",
        content: `
            No! <br />
            Unlike other brands, we have one time payment option only.
        `
    }
]

export const buyCardCounts = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10
]


type footerLinkItem = {
    isRelativePath: boolean;
    link: string;
    title: string;
}

export const footerLinks:footerLinkItem[] = [

    {
        isRelativePath: false,
        link: `${process.env.BASE_URL}/files/LC%20INSTUCTION.pdf`,
        title: "MORE INFORMATION",
    },
    // {
    //     isRelativePath: false,
    //     link: `${process.env.BASE_URL}/files/terms-of-service.pdf`,
    //     title: "Terms of Service ",
    // },
]


type socialType = {
    icon: any;
    link: string;
    color: string;
    title: string
}

export const socials:socialType[] = [
    {
        icon: WhatsappRounded,
        link: "https://wa.me/971528906238",
        color: "#0FFE68",
        title: "+971528906238"
    },
    {
        icon: Email,
        link: "mailto:support@limitless-connection.com",
        color: "#FFFFFF",
        title: "support@limitless-connection.com"
    },

]

export const modalColor = "#272E32";

export const noDataText = "";
