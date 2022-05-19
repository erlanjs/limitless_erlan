import {FC, ReactNode} from 'react';
import Header from "../components/Header";
import {Container} from "@mui/material";
import {makeStyles} from "@mui/styles";
import Footer from '../components/Footer';


const useStyles = makeStyles({
    container: {
        minHeight: '100vh',
        background: "linear-gradient(179.32deg, #334670 0.07%, rgba(125, 125, 125, 0.75) 102.09%, #919191 102.1%)",
        scrollBehavior: "smooth"
    }
});


interface Props {
    children: ReactNode;
    showFooter?: boolean;
}

const MainLayout: FC<Props> = ({children, showFooter}:Props) => {
    const styles = useStyles();

    return (
        <Container maxWidth={false} disableGutters className={styles.container}>
            <Header />
            {children}
            {showFooter && (
                <Footer />
            )}
        </Container>
    )
}


export default MainLayout;