import {ContactsInfo, Socials, WorkInfo} from "../components/pages/profile/TabContent";
import dynamic from "next/dynamic";



type ProfileTabContentType = {
    id: number;
    content: any
}

export const profileTabContent: ProfileTabContentType[] = [
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


type uploadPhotoType = {
    [key:string]:string;
}

export const uploadPhotoTypes:uploadPhotoType[] = [
    {

    }
]