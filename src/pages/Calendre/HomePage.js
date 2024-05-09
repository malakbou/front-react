import React from 'react';
import { Container, Typography } from '@material-ui/core';
import Calendar from '../../components/Calendrier/Calendar';
import Navbar from '../../components/Navbar/Navbar';
import caled from "./Calendre.module.css";


const HomePage = () => {
    return (
        <Container>
            {/* <Navbar /> */}
            <Calendar />
        </Container>
    );
};

export default HomePage;
