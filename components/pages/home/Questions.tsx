import {FC, useState} from "react";
import {Accordion, AccordionDetails, AccordionSummary, Box, Container, Typography} from "@mui/material";
import {media} from "../../../utility/media";
import {makeStyles} from "@mui/styles";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const containerPY = media(30, 45);

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: containerPY,
        paddingBottom: containerPY,
    },
});

const Questions:FC = () => {
    const styles = useStyles();
    const [expanded, setExpanded] = useState(0);

    const handleChange = (value:number) => () => {
        setExpanded(value);
    }

    return (
        <Container maxWidth="md" className={styles.container}>
            <Typography fontSize={media(30, 36)} fontWeight="600" color="secondary">
                Frequently Asked Questions
            </Typography>
            <Box>
                <Accordion expanded={expanded === 0} onChange={handleChange(1)}>
                    <AccordionSummary
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <ExpandMoreIcon />
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>
                            General settings
                        </Typography>
                        <Typography sx={{ color: 'text.secondary' }}>I am an accordion</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
                            Aliquam eget maximus est, id dignissim quam.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </Box>
        </Container>
    )
}

export default Questions;