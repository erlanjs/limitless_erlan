


export interface User{
    user_images: any,
    id: number;
    is_staff: boolean;
    is_active: boolean;
    is_superuser: boolean;
    avatarHidden: boolean;
    fullname: string | null;
    position: string | null;
    workPhone: string | null,
    "personalPhone": string | null,
    "workEmail": string | null,
    "email": string | null,
    "user_video": any ,
    "workWebsite": string | null,
    "otherWebsite": string | null,
    "fontFamily": string | null,
    "avatar": string | null,
    "bg": string | null,
    "uniqueId": string,
    "whatsapp": string | null,
    "instagram": string | null,
    "facebook": string | null,
    "linkedin": string | null,
    "telegram": string | null,
    "snapchat": string | null,
    "tiktok": string | null,
    "twitter": string | null,
    "wechat": string | null
    "youtube": string | null,
    "title": string | null,
    "welcome": string | null,
    "subtitle": string | null,
    "description": string | null,
    "address": string | null
}

export const UserModel = {
    password: {
        min: 6,
        max: 100,
    },
    title: {
        max: 200,
    },
    subtitle: {
        max: 200,
    },
}