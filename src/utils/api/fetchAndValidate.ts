import { z } from "zod";
import api from "@/lib/axios";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Schema<T> = z.ZodType<T, any>;

export const fetchAndValidate = async <T>(url: string, schema: Schema<T>): Promise<T> => {
  const { data } = await api.get<T>(url);
  const parsed = schema.safeParse(data);

  if (!parsed.success) {
    console.error(z.flattenError(parsed.error));
    throw new Error("Invalid API response.");
  }

  return parsed.data;
};
