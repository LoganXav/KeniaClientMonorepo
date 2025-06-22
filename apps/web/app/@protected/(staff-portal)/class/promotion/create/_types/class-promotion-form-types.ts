import { z } from "zod";
import { classPromotionCreateFormSchema } from "../_schema/class-promotion-create-form-schema";

export type ClassPromotionCreateFormType = z.infer<typeof classPromotionCreateFormSchema>;
