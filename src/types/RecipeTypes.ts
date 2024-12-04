export interface Ingredient {
  text: string;
  quantity: number;
  measure: string;
  food: string;
  weight: number;
  foodCategory: string;
  foodId: string;
  image: string | null;
}

export interface Recipe {
    label: string;
    image: string;
    calories: number;
    healthLabels: string[];
    dietLabels: string[];
    uri: string;
    ingredients: Ingredient[];
    nutrients: {
      ENERC_KCAL: { quantity: number, unit: string };
    };
  }
  
  export interface SearchResponse {
    hits: { recipe: Recipe }[];
  }
  