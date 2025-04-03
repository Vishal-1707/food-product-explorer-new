import axios from 'axios';
import { Product, ProductsResponse } from '../types/product';

const BASE_URL = 'https://world.openfoodfacts.org';

export const api = {
  searchProducts: async (query: string, page: number = 1): Promise<ProductsResponse> => {
    const response = await axios.get(`${BASE_URL}/cgi/search.pl`, {
      params: {
        search_terms: query,
        json: true,
        page,
        page_size: 24,
      },
    });
    return response.data;
  },

  getProductByBarcode: async (barcode: string): Promise<Product> => {
    const response = await axios.get(`${BASE_URL}/api/v0/product/${barcode}.json`);
    return response.data.product;
  },

  getProductsByCategory: async (category: string, page: number = 1): Promise<ProductsResponse> => {
    const response = await axios.get(`${BASE_URL}/category/${category}.json`, {
      params: {
        page,
        page_size: 24,
      },
    });
    return response.data;
  },
};