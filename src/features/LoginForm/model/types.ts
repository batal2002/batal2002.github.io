import {z} from "zod";
import {loginFormSchema} from "../../../shared/model/validation";

export type LoginFormSchema = z.infer<typeof loginFormSchema>