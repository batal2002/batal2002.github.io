import React from 'react';
import {Box, Button, Link, TextField} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../shared/hooks/redux";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {LoginFormSchema} from "./model/types";
import {zodResolver} from "@hookform/resolvers/zod";
import {loginFormSchema} from "../../shared/model/validation";
import {useNavigate} from "react-router";
import {setLoginLoading, unsetLoginLoading} from "../../entities/user/userSlice";

const LoginForm = () => {
    const dispatch = useAppDispatch()
    const {isLoginLoading} = useAppSelector(state => state.user)
    const {control, handleSubmit, formState: {errors}, setError} = useForm({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })
    const navigate = useNavigate()

    const onSubmit: SubmitHandler<LoginFormSchema> = (data) => {
        dispatch(setLoginLoading())
        const auth = getAuth();
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then(() => {
                dispatch(unsetLoginLoading())
                navigate('/news')
            })
            .catch(error => {
                let string = error.message.slice(22, -2).split('-').join(' ')
                setError("email", {
                    type: "manual",
                    message: string.charAt(0).toUpperCase() + string.slice(1),
                })
                dispatch(unsetLoginLoading())
            })
    }

    return (
        <Box component="form" noValidate sx={{mt: 1}} onSubmit={handleSubmit(onSubmit)}>
            <Controller control={control} name={'email'} render={({field}) => (
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Email Address"
                    autoFocus
                    onChange={e => field.onChange(e)}
                    value={field.value}
                    error={!!errors.email?.message}
                    helperText={errors.email?.message}
                />)
            }/>
            <Controller control={control} name={'password'} render={({field}) => (
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    onChange={e => field.onChange(e)}
                    value={field.value}
                    error={!!errors.password?.message}
                    helperText={errors.password?.message}
                />)
            }/>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isLoginLoading}
                sx={{mt: 3, mb: 2}}
            >
                Sign In
            </Button>
            <Link component={RouterLink} to={'/registration'} variant="body2">
                {"Don't have an account? Sign Up"}
            </Link>
        </Box>
    );
};

export default LoginForm;