import {z} from "zod";
import {sendFormSchema} from "../../../shared/model/validation";

export type SendFormSchema = z.infer<typeof sendFormSchema>