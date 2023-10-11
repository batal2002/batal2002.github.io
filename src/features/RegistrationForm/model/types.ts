import {z} from "zod";
import {registrationFormSchema} from "../../../shared/model/validation";

export type RegistrationFormSchema = z.infer<typeof registrationFormSchema>