export interface IProduct {
  id: string;
  category: string;
  brand: string;
  name: string;
  original_price: number;
  special_price: number;
  review_rating: number;
  review_count: number;
  features: string[];
  description: string;
  images: string[];
  videos: string[]; //format - thumbUrl, title, url - All separated by commas
  variants: string[]; //format - size, pattern, color - All separated by commas
}
