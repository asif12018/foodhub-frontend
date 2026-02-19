import { env } from "@/env";

const API_URL = env.BACKEND_URL;

export const categoryService = {
  getAllCategory: async function () {
    try {
      const url = new URL(`${API_URL}/api/admin/categories`);
      const res = await fetch(url.toString());
      const data = await res.json();
      return { data: data, error: null };
    } catch (err: any) {
      console.error(err);
      return {
        data: null,
        error: { message: err.message || "Something went wrong" },
      };
    }
  },
};
