export interface Product {
  code: string;
  product_name: string;
  image_url: string;
  categories: string;
  ingredients_text: string;
  nutrition_grades: string;
  nutriments: {
    energy_100g: number;
    fat_100g: number;
    carbohydrates_100g: number;
    proteins_100g: number;
  };
  labels: string;
  image_small_url: string;
}

export interface ProductsResponse {
  count: number;
  page: number;
  page_count: number;
  page_size: number;
  products: Product[];
}