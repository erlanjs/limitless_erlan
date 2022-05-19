import {FC, ReactNode, SyntheticEvent} from "react";
import {Tab, Tabs, Theme} from "@mui/material";
import clsx from "clsx";
import {makeStyles} from "@mui/styles";
import {media} from "../../utility/media";
import {selectIsDarkMode} from "../../store/selector/main";
import {useAppSelector} from "../../hooks/redux";
import {userTabList} from "../../constants/main";


const useStyles = makeStyles((theme:Theme) => ({
    tabs: {
        '& .MuiTabs-indicator': {
            height: '100%',
            zIndex: 0,
            background: theme.palette.septenary.main,
        },
        '&.dark .MuiTabs-indicator': {
            background: "#444A4E",
            boxShadow: "inset 0px 3px 4px rgba(0, 0, 0, 0.25)"
        },
    },
    tab: {
        flex: 1,
        background: theme.palette.secondary.main,
        padding: `${media(10, 15)} 0`,
        boxShadow: "0px 3px 8px 0px #00000040",
        '&.dark': {
            background: "#23292D",
            boxShadow: "inset 0px 3px 4px rgba(0, 0, 0, 0.25)"
        },
    },
    tabIcon: {
        zIndex: 1,
        color: theme.palette.primary.main,
        fontSize: media(22, 25),
        '&.dark': {
            color: theme.palette.secondary.main,
        }
    }
}))

interface Props{
    value: number;
    onChange: (event: SyntheticEvent<Element, Event>, value:any) => void,
}

export const UserTabs:FC<Props> = ({value, onChange}: Props) => {
    const styles = useStyles();
    const isDarkMode = useAppSelector(selectIsDarkMode);
    return (
        <Tabs className={clsx(styles.tabs, {dark: isDarkMode})} value={value} onChange={onChange} sx={{width: '100%', display: 'flex', flex: '1 1 1'}}>
            {userTabList.map((elem:any) => (
                <Tab key={elem.id} value={elem.id} className={clsx(styles.tab, 'tab__item', {dark: isDarkMode})} icon={<elem.icon className={clsx(styles.tabIcon, {dark: isDarkMode})} />} />
            ))}
        </Tabs>
    )
}

interface TabContentProps{
    id: number;
    children: ReactNode;
    selectedTab: number;
}


export const TabContent:FC<TabContentProps> = ({children, id, selectedTab}:TabContentProps) => {
    if(selectedTab !== id){
        return null;
    }
    return (
        <>
            {children}
        </>
    )
}