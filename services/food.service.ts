import { env } from "@/env";

const API_URL = env.BACKEND_URL;

interface GetFoodParams {
  isFeatured?: boolean;
  cuisine?: string;
  dietary_tags?: string[];
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  limit?: number;
  page?: number;
}

interface ServiceOptions {
  cache?: RequestCache;
  revalidate?: number;
}

export interface Food {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  image?: string[];
  cuisine: string;
  dietary_tags: string[];
  prepTimeMinutes: number;
  profile?: {
    RestaurantName: string;
  };
}

export interface Pagination {
  totalPage: number;
  page: number;
  limit: number;
  total: number;
}

export const foodService = {
  getAllFood: async function (
    params?: GetFoodParams,
    options?: ServiceOptions,
  ): Promise<{
    data: { data: { data: Food[]; pagination: Pagination } } | null;
    error: { message: string } | null;
  }> {
    try {
      const url = new URL(`${API_URL}/api/provider/menu`);
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, String(value));
          }
        });
      }
      console.log("Fetching food with URL:", url.toString());
      //function to dynamically tell the server or next js is it will cached or not for srr or issr
      const config: RequestInit = {};
      if (options?.cache) {
        config.cache = options.cache;
      }
      if (options?.revalidate) {
        config.next = { revalidate: options.revalidate };
      }
      if (options?.cache !== "no-store") {
        config.next = { ...config.next, tags: ["menu"] };
      }
      const res = await fetch(url.toString(), config);
      const data = await res.json();
      console.log(
        "Fetched data from backend:",
        data?.data?.data?.length,
        "items for URL:",
        url.toString(),
      );
      return { data: data, error: null };
    } catch (err: any) {
      console.error(err);
      return {
        data: null,
        error: { message: err.message || "Something went wrong" },
      };
    }
  },
  getFoodById: async function (id: string) {
    try {
      const res = await fetch(`${API_URL}/api/provider/menu/${id}`);
      const data = await res.json();
      return { data: data, error: null };
    } catch (err: any) {
      return {
        data: null,
        error: { message: err.message || "Something went wrong" },
      };
    }
  },
  getMinMaxPrice: async function () {
    try {
      const url = new URL(`${API_URL}/api/provider/price`);
      const res = await fetch(url.toString());
      const data = await res.json();
      return { data: data?.data, error: null };
    } catch (err: any) {
      console.error(err);
      return {
        data: null,
        error: { message: err.message || "Something went wrong" },
      };
    }
  },
};
