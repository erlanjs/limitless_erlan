import type {NextPage} from 'next'
import MainLayout from "../layouts/Main";
import dynamic from 'next/dynamic'
import Head from 'next/head'
const Banner = dynamic(() => import('../components/pages/home/Banner'));
const EasyToUse = dynamic(() => import('../components/pages/home/EasyToUse'));
const Cards = dynamic(() => import('../components/pages/home/Cards'));
const About = dynamic(() => import('../components/pages/home/About'));
const INTERFACE = dynamic(() => import('../components/pages/home/INTERFACE'));
const Information = dynamic(() => import('../components/pages/home/information'));
const VideoYou = dynamic(() => import('../components/pages/home/VideoYou'));
const Forms = dynamic(() => import('../components/pages/home/Forms'));

const Home: NextPage = () => {


    return (
        <MainLayout showFooter={true}>
            <Banner/>
            <EasyToUse/>
            <INTERFACE/>
            <Cards/>
            <Information/>
            <VideoYou/>
            <About/>
            <Forms/>
        </MainLayout>
    )
}

export default Home;
