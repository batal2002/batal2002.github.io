import {z} from "zod";
import {postFormSchema} from "../../../shared/model/validation";

export type PostFormSchema = z.infer<typeof postFormSchema>