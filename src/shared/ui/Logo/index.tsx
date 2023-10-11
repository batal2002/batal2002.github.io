import React from 'react';
import {Link as RouterLink} from "react-router-dom";
import {Box, Link} from "@mui/material";
import logo from "../../images/logo.png";

const Logo = () => {
    return (
        <Link component={RouterLink} to={'/news'}
              sx={{display: 'flex', alignItems: 'center'}}>
            <Box
                component="img"
                sx={{
                    height: 50,
                    width: 50,
                }}
                alt="The house from the offer."
                src={logo}
            />
        </Link>
    );
};

export default Logo;