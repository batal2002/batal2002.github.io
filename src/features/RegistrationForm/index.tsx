import React from 'react';
import {Box, Button, Link, TextField} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../shared/hooks/redux";
import {createUserWithEmailAndPassword, getAuth} from "firebase/auth";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from '@hookform/resolvers/zod';
import {registrationFormSchema} from "../../shared/model/validation";
import {RegistrationFormSchema} from "./model/types";
import {doc, getFirestore, setDoc} from "firebase/firestore";
import {useNavigate} from "react-router";
import {setLoginLoading, unsetLoginLoading} from "../../entities/user/userSlice";


const RegistrationForm = () => {
    const dispatch = useAppDispatch()
    const {isLoginLoading} = useAppSelector(state => state.user)
    const {control, handleSubmit, formState: {errors}, setError} = useForm({
        resolver: zodResolver(registrationFormSchema),
        defaultValues: {
            email: "",
            name: "",
            surname: "",
            password: "",
            confirmPassword: "",
        },
    })
    const navigate = useNavigate()

    const onSubmit: SubmitHandler<RegistrationFormSchema> = (data) => {
        const auth = getAuth();
        const firestore = getFirestore()
        dispatch(setLoginLoading())
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then(async ({user}) => {
                await setDoc(doc(firestore, 'users', user.uid), {
                    userId: user.uid,
                    email: user.email,
                    name: data.name,
                    surname: data.surname
                });
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
            <Controller control={control} name={'email'} render={({field, formState}) => (
                <TextField
                    id={'email'}
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
            <Controller control={control} name={'name'} render={({field}) => (
                <TextField
                    id={'name'}
                    margin="normal"
                    required
                    fullWidth
                    label="Name"
                    onChange={e => field.onChange(e)}
                    value={field.value}
                    error={!!errors.name?.message}
                    helperText={errors.name?.message}
                />)
            }/>
            <Controller control={control} name={'surname'} render={({field}) => (
                <TextField
                    id={'surname'}
                    margin="normal"
                    required
                    fullWidth
                    label="Surname"
                    onChange={e => field.onChange(e)}
                    value={field.value}
                    error={!!errors.surname?.message}
                    helperText={errors.surname?.message}
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
            <Controller control={control} name={'confirmPassword'} render={({field}) => (
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Confirm password"
                    type="password"
                    onChange={e => field.onChange(e)}
                    value={field.value}
                    error={!!errors.confirmPassword?.message}
                    helperText={errors.confirmPassword?.message}
                />)
            }/>
            <Button
                type="submit"
                fullWidth
                disabled={isLoginLoading}
                variant="contained"
                sx={{mt: 3, mb: 2}}
            >
                Sign In
            </Button>
            <Link component={RouterLink} to={'/login'} variant="body2">
                {"Already have an account? Sign In"}
            </Link>
        </Box>
    );
};

export default RegistrationForm;