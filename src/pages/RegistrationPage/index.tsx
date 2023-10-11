import React from 'react';
import {Box, Container, Typography} from "@mui/material";
import RegistrationForm from "../../features/RegistrationForm";
import {Navigate} from "react-router";
import {useAuth} from "../../shared/hooks/useAuth";

const RegistrationPage = () => {

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Registration
                </Typography>
                <RegistrationForm/>
            </Box>
        </Container>
    );
};

export default RegistrationPage;