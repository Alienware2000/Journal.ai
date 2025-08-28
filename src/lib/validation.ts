// src/lib/validation.ts
import { z } from "zod";

export const CreateEntrySchema = z.object({
  transcript: z.string().min(1, "transcript is required").max(8000),
});
