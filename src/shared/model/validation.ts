import {z} from "zod";

export const loginFormSchema = z
    .object({
        email: z.string().email('Incorrect email'),
        password: z.string().min(6, 'Password is too short'),
    })

export const registrationFormSchema = z
    .object({
        name: z
            .string()
            .min(2, {message: 'Name is too short'})
            .max(20, 'Name is too long'),
        surname: z
            .string()
            .min(2, {message: 'Surname is too short'})
            .max(20, 'Surname is too long'),
        // age: z
        //     .number(),
        email: z.string().email('Incorrect email'),
        password: z.string().min(6, 'Password is too short'),
        confirmPassword: z.string().min(6, 'Repeat password'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ['confirmPassword'],
        message: 'The entered passwords do not match',
    })